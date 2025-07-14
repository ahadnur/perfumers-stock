'use client';
import { useState, useEffect } from 'react';
import { lightenColor } from '@/lib/colorUtils';
import toast from 'react-hot-toast';

const staticCategories = [
  {
    id: '1',
    name: 'Citrus',
    color: '#FFD700',
    materials: [
      { id: 'm1', name: 'Bergamot' },
      { id: 'm2', name: 'Lemon' },
    ],
  },
  {
    id: '2',
    name: 'Floral',
    color: '#FFB6C1',
    materials: [
      { id: 'm3', name: 'Rose' },
      { id: 'm4', name: 'Jasmine' },
    ],
  },
];

export default function CategoryList({ onSelectMaterial, selectedMaterialId }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategories(staticCategories);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="space-y-2">{/* ... skeleton loader ... */}</div>;
  }

  return (
    <div className="space-y-1"> {/* Reduced spacing */}
      {categories.map((category) => {
        const lighterColor = lightenColor(category.color, 40); // Slightly lighter
        
        return (
          <div key={category.id} className="mb-1"> {/* Reduced margin */}
            <div 
              className="py-1 px-2 font-medium text-sm" // Smaller text
              style={{ 
                backgroundColor: category.color,
                borderTopLeftRadius: '0.25rem',
                borderTopRightRadius: '0.25rem'
              }}
            >
              {category.name}
            </div>

            <div className="border-l border-r border-b rounded-b-lg overflow-hidden">
              {category.materials?.sort((a,b) => a.name.localeCompare(b.name))
                .map((material) => (
                <div
                  key={material.id}
                  onClick={() => onSelectMaterial(material)}
                  className={`p-1.5 px-3 text-xs cursor-pointer transition-colors ${
                    selectedMaterialId === material.id ? 
                    'font-semibold bg-opacity-90' : 
                    'hover:bg-opacity-80'
                  }`}
                  style={{ 
                    backgroundColor: lighterColor,
                    borderBottom: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {material.name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}