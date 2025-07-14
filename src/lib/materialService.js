import toast from 'react-hot-toast';

export const addMaterialToCategory = async (categoryId, materialData) => {
  try {
    // Validate required fields
    if (!materialData.name) {
      throw new Error('Material name is required');
    }

    // Placeholder for adding a material
    console.log('Adding material to category:', categoryId, materialData);

    toast.success(`${materialData.name} added successfully!`);
    return { id: Date.now().toString(), ...materialData };
  } catch (error) {
    toast.error(`Failed to add material: ${error.message}`);
    throw error;
  }
};