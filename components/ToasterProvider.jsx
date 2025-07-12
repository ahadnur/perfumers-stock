'use client';
import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
        duration: 3000,
      }}
    />
  );
}