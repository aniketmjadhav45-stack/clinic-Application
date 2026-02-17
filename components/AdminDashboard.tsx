
import React, { useState } from 'react';
import { Appointment } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: Appointment['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments, onUpdateStatus }) => {
  const [filter, setFilter] = useState<Appointment['status'] | 'all'>('all');

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  const stats = [
    { label: 'Total Visits', value: appointments.length, icon: '📅', color: 'bg-blue-500' },
    { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: '✅', color: 'bg-green-500' },
    { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, icon: '🏆', color: 'bg-purple-500' },
  ];

  // Dummy analytics data
  const data = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 19 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 22 },
    { name: 'Fri', count: 18 },
    { name: 'Sat', count: 8 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Clinic Overview</h1>
        <p className="text-slate-500">Real-time management and insights.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`${stat.color} p-3 rounded-xl text-2xl`}>{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Appointments</h3>
              <select 
                className="bg-slate-50 border-none rounded-lg text-sm font-medium p-2 text-slate-600 focus:ring-2 focus:ring-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Doctor</th>
                    <th className="px-6 py-3">Schedule</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{app.patientName}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[150px]">{app.symptoms || 'Checkup'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">{app.doctorName}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase">{app.specialty}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-800 font-medium">{app.date}</p>
                        <p className="text-xs text-slate-500">{app.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {app.status === 'pending' && (
                            <button 
                              onClick={() => onUpdateStatus(app.id, 'confirmed')}
                              className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600"
                            >
                              Confirm
                            </button>
                          )}
                          {app.status === 'confirmed' && (
                            <button 
                              onClick={() => onUpdateStatus(app.id, 'completed')}
                              className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600"
                            >
                              Complete
                            </button>
                          )}
                          <button 
                            onClick={() => onUpdateStatus(app.id, 'cancelled')}
                            className="text-xs text-slate-400 hover:text-red-500 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
            <h3 className="font-bold text-slate-800 mb-6">Patient Traffic</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#2563eb' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
