'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { lightenColor } from '@/lib/colorUtils';
import toast from 'react-hot-toast';

export default function CategoryList({ onSelectMaterial }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'categories'),
      (snapshot) => {
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort categories alphabetically by name
        const sortedCategories = [...categoriesData].sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        
        setCategories(sortedCategories);
        setLoading(false);
      },
      (error) => {
        toast.error('Error loading categories: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-2 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-t-lg"></div>
            <div className="space-y-1">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="h-8 bg-gray-100"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((category) => {
        const lighterColor = lightenColor(category.color, 30); // 30% lighter
        
        return (
          <div key={category.id} className="mb-2">
            {/* Category Header */}
            <div 
              className="py-1 px-2 rounded-t-lg font-medium"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </div>

            {/* Materials List */}
            <div className="">
              {category.materials?.map((material) => (
                <div
                  key={material.id}
                  onClick={() => onSelectMaterial(material)}
                  className="p-2 text-sm cursor-pointer hover:brightness-110"
                  style={{ backgroundColor: lighterColor }}
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