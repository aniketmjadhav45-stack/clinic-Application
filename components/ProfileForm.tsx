
import React, { useState } from 'react';
import { Profile } from '../types';

interface ProfileFormProps {
  initialEmail: string;
  onComplete: (profile: Profile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialEmail, onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: 'other',
    address: '',
    emergencyContact: '',
    medicalConditions: '',
    allergies: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      email: initialEmail,
      ...formData,
      role: initialEmail.includes('admin') ? 'admin' : 'patient',
      isComplete: true,
    };
    onComplete(newProfile);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 bg-blue-600 text-white">
          <h2 className="text-2xl font-bold">Complete Your Profile</h2>
          <p className="text-blue-100">We need a few more details to provide the best care.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
            <input
              required
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="John Doe"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-bold text-slate-700 mb-1">Mobile Number</label>
            <input
              required
              type="tel"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Date of Birth</label>
            <input
              required
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Home Address</label>
            <input
              required
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="123 Health St, Medical City"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Emergency Contact (Name & Phone)</label>
            <input
              required
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Jane Doe - (555) 000-1111"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Existing Conditions / Allergies (Optional)</label>
            <textarea
              rows={3}
              value={formData.medicalConditions}
              onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="e.g. Asthma, Penicillin allergy..."
            />
          </div>

          <div className="col-span-2 flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              Finish & Enter Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
