'use client';
import { useState } from 'react';
import EditMaterialModal from './EditMaterialModal';

export default function MaterialDetails({ material, onDataChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClose = () => {
    setIsEditing(false);
    if (onDataChange) {
      onDataChange();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">{material.name}</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">CAS Number</p>
            <p className="text-lg font-semibold text-gray-700">{material.cas_number || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date Obtained</p>
            <p className="text-lg font-semibold text-gray-700">
              {material.date_obtained ? new Date(material.date_obtained).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Inventory</p>
            <p className="text-lg font-semibold text-gray-700">{material.inventory_amount || 0}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cost per Gram</p>
            <p className="text-lg font-semibold text-gray-700">${material.cost_per_gram || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">IFRA Limit</p>
            <p className="text-lg font-semibold text-gray-700">{material.ifra_limit || 'N/A'}%</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-lg text-gray-700">{material.description || 'No description provided.'}</p>
        </div>
      </div>

      {isEditing && (
        <EditMaterialModal
          material={material}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
}
