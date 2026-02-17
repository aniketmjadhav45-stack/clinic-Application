
import React, { useState } from 'react';
import { DOCTORS } from '../constants';
import { Doctor } from '../types';

interface BookingFormProps {
  onBook: (data: { doctor: Doctor, date: string, time: string, symptoms: string }) => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBook, onCancel }) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDoctor && date && time) {
      onBook({ doctor: selectedDoctor, date, time, symptoms });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Book Appointment</h2>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step {step} of 3</span>
        </div>
        <div className="flex gap-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full bg-blue-600 transition-all duration-300 ${step >= 1 ? 'flex-1' : 'w-0'}`}></div>
          <div className={`h-full bg-blue-600 transition-all duration-300 ${step >= 2 ? 'flex-1' : 'w-0'}`}></div>
          <div className={`h-full bg-blue-600 transition-all duration-300 ${step >= 3 ? 'flex-1' : 'w-0'}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Select a Specialist</h3>
            <div className="grid grid-cols-1 gap-3">
              {DOCTORS.map(doc => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setSelectedDoctor(doc)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedDoctor?.id === doc.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-200 w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 font-bold">
                      {doc.name.charAt(4)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{doc.name}</p>
                      <p className="text-sm text-slate-500">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-600">★ {doc.rating}</p>
                    <p className="text-[10px] text-slate-400">Available Today</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" onClick={onCancel} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-xl">Cancel</button>
              <button 
                type="button" 
                disabled={!selectedDoctor}
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Choose Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Select Date</label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Preferred Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDoctor?.availability.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                        time === slot ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-100 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-xl">Back</button>
              <button 
                type="button" 
                disabled={!date || !time}
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Almost Done
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800">Additional Details</h3>
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-2">Tell us why you are visiting (Optional)</label>
              <textarea 
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="List your symptoms or the reason for your checkup..."
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-xl space-y-2 border border-blue-100">
              <p className="text-sm font-bold text-blue-800">Review Summary:</p>
              <div className="text-sm text-blue-700 grid grid-cols-2 gap-y-1">
                <span>Doctor:</span> <span className="font-bold">{selectedDoctor?.name}</span>
                <span>Date:</span> <span className="font-bold">{date}</span>
                <span>Time:</span> <span className="font-bold">{time}</span>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-xl">Back</button>
              <button 
                type="submit" 
                className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:bg-green-700"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
