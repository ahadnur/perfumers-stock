'use client';

import { useState } from 'react';

export default function DilutionCalculator() {
  const [initialConcentration, setInitialConcentration] = useState(100);
  const [finalConcentration, setFinalConcentration] = useState(10);
  const [finalVolume, setFinalVolume] = useState(100);
  const [result, setResult] = useState(null);

  const calculateDilution = () => {
    const initialVolume = (finalConcentration * finalVolume) / initialConcentration;
    const solventVolume = finalVolume - initialVolume;
    setResult({
      initialVolume: initialVolume.toFixed(2),
      solventVolume: solventVolume.toFixed(2),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dilution Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Initial Concentration (%)</label>
          <input
            type="number"
            value={initialConcentration}
            onChange={(e) => setInitialConcentration(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Final Concentration (%)</label>
          <input
            type="number"
            value={finalConcentration}
            onChange={(e) => setFinalConcentration(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Final Volume (ml)</label>
          <input
            type="number"
            value={finalVolume}
            onChange={(e) => setFinalVolume(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        onClick={calculateDilution}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Calculate
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>
            You need <strong>{result.initialVolume}</strong> ml of the initial solution and{' '}
            <strong>{result.solventVolume}</strong> ml of solvent to make a total of{' '}
            <strong>{finalVolume}</strong> ml.
          </p>
        </div>
      )}
    </div>
  );
}
