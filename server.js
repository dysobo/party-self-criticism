const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3888;

// 密码存储（实际生产环境应该用环境变量或加密存储）
const CORRECT_PASSWORD = process.env.PARTY_PASSWORD || '58156104';

// IP 尝试记录（内存存储，重启后清空）
// 格式：{ '192.168.1.1': { attempts: 3, lockedUntil: 1710144000000 } }
const ipRecords = new Map();

// 配置
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 30 * 60 * 1000; // 30 分钟

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 获取客户端 IP（支持反向代理）
function getClientIP(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.ip || req.connection.remoteAddress || 'unknown';
}

// 检查 IP 是否被锁定
function isIPLocked(ip) {
    const record = ipRecords.get(ip);
    if (!record) return false;
    
    if (Date.now() < record.lockedUntil) {
        const remaining = Math.ceil((record.lockedUntil - Date.now()) / 1000);
        return { locked: true, remaining };
    }
    
    // 锁定期已过，清除记录
    ipRecords.delete(ip);
    return false;
}

// 记录密码尝试
function recordAttempt(ip, success) {
    let record = ipRecords.get(ip);
    
    if (!record) {
        record = { attempts: 0, lockedUntil: 0 };
        ipRecords.set(ip, record);
    }
    
    if (success) {
        // 成功后清除记录
        ipRecords.delete(ip);
        return;
    }
    
    record.attempts++;
    
    if (record.attempts >= MAX_ATTEMPTS) {
        record.lockedUntil = Date.now() + LOCK_DURATION_MS;
        console.log(`🔒 IP ${ip} 已被锁定，锁定时间：${new Date(record.lockedUntil).toLocaleString('zh-CN')}`);
    }
}

// 密码验证 API
app.post('/api/verify', (req, res) => {
    const ip = getClientIP(req);
    const { password } = req.body;
    
    // 检查 IP 是否被锁定
    const lockStatus = isIPLocked(ip);
    if (lockStatus) {
        return res.json({
            success: false,
            locked: true,
            remaining: lockStatus.remaining,
            message: `密码错误次数过多，请 ${Math.floor(lockStatus.remaining / 60)} 分钟 ${lockStatus.remaining % 60} 秒 后再试`
        });
    }
    
    // 验证密码
    const isValid = password === CORRECT_PASSWORD;
    
    if (isValid) {
        recordAttempt(ip, true);
        console.log(`✅ IP ${ip} 验证成功`);
        res.json({ success: true, message: '验证成功' });
    } else {
        recordAttempt(ip, false);
        const record = ipRecords.get(ip);
        const remaining = MAX_ATTEMPTS - record.attempts;
        console.log(`❌ IP ${ip} 验证失败，剩余 ${remaining} 次机会`);
        
        res.json({
            success: false,
            locked: false,
            attempts: record.attempts,
            remaining: remaining > 0 ? remaining : 0,
            message: remaining > 0 ? `密码错误，还剩 ${remaining} 次机会` : '密码错误次数已达上限'
        });
    }
});

// 获取当前 IP 状态（用于页面加载时检查）
app.get('/api/status', (req, res) => {
    const ip = getClientIP(req);
    const lockStatus = isIPLocked(ip);
    
    if (lockStatus) {
        res.json({
            locked: true,
            remaining: lockStatus.remaining,
            message: `IP 已被锁定，请 ${Math.floor(lockStatus.remaining / 60)} 分钟 ${lockStatus.remaining % 60} 秒 后再试`
        });
    } else {
        res.json({ locked: false });
    }
});

// 清理过期记录（每小时清理一次）
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRecords.entries()) {
        if (record.lockedUntil > 0 && now >= record.lockedUntil) {
            ipRecords.delete(ip);
            console.log(`🕐 已清理 IP ${ip} 的过期锁定记录`);
        }
    }
}, 60 * 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 自我批评生成服务已启动`);
    console.log(`📍 本地访问：http://localhost:${PORT}`);
    console.log(`🔐 密码验证已启用，最大尝试次数：${MAX_ATTEMPTS} 次`);
    console.log(`⏱️ 锁定时间：${LOCK_DURATION_MS / 60000} 分钟`);
});
