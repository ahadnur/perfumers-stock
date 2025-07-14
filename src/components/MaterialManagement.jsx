'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import AddMaterialModal from './AddMaterialModal';
import EditMaterialModal from './EditMaterialModal';

export default function MaterialManagement() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const fetchMaterials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('materials')
      .select(`
        id,
        name,
        cas_number,
        inventory_amount,
        cost_per_gram,
        ifra_limit,
        date_obtained,
        description,
        category_id,
        supplier_id,
        category:categories (name),
        supplier:suppliers (name)
      `);

    if (error) {
      setError(error.message);
      setMaterials([]);
      console.error('Error fetching materials:', error.message);
    } else {
      setMaterials(data);
      setError(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this material?')) {
      return;
    }
    const { error } = await supabase
      .from('materials')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error(`Error deleting material: ${error.message}`);
    } else {
      toast.success('Material deleted successfully!');
      fetchMaterials();
    }
  };

  const handleEditClick = (material) => {
    setEditingMaterial(material);
  };

  const handleEditClose = () => {
    setEditingMaterial(null);
    fetchMaterials();
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Materials</h2>
      <div className="mb-4">
        <AddMaterialModal onMaterialAdded={fetchMaterials} />
      </div>

      {loading && <p>Loading materials...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && materials.length === 0 && !error && (
        <p>No materials found. Add one to get started!</p>
      )}

      {!loading && materials.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory (g)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/gram</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.cas_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.category?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.inventory_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.cost_per_gram}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(material)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(material.id)}
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

      {editingMaterial && (
        <EditMaterialModal
          material={editingMaterial}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}
