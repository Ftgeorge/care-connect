import { CohereClient } from 'cohere-ai';

// Initialize Cohere
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || ''
});

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

export async function analyzeSymptoms(
  symptoms: string[],
  medicalHistory?: MedicalHistory
): Promise<SymptomAnalysis> {
  try {
    if (!validateSymptoms(symptoms)) {
      throw new Error('Invalid symptoms provided');
    }

    // Check for emergency symptoms first
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

    const prompt = `${MEDICAL_CONTEXT}

Patient Information:
${medicalHistory ? `
Age: ${medicalHistory.age}
Gender: ${medicalHistory.gender}
Existing Conditions: ${medicalHistory.existingConditions?.join(', ') || 'None'}
Medications: ${medicalHistory.medications?.join(', ') || 'None'}
Allergies: ${medicalHistory.allergies?.join(', ') || 'None'}
Family History: ${medicalHistory.familyHistory?.join(', ') || 'None'}
` : 'No medical history provided'}

Reported Symptoms: ${symptoms.join(', ')}

Please analyze these symptoms and provide:
1. Possible conditions with probabilities and severity levels
2. Overall severity assessment
3. Specific recommendations
4. Preventive measures
5. Follow-up actions

Format the response as a JSON object with the following structure:
{
  "conditions": [
    {
      "name": "condition name",
      "probability": number between 0-100,
      "description": "brief description",
      "recommendations": ["recommendation 1", "recommendation 2"],
      "severity": "low|medium|high",
      "urgency": "routine|urgent|emergency"
    }
  ],
  "overallSeverity": "low|medium|high",
  "recommendations": ["general recommendation 1", "general recommendation 2"],
  "preventiveMeasures": ["preventive measure 1", "preventive measure 2"],
  "followUpActions": ["follow-up action 1", "follow-up action 2"]
}`;

    const response = await cohere.generate({
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.3,
      k: 0,
      p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    const generatedText = response.generations[0].text;
    if (!generatedText) {
      throw new Error('No response from AI');
    }

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    // Parse the JSON response
    const analysis = JSON.parse(jsonMatch[0]) as SymptomAnalysis;
    return analysis;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
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

// New function to get preventive health recommendations
export async function getPreventiveRecommendations(
  age: number,
  gender: string,
  existingConditions: string[] = []
): Promise<string[]> {
  try {
    const prompt = `Based on the following patient information, provide preventive health recommendations:
Age: ${age}
Gender: ${gender}
Existing Conditions: ${existingConditions.join(', ') || 'None'}

Please provide specific preventive measures and screenings recommended for this demographic.`;

    const response = await cohere.generate({
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.3,
      k: 0,
      p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    const generatedText = response.generations[0].text;
    if (!generatedText) {
      throw new Error('No response from AI');
    }

    return generatedText.split('\n').filter(rec => rec.trim().length > 0);
  } catch (error) {
    console.error('Error getting preventive recommendations:', error);
    throw error;
  }
} 