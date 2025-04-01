// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
    email: string;
    sub: string;  // Typically, `sub` will be the user ID
  }
  