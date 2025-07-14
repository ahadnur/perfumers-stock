'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function LogoutButton() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
    >
      Logout
    </button>
  );
}