declare namespace Express {
  interface Request {
    user: Partial<{
      sub: string;
      email: string;
      name: string;
      email_verified: boolean;
    }>;
  }
}
