'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AddSupplierModal from './AddSupplierModal';
import EditSupplierModal from './EditSupplierModal';
import toast from 'react-hot-toast';

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null); // State to hold supplier being edited

  const fetchSuppliers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('suppliers')
      .select('id, name, phone');

    if (error) {
      setError(error.message);
      setSuppliers([]);
      console.error('Error fetching suppliers:', error.message);
    } else {
      setSuppliers(data);
      setError(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this supplier?')) {
      return;
    }
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error(`Error deleting supplier: ${error.message}`);
      console.error('Error deleting supplier:', error.message);
    } else {
      toast.success('Supplier deleted successfully!');
      fetchSuppliers(); // Refresh the list
    }
  };

  const handleEditClick = (supplier) => {
    setEditingSupplier(supplier);
  };

  const handleEditClose = () => {
    setEditingSupplier(null);
    fetchSuppliers(); // Refresh list after edit
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Suppliers</h2>
      <div className="mb-4">
        <AddSupplierModal onSupplierAdded={fetchSuppliers} />
      </div>

      {loading && <p>Loading suppliers...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && suppliers.length === 0 && !error && (
        <p>No suppliers found. Add one to get started!</p>
      )}

      {!loading && suppliers.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.phone || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(supplier)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-600 hover:text-red-900"
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

      {/* Edit Supplier Modal will go here */}
      {editingSupplier && (
        <EditSupplierModal
          supplier={editingSupplier}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}
