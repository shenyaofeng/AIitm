const jwt = require('jsonwebtoken');

// 生成token
function generateToken(payload) {
  // payload是要加密的信息，'your-secret-key'是密钥，'1h'是过期时间
  return jwt.sign({payload}, 'syfsyfsyfzuishuaihhh', { expiresIn: '1h' });
}

module.exports = generateToken;
