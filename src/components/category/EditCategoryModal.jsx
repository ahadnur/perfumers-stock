'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

export default function EditCategoryModal({ category, onClose }) {
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(category.name);
    setColor(category.color);
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const trimmedName = name.trim();

      if (!trimmedName) {
        toast.error('Category name cannot be empty');
        return;
      }

      const { error } = await supabase
        .from('categories')
        .update({ name: trimmedName, color: color })
        .eq('id', category.id);

      if (error) {
        throw new Error(error.message);
      }

      toast.success(`${trimmedName} updated successfully!`);
      onClose(); // Close modal and trigger refresh in parent
    } catch (error) {
      toast.error(`Error updating category: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="editCategoryName" className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="editCategoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editCategoryColor" className="block text-sm font-medium mb-1">
              Color
            </label>
            <div className="flex items-center">
              <input
                type="color"
                id="editCategoryColor"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border border-gray-300 mr-2"
              />
              <span className="text-sm text-gray-600">{color}</span>
            </div>
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
              {isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
