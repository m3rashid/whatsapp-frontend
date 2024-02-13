import { atom } from 'recoil';

export const userRoles = ['admin', 'user'] as const;

export type User = {
  phone: string;
  username?: string;
  role: (typeof userRoles)[number];
};

export type AuthAtom = {
  user: User | null;
  isAuthenticated: boolean;
};

export const authAtom = atom<AuthAtom>({
  key: 'auth',
  default: {
    isAuthenticated: false,
    user: null,
  },
});
