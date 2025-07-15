import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

enum UserRole {
    ADMIN = 'ADMIN',
    INSTRUCTOR = 'INSTRUCTOR',
    STUDENT = 'STUDENT'
}

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}