// anda para crear nuevo prodcuto
// import jwt from "jsonwebtoken";
// const secreyKey = 'appProducts';

// const autenticar = (req, res, next) => {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader) {
//         return res.status(401).json({ message: 'No JWT provided', data: [] });
//     }

//     const token = authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No JWT provided', data: [] });
//     }

//     jwt.verify(token, secreyKey, (error, decoded) => {
//         if (error) {
//             return res.status(403).json({ message: 'Invalid JWT', data: [] });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// };

// export { autenticar };

// anda para eliminar
// import jwt from "jsonwebtoken";
// const secreyKey = 'appProducts';

// const autenticar = async (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No se pasó el JWT', data: [] });
//   }

//   jwt.verify(token, secreyKey, (error, decoded) => {
//     if (error) {
//       return res.status(403).json({ message: 'JWT Inválido', data: [] });
//     }
//     req.user = { id: decoded.id };
//     next();
//   });
// };

// export { autenticar };

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
