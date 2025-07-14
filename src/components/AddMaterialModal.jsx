'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

export default function AddMaterialModal({ onMaterialAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [casNumber, setCasNumber] = useState('');
  const [inventoryAmount, setInventoryAmount] = useState('');
  const [costPerGram, setCostPerGram] = useState('');
  const [ifraLimit, setIfraLimit] = useState('');
  const [dateObtained, setDateObtained] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchSuppliers();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('id, name');
    setCategories(data || []);
  };

  const fetchSuppliers = async () => {
    const { data } = await supabase.from('suppliers').select('id, name');
    setSuppliers(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('materials').insert({
      name,
      cas_number: casNumber,
      inventory_amount: inventoryAmount,
      cost_per_gram: costPerGram,
      ifra_limit: ifraLimit,
      date_obtained: dateObtained,
      description,
      category_id: categoryId,
      supplier_id: supplierId,
    });

    if (error) {
      toast.error(`Error adding material: ${error.message}`);
    } else {
      toast.success('Material added successfully!');
      onMaterialAdded();
      setIsOpen(false);
      // Reset form
      setName('');
      setCasNumber('');
      setInventoryAmount('');
      setCostPerGram('');
      setIfraLimit('');
      setDateObtained('');
      setDescription('');
      setCategoryId('');
      setSupplierId('');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Material
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Material</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">CAS Number</label>
                  <input
                    type="text"
                    value={casNumber}
                    onChange={(e) => setCasNumber(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Inventory (g)</label>
                  <input
                    type="number"
                    value={inventoryAmount}
                    onChange={(e) => setInventoryAmount(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Cost/gram</label>
                  <input
                    type="number"
                    value={costPerGram}
                    onChange={(e) => setCostPerGram(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">IFRA Limit (%)</label>
                  <input
                    type="text"
                    value={ifraLimit}
                    onChange={(e) => setIfraLimit(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Date Obtained</label>
                  <input
                    type="date"
                    value={dateObtained}
                    onChange={(e) => setDateObtained(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map((sup) => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
