'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const possibleConditions = [
  {
    name: "Common Cold",
    probability: 85,
    description: "A viral infection of your nose and throat. Usually harmless, although it might not feel that way.",
    severity: "Low",
    selfCare: true
  },
  {
    name: "Seasonal Allergies",
    probability: 65,
    description: "An allergic response to airborne substances such as pollen.",
    severity: "Low",
    selfCare: true
  },
  {
    name: "Sinusitis",
    probability: 45,
    description: "Inflammation of the sinuses, often caused by infection.",
    severity: "Medium",
    selfCare: false
  }
];

const selfCareSteps = [
  "Rest and stay hydrated",
  "Use over-the-counter pain relievers",
  "Try nasal decongestants",
  "Use a humidifier",
  "Get plenty of sleep"
];

export default function Results() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#2D3436] mb-4">
            Analysis Results
          </h1>
          <p className="text-[#636e72]">
            Based on your symptoms, here are the possible conditions and recommended actions
          </p>
        </motion.div>

        {/* Possible Conditions */}
        <div className="space-y-6 mb-8">
          {possibleConditions.map((condition, index) => (
            <motion.div
              key={condition.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3436]">{condition.name}</h3>
                  <p className="text-[#636e72]">{condition.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#D98586]">{condition.probability}%</div>
                  <div className="text-sm text-[#636e72]">Probability</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  condition.severity === 'Low' ? 'bg-green-100 text-green-800' :
                  condition.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {condition.severity} Severity
                </span>
                {condition.selfCare && (
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Self-care Possible
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommended Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold text-[#2D3436] mb-4">Recommended Actions</h2>
          
          {/* Self Care Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#2D3436] mb-3">Self-care Steps</h3>
            <ul className="space-y-2">
              {selfCareSteps.map((step, index) => (
                <li key={index} className="flex items-center gap-2 text-[#636e72]">
                  <span className="w-6 h-6 rounded-full bg-[#D98586]/10 flex items-center justify-center text-[#D98586] text-sm">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/product/booking"
              className="flex-1 px-6 py-3 bg-[#D98586] text-white rounded-lg text-center hover:bg-[#D98586]/90 transition-colors"
            >
              Book a Doctor Consultation
            </Link>
            <button
              onClick={() => window.location.href = '/product'}
              className="flex-1 px-6 py-3 border border-[#D98586] text-[#D98586] rounded-lg hover:bg-[#D98586]/10 transition-colors"
            >
              Start New Check
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 