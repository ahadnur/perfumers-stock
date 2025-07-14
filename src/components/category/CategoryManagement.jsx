'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import toast from 'react-hot-toast';

export default function CategoryManagement({ onDataChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null); // State to hold category being edited

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, color');

    if (error) {
      setError(error.message);
      setCategories([]);
      console.error('Error fetching categories:', error.message);
    } else {
      setCategories(data);
      setError(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category? This will also affect materials linked to it.')) {
      return;
    }
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error(`Error deleting category: ${error.message}`);
      console.error('Error deleting category:', error.message);
    } else {
      toast.success('Category deleted successfully!');
      fetchCategories(); // Refresh the list
      if (onDataChange) onDataChange();
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
  };

  const handleEditClose = () => {
    setEditingCategory(null);
    fetchCategories(); // Refresh list after edit
    if (onDataChange) onDataChange();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="mb-4">
        <AddCategoryModal onCategoryAdded={() => {
          fetchCategories();
          if (onDataChange) onDataChange();
        }} />
      </div>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && categories.length === 0 && !error && (
        <p>No categories found. Add one to get started!</p>
      )}

      {!loading && categories.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span
                        className="inline-block w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.color}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2 px-3 py-1 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-900 px-3 py-1 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Category Modal will go here */}
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}
