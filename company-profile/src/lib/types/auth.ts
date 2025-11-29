export interface AuthUser {
  id: string;
  email: string;
  displayName?: string | null;
  authorId?: string | null;
  avatar?: string | null;
}
