
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import ProfileForm from './components/ProfileForm';
import PatientDashboard from './components/PatientDashboard';
import AdminDashboard from './components/AdminDashboard';
import AIChat from './components/AIChat';
import BookingForm from './components/BookingForm';
import { Profile, Appointment, UserRole } from './types';
import { INITIAL_APPOINTMENTS } from './constants';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<{ email: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [notification, setNotification] = useState<string | null>(null);

  // Persistence logic
  useEffect(() => {
    const saved = localStorage.getItem('mediflow_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAuthState({ email: parsed.email });
      setProfile(parsed);
      setCurrentView(parsed.role === 'admin' ? 'admin-dashboard' : 'patient-dashboard');
    }
  }, []);

  const handleAuthComplete = (email: string, isNew: boolean) => {
    setAuthState({ email });
    // In production, fetch from Supabase. Here we mock:
    if (isNew) {
      setCurrentView('profile-completion');
    } else {
      // Simulation of existing profile fetch
      const existing: Profile = {
        id: 'p-1',
        fullName: 'John Doe',
        email: email,
        mobileNumber: '555-0199',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Test St',
        emergencyContact: 'Mary Doe',
        role: email.includes('admin') ? 'admin' : 'patient',
        isComplete: true
      };
      setProfile(existing);
      localStorage.setItem('mediflow_session', JSON.stringify(existing));
      setCurrentView(existing.role === 'admin' ? 'admin-dashboard' : 'patient-dashboard');
    }
  };

  const handleProfileComplete = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem('mediflow_session', JSON.stringify(newProfile));
    setCurrentView(newProfile.role === 'admin' ? 'admin-dashboard' : 'patient-dashboard');
    notify('Profile updated successfully!');
  };

  const handleLogout = () => {
    setAuthState(null);
    setProfile(null);
    localStorage.removeItem('mediflow_session');
    setCurrentView('login');
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBookAppointment = (data: any) => {
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      patientId: profile?.id || 'p-unknown',
      patientName: profile?.fullName || 'Guest',
      doctorId: data.doctor.id,
      doctorName: data.doctor.name,
      specialty: data.doctor.specialty,
      date: data.date,
      time: data.time,
      status: 'pending',
      symptoms: data.symptoms
    };
    setAppointments(prev => [newAppointment, ...prev]);
    setCurrentView('patient-dashboard');
    notify(`Appointment requested for ${data.date}. You will receive an email shortly.`);
    console.log("Automation: Resend API triggered for confirmation email to", profile?.email);
  };

  // Logic to render correct view
  const renderView = () => {
    if (!authState) return <Auth onAuthComplete={handleAuthComplete} />;
    if (!profile) return <ProfileForm initialEmail={authState.email} onComplete={handleProfileComplete} />;
    
    switch (currentView) {
      case 'patient-dashboard':
        return <PatientDashboard 
          appointments={appointments.filter(a => a.patientId === profile.id)} 
          onBookClick={() => setCurrentView('booking')} 
        />;
      case 'admin-dashboard':
        return <AdminDashboard 
          appointments={appointments} 
          onUpdateStatus={(id, status) => {
            setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
            notify(`Status updated to ${status}`);
          }} 
        />;
      case 'booking':
        return <BookingForm onBook={handleBookAppointment} onCancel={() => setCurrentView('patient-dashboard')} />;
      case 'ai-chat':
        return <AIChat />;
      case 'profile-completion':
        return <ProfileForm initialEmail={authState.email} onComplete={handleProfileComplete} />;
      default:
        return <PatientDashboard appointments={[]} onBookClick={() => setCurrentView('booking')} />;
    }
  };

  // Prepare UI shell user object
  const uiUser = profile ? {
    id: profile.id,
    name: profile.fullName,
    email: profile.email,
    role: profile.role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=random`
  } : null;

  return (
    <>
      {!authState ? (
        <Auth onAuthComplete={handleAuthComplete} />
      ) : (
        <Layout 
          user={uiUser as any} 
          onLogout={handleLogout} 
          onNavigate={setCurrentView} 
          currentView={currentView}
        >
          {renderView()}
        </Layout>
      )}

      {notification && (
        <div className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in z-50">
          <div className="bg-green-500 rounded-full p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-medium">{notification}</p>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </>
  );
};

export default App;
