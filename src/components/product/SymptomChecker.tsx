'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeSymptoms, validateSymptoms, getEmergencyRecommendations } from '@/services/ai-service';
import { FaPlus, FaTimes, FaExclamationTriangle, FaUserMd, FaHistory } from 'react-icons/fa';

interface MedicalHistory {
  age?: number;
  gender?: string;
  existingConditions?: string[];
  medications?: string[];
  allergies?: string[];
  familyHistory?: string[];
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emergencyRecommendations, setEmergencyRecommendations] = useState<string[]>([]);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({});

  const handleAddSymptom = () => {
    if (newSymptom.trim()) {
      if (symptoms.length >= 10) {
        setError('Maximum 10 symptoms allowed');
        return;
      }
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom('');
      setError(null);
    }
  };

  const handleRemoveSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!validateSymptoms(symptoms)) {
      setError('Please add at least one valid symptom');
      return;
    }

    // Check for emergency symptoms first
    const emergency = getEmergencyRecommendations(symptoms);
    if (emergency.length > 0) {
      setEmergencyRecommendations(emergency);
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await analyzeSymptoms(symptoms, medicalHistory);
      // Store the analysis in localStorage for the results page
      localStorage.setItem('lastAnalysis', JSON.stringify({
        ...analysis,
        date: new Date().toISOString(),
        symptoms,
        medicalHistory
      }));
      // Redirect to results page
      window.location.href = '/product/results';
    } catch (error) {
      setError('Error analyzing symptoms. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMedicalHistoryChange = (field: keyof MedicalHistory, value: any) => {
    setMedicalHistory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2D3436]">
          Symptom Checker
        </h2>
          <button
            onClick={() => setShowMedicalHistory(!showMedicalHistory)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaHistory className="text-[#D98586]" />
            <span>{showMedicalHistory ? 'Hide' : 'Show'} Medical History</span>
          </button>
        </div>

        {/* Emergency Warning */}
        <AnimatePresence>
          {emergencyRecommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <div className="flex items-start space-x-3">
                <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
                <div>
                  <h3 className="font-medium text-red-800 mb-2">
                    Emergency Warning
                  </h3>
                  <ul className="list-disc list-inside text-red-700 space-y-1">
                    {emergencyRecommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medical History Form */}
        <AnimatePresence>
          {showMedicalHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-50 rounded-xl"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Medical History
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={medicalHistory.age || ''}
                    onChange={(e) => handleMedicalHistoryChange('age', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={medicalHistory.gender || ''}
                    onChange={(e) => handleMedicalHistoryChange('gender', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Existing Conditions (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={medicalHistory.existingConditions?.join(', ') || ''}
                    onChange={(e) => handleMedicalHistoryChange('existingConditions', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medications (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={medicalHistory.medications?.join(', ') || ''}
                    onChange={(e) => handleMedicalHistoryChange('medications', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={medicalHistory.allergies?.join(', ') || ''}
                    onChange={(e) => handleMedicalHistoryChange('allergies', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family History (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={medicalHistory.familyHistory?.join(', ') || ''}
                    onChange={(e) => handleMedicalHistoryChange('familyHistory', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Symptom Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Your Symptoms
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newSymptom}
              onChange={(e) => setNewSymptom(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSymptom()}
              placeholder="e.g., headache, fever"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D98586] focus:border-transparent"
            />
            <button
              onClick={handleAddSymptom}
              className="px-4 py-2 bg-[#D98586] text-white rounded-lg hover:bg-[#D98586]/90 transition-colors"
            >
              <FaPlus />
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Symptoms List */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Symptoms
          </h3>
          <div className="space-y-2">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-700">{symptom}</span>
                <button
                  onClick={() => handleRemoveSymptom(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={symptoms.length === 0 || isAnalyzing}
          className={`w-full px-6 py-3 text-white rounded-lg transition-colors ${
            symptoms.length === 0 || isAnalyzing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#D98586] hover:bg-[#D98586]/90'
          }`}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>

        {/* Disclaimer */}
        <p className="mt-4 text-sm text-gray-500 text-center">
          This is not a replacement for professional medical advice. 
          Always consult with a healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
} 