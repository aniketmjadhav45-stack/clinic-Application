
import { Doctor, Appointment } from './types';

export const DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'General Medicine', availability: ['09:00', '10:00', '14:00'], rating: 4.9 },
  { id: '2', name: 'Dr. James Wilson', specialty: 'Pediatrics', availability: ['11:00', '13:00', '15:00'], rating: 4.8 },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Dermatology', availability: ['08:30', '10:30', '16:00'], rating: 5.0 },
  { id: '4', name: 'Dr. Marcus Thorne', specialty: 'Cardiology', availability: ['09:30', '12:00', '14:30'], rating: 4.7 },
];

// Added missing mock appointment data
export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'p-1',
    patientName: 'John Doe',
    doctorId: '1',
    doctorName: 'Dr. Sarah Mitchell',
    specialty: 'General Medicine',
    date: '2024-05-20',
    time: '09:00',
    status: 'confirmed',
    symptoms: 'Headache and fatigue'
  },
  {
    id: 'app-2',
    patientId: 'p-1',
    patientName: 'John Doe',
    doctorId: '3',
    doctorName: 'Dr. Emily Chen',
    specialty: 'Dermatology',
    date: '2024-05-15',
    time: '10:30',
    status: 'completed',
    symptoms: 'Skin rash'
  }
];

export const AI_SYSTEM_PROMPT = `
You are the MediFlow Clinic AI Assistant. Your goal is to help patients with FAQs and structured symptom intake.

STRICT SAFETY RULES:
1. NO DIAGNOSIS: Never say "You have [Condition]". Instead, say "Based on your symptoms, a specialist should evaluate you."
2. MANDATORY DISCLAIMER: Every medical response must end with: "Disclaimer: I am an AI, not a doctor. Consult a professional for health concerns."
3. EMERGENCY: If symptoms include chest pain, severe bleeding, or gasping, tell them to call 911/Emergency immediately.
4. STRUCTURED DATA: When a user mentions symptoms, summarize them at the end of your response in a clear bulleted list for the doctor to see.
5. APPOINTMENTS: Encourage users to book with our specialists: Dr. Mitchell (Gen Med), Dr. Wilson (Pediatrics), Dr. Chen (Dermatology), Dr. Thorne (Cardiology).
`;

export const ENV_VARS_GUIDE = `
Required Environment Variables for Vercel/Local:
- API_KEY: Your Google Gemini API Key
- SUPABASE_URL: Your Supabase Project URL
- SUPABASE_ANON_KEY: Your Supabase Anon Public Key
- RESEND_API_KEY: For email notifications
- TWILIO_ACCOUNT_SID: For SMS notifications
`;