import jwt from 'jsonwebtoken';

export const verifyAuth = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) return res.status(401).json({ error: 'No autenticado' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id };
        next();
    } catch {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
