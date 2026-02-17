
import React from 'react';
import { Appointment } from '../types';

interface PatientDashboardProps {
  appointments: Appointment[];
  onBookClick: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ appointments, onBookClick }) => {
  const upcoming = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending');
  const past = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Patient Portal</h1>
          <p className="text-slate-500">Welcome back. Manage your health and visits.</p>
        </div>
        <button 
          onClick={onBookClick}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Booking
        </button>
      </header>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
          Upcoming Appointments
        </h2>
        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map(app => (
              <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{app.doctorName}</h3>
                    <p className="text-sm text-slate-500">{app.specialty}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    app.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{new Date(app.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{app.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-500">No upcoming appointments. Need a checkup?</p>
            <button onClick={onBookClick} className="text-blue-600 font-bold mt-2 hover:underline">Schedule one now</button>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-2 h-6 bg-slate-300 rounded-full"></div>
          Visit History
        </h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {past.length > 0 ? (
                past.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-800">{app.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{app.doctorName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        app.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 italic">{app.symptoms || 'Regular checkup'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 text-sm">No past appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
