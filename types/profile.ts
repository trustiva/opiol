export interface ProfileFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  
  // Academic Information
  currentEducation: string;
  targetDegree: string;
  targetField: string;
  targetCountry: string;
  targetUniversities: string[];
  
  // Language Proficiency
  englishProficiency: {
    reading: number;
    writing: number;
    listening: number;
    speaking: number;
  };
  
  // Test Scores
  testScores: {
    ielts?: {
      overall: number;
      reading: number;
      writing: number;
      listening: number;
      speaking: number;
    };
    toefl?: {
      overall: number;
      reading: number;
      writing: number;
      listening: number;
      speaking: number;
    };
    gre?: {
      verbal: number;
      quantitative: number;
      analytical: number;
    };
    gmat?: {
      verbal: number;
      quantitative: number;
      integrated: number;
      analytical: number;
    };
  };
  
  // Documents
  documents: {
    passport: boolean;
    transcripts: boolean;
    recommendationLetters: boolean;
    statementOfPurpose: boolean;
    cv: boolean;
  };
  
  // Progress
  currentStep: number;
  isComplete: boolean;
} 