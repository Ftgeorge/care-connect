'use client';

import { motion } from 'framer-motion';

interface QuickSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function QuickSuggestions({ suggestions, onSelect }: QuickSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-[#636e72] hover:bg-gray-50 hover:border-[#D98586] hover:text-[#D98586] transition-colors"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
} 