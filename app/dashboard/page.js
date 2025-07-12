'use client';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import LogoutButton from '@/components/LogoutButton';
import CategoryList from '@/components/CategoryList';
import AddCategoryModal from '@/components/AddCategoryModal';
import AddSupplierModal from '@/components/AddSupplierModal';


function DashboardPage() {
    const [selectedMaterial, setSelectedMaterial] = useState(null);
  return (
    <ProtectedRoute>
        <div className='bg-amber-200 w-full flex justify-between items-center px-4 py-2'>
            <h1 className='font-bold'>Perfumers Stock</h1>
            <div className='flex justify-center items-center gap-2'>
              <AddSupplierModal />
              <LogoutButton />
            </div>
            
        </div>
      <div className="flex min-h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 p-4">
          <div className="flex justify-between items-center mb-6"> {/* Added container for title + button */}
            <h2 className="font-bold">Categories</h2>
            <AddCategoryModal />
          </div>
          {/* Categories list will go here */}
          <CategoryList 
            onSelectMaterial={setSelectedMaterial}
            selectedMaterialId={selectedMaterial?.id}
          />
        </div>
        
        {/* Main Content */}
        
        <div className="flex-1 p-6">
          {selectedMaterial ? (
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default DashboardPage;