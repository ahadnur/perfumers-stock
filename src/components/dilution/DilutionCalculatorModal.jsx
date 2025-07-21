'use client';

import { useState } from 'react';
import DilutionCalculator from './DilutionCalculator';

export default function DilutionCalculatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black font-bold">
            X
          </button>
        </div>
        <DilutionCalculator />
      </div>
    </div>
  );
}
