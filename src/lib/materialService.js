import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import toast from 'react-hot-toast';

export const addMaterialToCategory = async (categoryId, materialData) => {
  try {
    // Validate required fields
    if (!materialData.name) {
      throw new Error('Material name is required');
    }

    // Add to Firestore subcollection
    const docRef = await addDoc(
      collection(db, 'categories', categoryId, 'materials'),
      {
        ...materialData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    );

    toast.success(`${materialData.name} added successfully!`);
    return { id: docRef.id, ...materialData };
  } catch (error) {
    toast.error(`Failed to add material: ${error.message}`);
    throw error;
  }
};