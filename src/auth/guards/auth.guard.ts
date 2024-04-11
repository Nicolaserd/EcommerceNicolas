import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from  "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService
  ){}
   canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const request = context.switchToHttp().getRequest();
   //! el token  que se envia por headers
   const token = request.headers["authorization"]?.split(" ")[1]??"";

   if(!token){
    throw new UnauthorizedException("Bearer token not found");
   };
   try{
    const secret = process.env.JWT_SECRET;
    const payload =  this.jwtService.verifyAsync(token,{secret})
    .then(payload => {
      payload.iat = new Date(payload.iat*1000);
      payload.exp = new Date(payload.exp*1000);
      payload.roles = ["admin"]
      
    })
   
    request.user = payload;
    return true

   }
   catch(error){
    throw new UnauthorizedException("Invalid token");
   }
   
}
}