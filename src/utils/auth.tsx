// utils/auth.ts
import { useEffect, useState } from 'react';

export const useAuthToken = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get the token from localStorage
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setToken(storedToken);
  }, []); // The empty dependency array ensures this effect runs once on mount

  return token;
};
