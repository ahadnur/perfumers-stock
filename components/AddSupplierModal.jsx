'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function AddSupplierModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [supplierName, setSupplierName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkSupplierExists = async (name) => {
    const q = query(
      collection(db, 'suppliers'),
      where('name', '==', name)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Trim and validate
      const trimmedName = supplierName.trim();
      if (!trimmedName) {
        toast.error('Supplier name cannot be empty');
        return;
      }

      // Check for duplicates
      if (await checkSupplierExists(trimmedName)) {
        toast.error('Supplier already exists');
        return;
      }

      // Add to Firestore
      await addDoc(collection(db, 'suppliers'), {
        name: trimmedName,
        createdAt: new Date()
      });

      toast.success(`${trimmedName} added successfully!`);
      setSupplierName('');
      setIsOpen(false);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 cursor-pointer"
      >
        + 🏭
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Adding...' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}