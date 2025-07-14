'use client';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
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