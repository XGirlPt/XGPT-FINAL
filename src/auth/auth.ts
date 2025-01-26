// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'your-very-secure-secret-key';

// export interface User {
//     id: string;
//     role: string;
//     email: string;
// }

// export const generateToken = (user: User): string => {
//     console.log("Gerando token para o usuário:", user);
//     return jwt.sign({ id: user.id, role: user.role, email: user.email }, SECRET_KEY, {
//         expiresIn: '1h',
//     });
// };

// export const verifyToken = (token: string): User | null => {
//     try {
//         console.log("Verificando token:", token);
//         return jwt.verify(token, SECRET_KEY) as User;
//     } catch (error) {
//         console.error("Falha na verificação do token:", error);
//         return null;
//     }

// }