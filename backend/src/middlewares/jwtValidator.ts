import jwt from 'jsonwebtoken';
import { type Response, type Request, type NextFunction } from 'express';
import type { JwksClient } from 'jwks-rsa';


// Get the signing key based on the JWT's key ID (kid)
// function getKey(client: JwksClient, header: any, callback: any) {
//   client.getSigningKey(header.kid, (err, key) => {
//     if (err) {
//       callback(err);
//     } else {
//       const signingKey = key?.getPublicKey();
//       callback(null, signingKey);
//     }
//   });
// }

// function validateToken(requiredScopes = [], client) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;

//     // Check for the Bearer token
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'Missing or invalid Authorization header 😿' });
//     }

//     const token = authHeader.split(' ')[1];
//     console.log('Validating token:', token.slice(0, 10) + '...'); // Debug peek

//     // Verify the JWT
//     jwt.verify(
//       token,
//       getKey,
//       {
//         audience: process.env.AUDIENCE,
//         issuer: process.env.ISSUER,
//         algorithms: ['RS256'], // Stick to secure RSA signing
//       },
//       (err, decoded) => {
//         if (err) {
//           console.error('Token verification failed:', err.message);
//           return res.status(401).json({ error: 'Invalid or expired token 🚫' });
//         }

//         // Check scopes
//         const scopes = decoded.scope ? decoded.scope.split(' ') : [];
//         const hasRequiredScopes = requiredScopes.every((scope) => scopes.includes(scope));
//         if (!hasRequiredScopes) {
//           return res.status(403).json({ error: `Missing required scopes: ${requiredScopes} 🙅‍♂️` });
//         }

//         // Token’s good—attach decoded claims to req.user
//         req.user = decoded;
//         console.log('Token validated for user:', req.user.sub);
//         next();
//       }
//     );
//   };

//   export default validateToken;