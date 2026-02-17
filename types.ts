
export type UserRole = 'patient' | 'admin' | 'doctor';

// Added missing User interface used in Layout and UI components
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  medicalConditions?: string;
  allergies?: string;
  role: UserRole;
  isComplete: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  symptoms?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
  rating: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}