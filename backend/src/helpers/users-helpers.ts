import crypto from 'crypto'
import jwt from 'jsonwebtoken';

export const random = () => {
    return crypto.randomBytes(128).toString('base64');
}
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256',[salt, password].join('/')).update(process.env.SECRET).digest('hex')
    
}
export const JWTverify = (sessionToken: string) => {
    return jwt.verify(sessionToken, process.env.SECRET);
    
}
export const JWTsign = (username: string, salt: string) => {
  return jwt.sign({ _username: username?.toString(), salt: salt, }, process.env.SECRET, {
    expiresIn: '1 h',
  });
}