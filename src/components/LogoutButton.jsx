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
      className="px-4 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
    >
      ⏻
    </button>
  );
}