'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

export default function AddCategoryModal({ onCategoryAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState('#FFB7D5');
  const [isLoading, setIsLoading] = useState(false);

  const checkCategoryExists = async (name) => {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .eq('name', name)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error checking category existence:', error.message);
      return false; // Assume not exists on error
    }
    return data !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const trimmedName = categoryName.trim();

      if (!trimmedName) {
        toast.error('Category name cannot be empty');
        return;
      }

      if (await checkCategoryExists(trimmedName)) {
        toast.error('Category already exists!');
        return;
      }

      const { data, error } = await supabase
        .from('categories')
        .insert([
          { name: trimmedName, color: color }
        ])
        .select(); // Use .select() to return the inserted data

      if (error) {
        throw new Error(error.message);
      }

      toast.success(`${trimmedName} added successfully!`);
      setCategoryName('');
      setColor('#FFB7D5');
      setIsOpen(false);
      if (onCategoryAdded) {
        onCategoryAdded();
      }
    } catch (error) {
      toast.error(`Error adding category: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Simple "+" Button next to Categories title */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-xl text-white hover:bg-blue-600 px-2 rounded-full transition-colors cursor-pointer"
          aria-label="Add category"
        >
          +
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded border border-gray-300 mr-2"
                  />
                  <span className="text-sm text-gray-600">{color}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Adding...' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}