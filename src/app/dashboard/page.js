'use client';
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import LogoutButton from '@/components/LogoutButton';
import SupplierManagement from '@/components/supplier/SupplierManagement';
import CategoryManagement from '@/components/category/CategoryManagement';
import MaterialManagement from '@/components/material/MaterialManagement';
import { supabase } from '@/lib/supabaseClient';
import { lightenColor } from '@/lib/colorUtils';
import MaterialDetails from '@/components/material/MaterialDetails';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('materials');
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const fetchSidebarData = async () => {
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, color')
      .order('name', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
    } else {
      setCategories(categoriesData);
    }

    const { data: materialsData, error: materialsError } = await supabase
      .from('materials')
      .select('*');

    if (materialsError) {
      console.error('Error fetching materials:', materialsError);
    } else {
      setMaterials(materialsData);
    }
  };

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setActiveTab('materials');
  };

  const handleDataChange = () => {
    fetchSidebarData();
  };

  return (
    <ProtectedRoute>
      <div className='bg-amber-200 w-full flex justify-between items-center px-4 py-2'>
        <h1 className='font-bold'>Perfumers Stock</h1>
        <div className='flex justify-center items-center gap-4'>
          <button
            onClick={() => {
              setActiveTab('materials');
              setSelectedMaterial(null);
            }}
            className={`py-1 px-3 rounded cursor-pointer ${activeTab === 'materials' && !selectedMaterial ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            All Materials
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`py-1 px-3 rounded cursor-pointer ${activeTab === 'suppliers' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Suppliers
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-1 px-3 rounded cursor-pointer ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Categories
          </button>
          <LogoutButton />
        </div>
      </div>
      <div className="flex min-h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 p-4">
          <div>
            <h2 className="font-bold mb-2">Materials by Category</h2>
            {categories.map(category => (
              <div key={category.id} className="mb-2 rounded-sm">
                <div
                  className="w-full text-left font-semibold px-2"
                  style={{ backgroundColor: category.color }}
                >
                  <span>{category.name}</span>
                </div>
                <ul>
                  {materials
                    .filter(material => material.category_id === category.id)
                    .map(material => (
                      <li key={material.id}>
                        <button
                          onClick={() => handleMaterialSelect(material)}
                          className="w-full text-left p-1 rounded-b cursor-pointer"
                          style={{ backgroundColor: lightenColor(category.color, 80) }}
                        >
                          {material.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'materials' && selectedMaterial && (
            <div className="flex items-center justify-center">
              <MaterialDetails material={selectedMaterial} onDataChange={handleDataChange} />
            </div>
          )}
          {activeTab === 'materials' && !selectedMaterial && (
            <MaterialManagement onDataChange={handleDataChange} />
          )}
          {activeTab === 'suppliers' && (
            <SupplierManagement />
          )}
          {activeTab === 'categories' && (
            <CategoryManagement onDataChange={handleDataChange} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;
