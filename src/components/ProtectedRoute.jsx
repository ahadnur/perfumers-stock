'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect if not logged in
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div className="p-4">Loading...</div>; // Optional: Add a spinner
  }

  return children;
}