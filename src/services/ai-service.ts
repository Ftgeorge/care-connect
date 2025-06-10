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

// Enhanced human-like responses based on conversation context
const HUMAN_RESPONSES = {
  duration: [
    "I see, and how long have you been dealing with this?",
    "Okay, could you tell me how long you've been experiencing these symptoms?",
    "Mm-hmm, and when did you first notice these symptoms?",
    "Right, so when did this start? A few days ago, or longer?",
    "Got it. How long has this been going on for you?"
  ],
  medication: [
    "Alright, have you tried taking anything for this so far?",
    "Okay, and have you taken any medications or remedies for these symptoms?",
    "I understand. Have you used any over-the-counter medications or home remedies?",
    "Right, so have you taken anything to help with these symptoms?",
    "Got it. Any medications or treatments you've tried for this?"
  ],
  additionalSymptoms: [
    "Hmm, are you experiencing anything else along with this?",
    "Okay, any other symptoms you've noticed?",
    "I see. Is there anything else that's been bothering you?",
    "Right, and have you noticed any other symptoms alongside these?",
    "Got it. Anything else you'd like to mention?"
  ],
  moreSymptoms: [
    "Alright, any other symptoms? Just type 'no' if that's everything.",
    "Okay, anything else you've noticed? Type 'no' if not.",
    "I see. Any other symptoms to add? Say 'no' if that covers it.",
    "Right, is there anything else? Just say 'no' if that's all.",
    "Got it. Any other symptoms, or is that everything?"
  ],
  age: [
    "Thanks for sharing that. To give you better insights, could you tell me your age?",
    "Okay, this helps. What's your age, if you don't mind me asking?",
    "I see. To provide more personalized advice, what's your age?",
    "Alright, and if you're comfortable sharing, what's your age?",
    "Got it. Could you share your age so I can give you more targeted recommendations?"
  ],
  gender: [
    "Thank you. And what's your gender?",
    "Okay, and could you tell me your gender?",
    "Right, and what gender should I consider for your health profile?",
    "Got it. What's your gender?",
    "Thanks. And your gender?"
  ],
  conditions: [
    "Alright, do you have any existing medical conditions I should know about? Type 'none' if not.",
    "Okay, any ongoing health conditions or chronic illnesses? Just say 'none' if there aren't any.",
    "I see. Are there any medical conditions you're currently managing? Type 'none' if not.",
    "Right, do you have any existing health conditions? Say 'none' if you don't.",
    "Got it. Any current medical conditions or diagnoses? Type 'none' if none."
  ],
  moreConditions: [
    "Mm-hmm, any other conditions? Type 'none' if that's all.",
    "Okay, anything else health-wise I should know about? Say 'none' if not.",
    "I see. Any other medical conditions? Type 'none' if that covers it.",
    "Right, any other ongoing health issues? Say 'none' if that's everything.",
    "Got it. Any other conditions to mention? Type 'none' if not."
  ],
  analyzing: [
    "Alright, let me analyze all of this information for you...",
    "Okay, I'm processing everything you've told me...",
    "I see. Let me take a look at your symptoms and put this together...",
    "Right, I'm analyzing your symptoms now...",
    "Got it. Give me a moment to review everything..."
  ],
  invalidAge: [
    "Hmm, I need a valid number for your age. Could you try again?",
    "Sorry, I didn't catch that as an age. Could you give me a number?",
    "I need your age as a number. Could you try entering it again?",
    "Let me get a proper age from you - just the number please.",
    "I need your age in numbers. Could you enter that again?"
  ]
};

// Enhanced symptom analysis with pattern matching
const SYMPTOM_PATTERNS = {
  respiratory: {
    keywords: ['cough', 'sore throat', 'runny nose', 'congestion', 'sneezing', 'throat', 'breathing', 'shortness of breath'],
    conditions: [
      {
        name: "Common Cold",
        probability: 80,
        description: "A viral infection affecting the upper respiratory tract, typically mild and self-limiting",
        recommendations: [
          "Get plenty of rest - your body needs energy to fight the infection",
          "Stay well-hydrated with water, herbal teas, or warm broths",
          "Use a humidifier or breathe steam from a hot shower",
          "Consider over-the-counter pain relievers if needed"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      },
      {
        name: "Upper Respiratory Infection",
        probability: 65,
        description: "Viral or bacterial infection of the nose, throat, or sinuses",
        recommendations: [
          "Rest and allow your immune system to work",
          "Drink warm liquids to soothe your throat",
          "Use saline nasal rinses for congestion",
          "Consider throat lozenges for sore throat relief"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      }
    ]
  },
  gastrointestinal: {
    keywords: ['stomach', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'abdominal', 'belly', 'intestinal', 'digestive'],
    conditions: [
      {
        name: "Gastroenteritis",
        probability: 70,
        description: "Inflammation of the stomach and intestines, often caused by infection or food poisoning",
        recommendations: [
          "Stay hydrated with clear fluids - water, electrolyte solutions, or clear broths",
          "Follow the BRAT diet (bananas, rice, applesauce, toast) when you can eat",
          "Avoid dairy, caffeine, and fatty foods temporarily",
          "Get plenty of rest to help your body recover"
        ],
        severity: "medium" as const,
        urgency: "routine" as const
      },
      {
        name: "Indigestion",
        probability: 60,
        description: "Discomfort in the upper abdomen, often related to eating or stress",
        recommendations: [
          "Eat smaller, more frequent meals",
          "Avoid spicy, fatty, or acidic foods",
          "Try over-the-counter antacids if needed",
          "Consider stress management techniques"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      }
    ]
  },
  musculoskeletal: {
    keywords: ['back pain', 'muscle', 'joint', 'ache', 'stiff', 'sore', 'neck', 'shoulder', 'knee', 'hip'],
    conditions: [
      {
        name: "Muscle Strain",
        probability: 75,
        description: "Overstretching or tearing of muscle fibers, often from physical activity or poor posture",
        recommendations: [
          "Apply ice for the first 24-48 hours to reduce inflammation",
          "After initial period, use heat therapy to relax muscles",
          "Take over-the-counter anti-inflammatory medications as directed",
          "Gentle stretching and movement as tolerated"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      },
      {
        name: "Tension or Stress-related Pain",
        probability: 65,
        description: "Muscle tension often caused by stress, poor posture, or prolonged sitting",
        recommendations: [
          "Practice relaxation techniques like deep breathing",
          "Apply heat or try gentle massage",
          "Improve posture and ergonomics at work",
          "Consider regular exercise and stretching"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      }
    ]
  },
  neurological: {
    keywords: ['headache', 'dizziness', 'fatigue', 'tired', 'dizzy', 'lightheaded', 'migraine'],
    conditions: [
      {
        name: "Tension Headache",
        probability: 80,
        description: "The most common type of headache, often caused by stress, lack of sleep, or muscle tension",
        recommendations: [
          "Apply a cold or warm compress to your head or neck",
          "Try over-the-counter pain relievers as directed",
          "Practice stress management and relaxation techniques",
          "Ensure you're getting adequate sleep and staying hydrated"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      },
      {
        name: "Dehydration or Fatigue",
        probability: 70,
        description: "Symptoms often related to insufficient fluid intake, poor sleep, or overexertion",
        recommendations: [
          "Increase your fluid intake gradually throughout the day",
          "Prioritize getting 7-9 hours of quality sleep",
          "Eat regular, balanced meals to maintain energy",
          "Take breaks and avoid overexertion"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      }
    ]
  }
};

// Enhanced preventive recommendations based on age and gender
const PREVENTIVE_RECOMMENDATIONS = {
  general: [
    "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
    "Stay physically active with at least 150 minutes of moderate exercise weekly",
    "Get adequate sleep (7-9 hours per night for adults)",
    "Stay hydrated by drinking plenty of water throughout the day",
    "Practice good hand hygiene to prevent infections",
    "Manage stress through relaxation techniques or hobbies",
    "Avoid smoking and limit alcohol consumption"
  ],
  byAge: {
    young: [
      "Establish healthy lifestyle habits early",
      "Focus on injury prevention during sports and activities",
      "Maintain good mental health practices",
      "Get recommended vaccinations"
    ],
    adult: [
      "Schedule regular health check-ups and screenings",
      "Monitor blood pressure and cholesterol levels",
      "Maintain a healthy weight",
      "Consider annual flu vaccination"
    ],
    senior: [
      "Get regular bone density and vision screenings",
      "Stay up to date with recommended vaccinations",
      "Focus on fall prevention and home safety",
      "Monitor for age-related health changes"
    ]
  },
  byGender: {
    female: [
      "Schedule regular gynecological check-ups",
      "Consider calcium and vitamin D supplementation",
      "Be aware of heart disease risk factors",
      "Stay up to date with breast and cervical cancer screenings"
    ],
    male: [
      "Monitor prostate health as you age",
      "Be aware of heart disease risk factors",
      "Focus on injury prevention during physical activities",
      "Consider regular health screenings as recommended"
    ]
  }
};

// Mock function to simulate API delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get random response
const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// Helper function to analyze symptom patterns
const analyzeSymptomPattern = (symptoms: string[]): any => {
  const symptomText = symptoms.join(' ').toLowerCase();
  
  for (const [category, data] of Object.entries(SYMPTOM_PATTERNS)) {
    const matchCount = data.keywords.filter(keyword => 
      symptomText.includes(keyword)
    ).length;
    
    if (matchCount > 0) {
      return {
        category,
        conditions: data.conditions,
        matchStrength: matchCount / data.keywords.length
      };
    }
  }
  
  // Default fallback
  return {
    category: 'general',
    conditions: [
      {
        name: "General Symptoms",
        probability: 60,
        description: "Based on your symptoms, this could be related to various common conditions",
        recommendations: [
          "Monitor your symptoms and note any changes",
          "Get adequate rest and stay hydrated",
          "Consider over-the-counter remedies if appropriate",
          "Maintain good nutrition and self-care"
        ],
        severity: "low" as const,
        urgency: "routine" as const
      }
    ],
    matchStrength: 0.3
  };
};

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

    // Analyze symptom patterns
    const analysis = analyzeSymptomPattern(symptoms);
    
    return {
      conditions: analysis.conditions,
      overallSeverity: analysis.matchStrength > 0.7 ? 'medium' : 'low',
      recommendations: [
        "Keep track of your symptoms and their progression",
        "Get plenty of rest to support your body's healing",
        "Stay well-hydrated throughout the day",
        "Consider appropriate over-the-counter medications if needed"
      ],
      preventiveMeasures: [
        "Practice good hygiene, especially hand washing",
        "Maintain a healthy lifestyle with good nutrition",
        "Get adequate sleep to support your immune system",
        "Avoid known triggers or irritants when possible"
      ],
      followUpActions: [
        "Contact your healthcare provider if symptoms worsen or persist",
        "Seek medical attention if you develop new concerning symptoms",
        "Keep a symptom diary to track changes",
        "Follow up with your doctor if no improvement in 7-10 days"
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

    let recommendations = [...PREVENTIVE_RECOMMENDATIONS.general];
    
    // Add age-specific recommendations
    if (age < 30) {
      recommendations.push(...PREVENTIVE_RECOMMENDATIONS.byAge.young);
    } else if (age < 65) {
      recommendations.push(...PREVENTIVE_RECOMMENDATIONS.byAge.adult);
    } else {
      recommendations.push(...PREVENTIVE_RECOMMENDATIONS.byAge.senior);
    }
    
    // Add gender-specific recommendations
    const genderKey = gender.toLowerCase().includes('female') || gender.toLowerCase().includes('woman') ? 'female' : 'male';
    recommendations.push(...PREVENTIVE_RECOMMENDATIONS.byGender[genderKey]);
    
    return recommendations;
  } catch (error) {
    console.error('Error getting preventive recommendations:', error);
    throw error;
  }
}

// Enhanced conversation responses
export function getConversationResponse(step: number, context?: any): string {
  switch (step) {
    case 1: // Duration
      return getRandomResponse(HUMAN_RESPONSES.duration);
    case 2: // Medication
      return getRandomResponse(HUMAN_RESPONSES.medication);
    case 3: // Additional symptoms
      return getRandomResponse(HUMAN_RESPONSES.additionalSymptoms);
    case 4: // Age
      return getRandomResponse(HUMAN_RESPONSES.age);
    case 5: // Gender
      return getRandomResponse(HUMAN_RESPONSES.gender);
    case 6: // Conditions
      return getRandomResponse(HUMAN_RESPONSES.conditions);
    default:
      return "Could you tell me more about that?";
  }
}

export function getMoreSymptomsResponse(): string {
  return getRandomResponse(HUMAN_RESPONSES.moreSymptoms);
}

export function getMoreConditionsResponse(): string {
  return getRandomResponse(HUMAN_RESPONSES.moreConditions);
}

export function getAnalyzingResponse(): string {
  return getRandomResponse(HUMAN_RESPONSES.analyzing);
}

export function getInvalidAgeResponse(): string {
  return getRandomResponse(HUMAN_RESPONSES.invalidAge);
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
    'severe allergic reaction',
    'can\'t breathe',
    'heart attack',
    'stroke'
  ];

  const hasEmergency = symptoms.some(symptom => 
    emergencySymptoms.some(emergency => 
      symptom.toLowerCase().includes(emergency)
    )
  );

  if (hasEmergency) {
    return [
      'This sounds like it could be a medical emergency',
      'Please seek immediate medical attention or call emergency services',
      'Do not wait for further AI analysis',
      'If possible, have someone stay with you',
      'Keep a record of your symptoms and when they started'
    ];
  }

  return [];
}