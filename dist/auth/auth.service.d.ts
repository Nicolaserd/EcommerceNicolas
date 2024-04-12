import { Users } from 'src/entities/users.entity';
import { UserRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/users.dto';
interface UserWithConfirmation extends CreateUserDto {
    confirmPassword?: string;
}
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        success: string;
        token: string;
    }>;
    singUp(user: UserWithConfirmation): Promise<Partial<Users>>;
}
export {};
