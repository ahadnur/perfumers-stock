'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

export default function AddSupplierModal({ onSupplierAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkSupplierExists = async (name) => {
    const { data, error } = await supabase
      .from('suppliers')
      .select('name')
      .eq('name', name)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error checking supplier existence:', error.message);
      return false; // Assume not exists on error
    }
    return data !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const trimmedName = supplierName.trim();
      const trimmedPhone = supplierPhone.trim();

      if (!trimmedName) {
        toast.error('Supplier name cannot be empty');
        return;
      }

      if (await checkSupplierExists(trimmedName)) {
        toast.error('Supplier already exists');
        return;
      }

      const { data, error } = await supabase
        .from('suppliers')
        .insert([
          { name: trimmedName, phone: trimmedPhone }
        ])
        .select(); // Use .select() to return the inserted data

      if (error) {
        throw new Error(error.message);
      }

      toast.success(`${trimmedName} added successfully!`);
      setSupplierName('');
      setSupplierPhone('');
      setIsOpen(false);
      if (onSupplierAdded) {
        onSupplierAdded();
      }
    } catch (error) {
      toast.error(`Error adding supplier: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-green-600 cursor-pointer"
      >
        Add Supplier
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="supplierName" className="block text-sm font-medium mb-1">
                  Supplier Name
                </label>
                <input
                  type="text"
                  id="supplierName"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label htmlFor="supplierPhone" className="block text-sm font-medium mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="text"
                  id="supplierPhone"
                  value={supplierPhone}
                  onChange={(e) => setSupplierPhone(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  } cursor-pointer`}
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