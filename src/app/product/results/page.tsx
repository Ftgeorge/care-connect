'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaExclamationTriangle, FaUserMd, FaHistory, FaShieldAlt } from 'react-icons/fa';

interface Condition {
  name: string;
  probability: number;
  description: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  urgency: 'routine' | 'urgent' | 'emergency';
}

interface Analysis {
  conditions: Condition[];
  overallSeverity: 'low' | 'medium' | 'high';
  recommendations: string[];
  preventiveMeasures: string[];
  followUpActions: string[];
  date: string;
  symptoms: string[];
  medicalHistory?: {
    age?: number;
    gender?: string;
    existingConditions?: string[];
    medications?: string[];
    allergies?: string[];
    familyHistory?: string[];
  };
}

export default function ResultsPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem('symptomAnalysis');
    if (storedAnalysis) {
      try {
        setAnalysis(JSON.parse(storedAnalysis));
      } catch (e) {
        setError('Error loading analysis results');
      }
    } else {
      setError('No analysis results found');
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">{error}</h2>
              <Link
                href="/product/booking"
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#D98586] hover:bg-[#D98586]/90"
              >
                <FaArrowLeft className="mr-2" />
                Back to Symptom Checker
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D98586] mx-auto"></div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading results...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-[#2D3436]">
              Analysis Results
            </h1>
            <Link
              href="/product/booking"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#D98586] hover:bg-[#D98586]/90"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </Link>
          </div>

          {/* Medical History Summary */}
          {analysis.medicalHistory && (
            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-4">
                <FaHistory className="text-[#D98586]" />
                <h2 className="text-lg font-medium text-gray-900">Medical History</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {analysis.medicalHistory.age && (
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <span className="ml-2 text-gray-900">{analysis.medicalHistory.age}</span>
                  </div>
                )}
                {analysis.medicalHistory.gender && (
                  <div>
                    <span className="text-gray-500">Gender:</span>
                    <span className="ml-2 text-gray-900">{analysis.medicalHistory.gender}</span>
                  </div>
                )}
                {analysis.medicalHistory.existingConditions?.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Existing Conditions:</span>
                    <span className="ml-2 text-gray-900">
                      {analysis.medicalHistory.existingConditions.join(', ')}
                    </span>
                  </div>
                )}
                {analysis.medicalHistory.medications?.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Medications:</span>
                    <span className="ml-2 text-gray-900">
                      {analysis.medicalHistory.medications.join(', ')}
                    </span>
                  </div>
                )}
                {analysis.medicalHistory.allergies?.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Allergies:</span>
                    <span className="ml-2 text-gray-900">
                      {analysis.medicalHistory.allergies.join(', ')}
                    </span>
                  </div>
                )}
                {analysis.medicalHistory.familyHistory?.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Family History:</span>
                    <span className="ml-2 text-gray-900">
                      {analysis.medicalHistory.familyHistory.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reported Symptoms */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Reported Symptoms
            </h2>
            <div className="flex flex-wrap gap-2">
              {analysis.symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Severity Indicator */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Severity Assessment
            </h2>
            <div
              className={`p-4 rounded-lg ${
                analysis.overallSeverity === 'high'
                  ? 'bg-red-50 text-red-700'
                  : analysis.overallSeverity === 'medium'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              <p className="font-medium">
                {analysis.overallSeverity.charAt(0).toUpperCase() +
                  analysis.overallSeverity.slice(1)}{' '}
                Severity
              </p>
            </div>
          </div>

          {/* Possible Conditions */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Possible Conditions
            </h2>
            <div className="space-y-4">
              {analysis.conditions.map((condition, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-xl"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-[#2D3436]">
                      {condition.name}
                    </h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {condition.probability}% probability
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{condition.description}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        condition.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : condition.severity === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {condition.severity.charAt(0).toUpperCase() +
                        condition.severity.slice(1)}{' '}
                      Severity
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        condition.urgency === 'emergency'
                          ? 'bg-red-100 text-red-700'
                          : condition.urgency === 'urgent'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {condition.urgency.charAt(0).toUpperCase() +
                        condition.urgency.slice(1)}{' '}
                      Priority
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Recommendations:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {condition.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preventive Measures */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FaShieldAlt className="text-[#D98586]" />
              <h2 className="text-lg font-medium text-gray-900">
                Preventive Measures
              </h2>
            </div>
            <div className="space-y-2">
              {analysis.preventiveMeasures.map((measure, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-gray-600"
                >
                  <span className="text-[#D98586]">•</span>
                  <span>{measure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-up Actions */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FaUserMd className="text-[#D98586]" />
              <h2 className="text-lg font-medium text-gray-900">
                Follow-up Actions
              </h2>
            </div>
            <div className="space-y-2">
              {analysis.followUpActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-gray-600"
                >
                  <span className="text-[#D98586]">•</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* General Recommendations */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              General Recommendations
            </h2>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-gray-600"
                >
                  <span className="text-[#D98586]">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/product/booking"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#D98586] hover:bg-[#D98586]/90 transition-colors"
            >
              <FaUserMd className="mr-2" />
              Book Appointment with Doctor
            </Link>
            <Link
              href="/product"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Start New Check
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              This analysis is based on the symptoms you provided and is not a
              replacement for professional medical advice. Please consult with a
              healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 