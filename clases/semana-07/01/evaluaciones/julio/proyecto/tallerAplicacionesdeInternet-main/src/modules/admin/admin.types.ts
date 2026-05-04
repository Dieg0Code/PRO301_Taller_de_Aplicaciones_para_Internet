export interface AdminSessionPayload {
  username: string;
  expiresAt: number;
}

export interface AdminSession {
  username: string;
  authenticated: boolean;
}
