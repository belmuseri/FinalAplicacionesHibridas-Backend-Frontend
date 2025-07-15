
import jwt from "jsonwebtoken";
const secreyKey = 'appProducts';

const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No JWT provided', data: [] });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No JWT provided', data: [] });
    }

    jwt.verify(token, secreyKey, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: 'Invalid JWT', data: [] });
        }
        req.user = { id: decoded.id }; 
        next();
    });
};

export { autenticar };