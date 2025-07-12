'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function MaterialDetails({ material, onUpdate }) {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = (field) => {
    onUpdate({
      ...material,
      [field]: editValue
    });
    setEditingField(null);
    toast.success(`${field} updated!`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Editable Name */}
      <div className="mb-6">
        {editingField === 'name' ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="text-2xl font-bold border-b-2 border-blue-500 mr-2"
              autoFocus
            />
            <button 
              onClick={() => handleSave('name')}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <h2 
            className="text-2xl font-bold cursor-pointer hover:text-blue-600"
            onClick={() => handleEditStart('name', material.name)}
          >
            {material.name}
          </h2>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* CAS Number */}
        <div className="border-b pb-2">
          <h3 className="text-sm font-medium text-gray-500">CAS Number</h3>
          <p>{material.cas || 'Not specified'}</p>
        </div>

        {/* Supplier */}
        <div className="border-b pb-2">
          <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
          <p>{material.supplier || 'Not specified'}</p>
        </div>

        {/* Inventory */}
        <div className="border-b pb-2">
          <h3 className="text-sm font-medium text-gray-500">Inventory</h3>
          <p>{material.inventory || 0} grams</p>
        </div>

        {/* Cost */}
        <div className="border-b pb-2">
          <h3 className="text-sm font-medium text-gray-500">Cost</h3>
          <p>${material.costPerGram?.toFixed(2) || '0.00'} per gram</p>
        </div>

        {/* IFRA Limit */}
        <div className="border-b pb-2">
          <h3 className="text-sm font-medium text-gray-500">IFRA Limit</h3>
          <p>{material.ifraLimit || 'Not specified'}</p>
        </div>

        {/* Date Obtained */}
        <div className="border-b pb-2">
          <h3 className="text-sm font-medium text-gray-500">Date Obtained</h3>
          <p>{material.dateObtained || 'Unknown'}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500">Description</h3>
        <p className="mt-1 text-gray-700">
          {material.description || 'No description available'}
        </p>
      </div>

      {/* Solvent Toggle */}
      <div className="mt-6 flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={material.treatAsSolvent || false} 
            className="sr-only peer" 
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500">
            <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
          </div>
          <span className="ml-3 text-sm font-medium">Treat as Solvent</span>
        </label>
      </div>

      {/* Dilution Calculator */}
      {material.ifraLimit && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Dilution Calculator</h3>
          <div className="flex items-center">
            <input
              type="range"
              min="0"
              max={material.ifraLimit}
              className="w-full mr-4"
            />
            <span className="text-sm">
              Max: {material.ifraLimit}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}