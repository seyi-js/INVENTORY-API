import { Injectable, NestMiddleware,ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

interface requestInterface extends Request{
    user?:{
        isAdmin:Boolean
    }
}

@Injectable()
export class CheckJWT implements NestMiddleware {
    constructor(private authService:AuthService) { }
  use(req: requestInterface, res: Response, next: NextFunction) {
        try {
            const token = req.headers['x-auth-token']
        if(!token){
            throw new ForbiddenException('You are not authorized to access this route.')
        };

        const decoded = this.authService.verifyToken(token);
        req.user = decoded;
        next();
        } catch (error) {
            throw new ForbiddenException(error)
        }
    
  }
}

@Injectable()
export class CheckAdminUser implements NestMiddleware {
  use(req: requestInterface, res: Response, next: NextFunction) {
        try {
            if(!req.user.isAdmin){
                throw new ForbiddenException('Admin access required.')
            }
        next();
        } catch (error) {
            throw new ForbiddenException(error)
        }
    
  }
}
