import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from  "@nestjs/jwt";
import { Role } from '../roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    //! se debe inyectar por que quieres usar servicio de la instancia de JwtService
    private readonly jwtService:JwtService
  ){}
   canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const request = context.switchToHttp().getRequest();
   //! el token  que se envia por headers
   //? el segundo elemento corresponde al token a validar
   //* si no hay se envia un string vacio
   const token = request.headers["authorization"]?.split(" ")[1]??"";

   if(!token){
    throw new UnauthorizedException("Bearer token not found");
   };
   try{
    //!Traer al secret de .env 
    //* se extre al info 
    //* se verifica que el token sea valido dentro de la aplicacion
    const secret = process.env.JWT_SECRET;
    //! try catch por si lo de abjo falla
    const payload =   this.jwtService.verifyAsync(token,{secret})
    .then(payload => {
      //! se verifica la fecha de creacion
      payload.iat = new Date(payload.iat*1000);
      //!se permite extrar la fecha por la hora con el formato de conversion da el tiempod expiracion
      payload.exp = new Date(payload.exp*1000);
      
      return payload;
    })

    .then(payload => {
      request.user = payload; // Asigna el payload a request.user en el segundo then
      return true; // Devuelve true para la siguiente cadena de then o catch
    })
    .catch(error => {
     return false
    });
    
    return payload

   }
   catch(error){
    throw new UnauthorizedException("Invalid token");
   }
   
}
}