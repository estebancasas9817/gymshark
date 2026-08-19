import { UserSchema } from './user.schema';

export const LoginSchema = UserSchema.pick({ email: true, password: true });

export const ForgotPasswordSchema = UserSchema.pick({ email: true });

export const RegisterSchema = UserSchema.omit({ emailVerified: true });
