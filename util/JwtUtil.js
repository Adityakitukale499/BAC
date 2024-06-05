const jwt = require('jsonwebtoken');

class JwtUtil {
    constructor() {
        this.SECRET_KEY = 'secret';
        this.validTokens = {};
        this.blacklist = [];
        this.startDate = new Date();
    }

    extractUsername(token) {
        const decoded = jwt.decode(token, { complete: true });
        return decoded.payload.sub;
    }

    extractExpiration(token) {
        const decoded = jwt.decode(token, { complete: true });
        return new Date(decoded.payload.exp * 1000);
    }

    extractCreation(token) {
        const decoded = jwt.decode(token, { complete: true });
        return new Date(decoded.payload.iat * 1000);
    }

    generateToken(employee) {
        const token = this.createToken(employee.email);
        this.validTokens[employee.email] = token;
        return token;
    }

    createToken(subject) {
        const payload = {
            sub: subject,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 10) // 10 hours
        };
        return jwt.sign(payload, this.SECRET_KEY);
    }

    validateToken(token, employee) {
        try {
            const decoded = jwt.verify(token, this.SECRET_KEY);
            const username = decoded.sub;
            return (username === employee.email && !this.isTokenExpired(token) && !this.blacklist.includes(token));
        } catch (err) {
            return false;
        }
    }

    isTokenExpired(token) {
        return this.extractExpiration(token).getTime() < Date.now() || this.extractCreation(token) < this.startDate;
    }
}

module.exports = JwtUtil;
