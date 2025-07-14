'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

export default function EditSupplierModal({ supplier, onClose }) {
  const [name, setName] = useState(supplier.name);
  const [phone, setPhone] = useState(supplier.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(supplier.name);
    setPhone(supplier.phone || '');
  }, [supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const trimmedName = name.trim();
      const trimmedPhone = phone.trim();

      if (!trimmedName) {
        toast.error('Supplier name cannot be empty');
        return;
      }

      const { error } = await supabase
        .from('suppliers')
        .update({ name: trimmedName, phone: trimmedPhone })
        .eq('id', supplier.id);

      if (error) {
        throw new Error(error.message);
      }

      toast.success(`${trimmedName} updated successfully!`);
      onClose(); // Close modal and trigger refresh in parent
    } catch (error) {
      toast.error(`Error updating supplier: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Edit Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="editSupplierName" className="block text-sm font-medium mb-1">
              Supplier Name
            </label>
            <input
              type="text"
              id="editSupplierName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editSupplierPhone" className="block text-sm font-medium mb-1">
              Phone (Optional)
            </label>
            <input
              type="text"
              id="editSupplierPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
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
              {isLoading ? 'Updating...' : 'Update Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
