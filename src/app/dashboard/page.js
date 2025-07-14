'use client';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import LogoutButton from '@/components/LogoutButton';
import SupplierManagement from '@/components/SupplierManagement';
import CategoryManagement from '@/components/CategoryManagement'; // New import


function DashboardPage() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [activeTab, setActiveTab] = useState('materials'); // 'materials', 'suppliers', or 'categories'

  return (
    <ProtectedRoute>
      <div className='bg-amber-200 w-full flex justify-between items-center px-4 py-2'>
        <h1 className='font-bold'>Perfumers Stock</h1>
        <div className='flex justify-center items-center gap-2'>
          <LogoutButton />
        </div>
      </div>
      <div className="flex min-h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 p-4">
          <div className="mb-4">
            <button
              onClick={() => setActiveTab('materials')}
              className={`w-full py-2 mb-2 rounded ${activeTab === 'materials' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Materials
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`w-full py-2 mb-2 rounded ${activeTab === 'suppliers' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Suppliers
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full py-2 rounded ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Categories
            </button>
          </div>

          {activeTab === 'materials' && (
            <>
              {/* Original material/category list content will go here if needed */}
              {/* For now, we'll leave it empty or add a placeholder */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold">Categories</h2>
                {/* AddCategoryModal will be handled by CategoryManagement */}
              </div>
              {/* CategoryList will be handled by CategoryManagement */}
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a material from the sidebar
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'materials' && (
            selectedMaterial ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">{selectedMaterial.name}</h2>
                <div className="space-y-4">
                  <p><span className="font-semibold">CAS:</span> {selectedMaterial.cas}</p>
                  {/* Add more fields later */}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a material from the sidebar
              </div>
            )
          )}

          {activeTab === 'suppliers' && (
            <SupplierManagement />
          )}

          {activeTab === 'categories' && (
            <CategoryManagement />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;