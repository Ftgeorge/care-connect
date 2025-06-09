// Initialize Hugging Face API

// Enhanced medical context for the AI
const MEDICAL_CONTEXT = `You are a medical AI assistant trained to analyze symptoms and provide preliminary health insights. 
You should:
1. Analyze reported symptoms with medical accuracy
2. Consider possible conditions based on symptom combinations
3. Provide probability estimates for each condition
4. Suggest immediate actions and preventive measures
5. Recommend when to seek medical attention
6. Consider patient's medical history if provided
7. Provide evidence-based recommendations
8. Include relevant medical terminology

IMPORTANT: 
- Always include a disclaimer that this is not a replacement for professional medical advice
- Prioritize patient safety and recommend emergency care when necessary
- Consider common conditions first before suggesting rare ones
- Take into account the severity and duration of symptoms`;

interface SymptomAnalysis {
  conditions: Array<{
    name: string;
    probability: number;
    description: string;
    recommendations: string[];
    severity: 'low' | 'medium' | 'high';
    urgency: 'routine' | 'urgent' | 'emergency';
  }>;
  overallSeverity: 'low' | 'medium' | 'high';
  recommendations: string[];
  preventiveMeasures: string[];
  followUpActions: string[];
}

interface MedicalHistory {
  age?: number;
  gender?: string;
  existingConditions?: string[];
  medications?: string[];
  allergies?: string[];
  familyHistory?: string[];
}

// Dummy data for testing
const DUMMY_CONDITIONS = [
  {
    name: "Common Cold",
    probability: 75,
    description: "A viral infection of the upper respiratory tract",
    recommendations: [
      "Get plenty of rest",
      "Stay hydrated",
      "Use over-the-counter cold medications",
      "Use a humidifier"
    ],
    severity: "low" as const,
    urgency: "routine" as const
  },
  {
    name: "Seasonal Allergies",
    probability: 60,
    description: "Allergic reaction to environmental triggers",
    recommendations: [
      "Take antihistamines",
      "Avoid known allergens",
      "Use nasal sprays",
      "Consider air purifiers"
    ],
    severity: "low" as const,
    urgency: "routine" as const
  }
];

const DUMMY_PREVENTIVE_RECOMMENDATIONS = [
  "Get annual flu shot",
  "Maintain regular exercise routine",
  "Eat a balanced diet rich in fruits and vegetables",
  "Stay hydrated throughout the day",
  "Get adequate sleep (7-9 hours per night)",
  "Practice stress management techniques",
  "Schedule regular check-ups with your doctor"
];

// Mock function to simulate API delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function analyzeSymptoms(
  symptoms: string[],
  medicalHistory?: MedicalHistory
): Promise<SymptomAnalysis> {
  try {
    // Simulate API delay
    await simulateDelay(1500);

    // Check for emergency symptoms
    const emergencyRecommendations = getEmergencyRecommendations(symptoms);
    if (emergencyRecommendations.length > 0) {
      return {
        conditions: [],
        overallSeverity: 'high',
        recommendations: emergencyRecommendations,
        preventiveMeasures: [],
        followUpActions: ['Seek immediate medical attention']
      };
    }

    // Return dummy analysis
    return {
      conditions: DUMMY_CONDITIONS,
      overallSeverity: 'low',
      recommendations: [
        "Monitor your symptoms",
        "Get plenty of rest",
        "Stay hydrated",
        "Consider over-the-counter medications if needed"
      ],
      preventiveMeasures: [
        "Wash hands frequently",
        "Avoid close contact with sick individuals",
        "Maintain a healthy lifestyle"
      ],
      followUpActions: [
        "Schedule a follow-up if symptoms worsen",
        "Keep track of symptom progression",
        "Contact healthcare provider if no improvement in 7 days"
      ]
    };
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    throw error;
  }
}

export async function getPreventiveRecommendations(
  age: number,
  gender: string,
  existingConditions: string[] = []
): Promise<string[]> {
  try {
    // Simulate API delay
    await simulateDelay(1000);

    // Return dummy recommendations
    return DUMMY_PREVENTIVE_RECOMMENDATIONS;
  } catch (error) {
    console.error('Error getting preventive recommendations:', error);
    throw error;
  }
}

// Enhanced symptom validation
export function validateSymptoms(symptoms: string[]): boolean {
  if (!symptoms || symptoms.length === 0) {
    return false;
  }

  // Check for minimum symptom length
  if (symptoms.some(symptom => symptom.length < 2)) {
    return false;
  }

  // Check for maximum number of symptoms
  if (symptoms.length > 10) {
    return false;
  }

  // Check for invalid characters
  const invalidChars = /[<>{}[\]\\]/;
  if (symptoms.some(symptom => invalidChars.test(symptom))) {
    return false;
  }

  return true;
}

// Enhanced emergency recommendations
export function getEmergencyRecommendations(symptoms: string[]): string[] {
  const emergencySymptoms = [
    'chest pain',
    'difficulty breathing',
    'severe bleeding',
    'loss of consciousness',
    'seizure',
    'stroke symptoms',
    'severe head injury',
    'sudden severe pain',
    'sudden vision changes',
    'sudden speech problems',
    'sudden weakness',
    'sudden confusion',
    'severe burns',
    'poisoning',
    'severe allergic reaction'
  ];

  const hasEmergency = symptoms.some(symptom => 
    emergencySymptoms.some(emergency => 
      symptom.toLowerCase().includes(emergency)
    )
  );

  if (hasEmergency) {
    return [
      'Seek immediate medical attention',
      'Call emergency services if necessary',
      'Do not wait for AI analysis',
      'If possible, have someone stay with you',
      'Keep a record of your symptoms and their progression'
    ];
  }

  return [];
} 