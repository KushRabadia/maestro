// utils/auth.ts
import { useEffect, useState } from 'react';
import { Storage } from '@/types';

export const useAuthToken = (): Storage => {
  const [token, setToken] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);

  useEffect(() => {
    // Get the token from localStorage
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedExpiryDate = typeof window !== 'undefined' ? localStorage.getItem('expiryDate') : null;
    setToken(storedToken);
    setExpiryDate(storedExpiryDate);
  }, []); // The empty dependency array ensures this effect runs once on mount

  return { token: token, expiryDate: expiryDate };
};
