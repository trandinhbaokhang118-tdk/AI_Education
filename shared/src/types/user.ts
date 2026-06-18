export enum Role {
    PLAYER = 'PLAYER',
    GUARDIAN = 'GUARDIAN',
    ADMIN = 'ADMIN'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
}

export interface UserRegistration {
    name: string;
    email: string;
    password: string;
    role?: Role;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: Omit<User, 'updated_at'>;
    token: string;
}
