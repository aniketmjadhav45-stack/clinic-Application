
import React from 'react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, currentView }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      {user && (
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">MediFlow</span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {user.role === 'patient' ? (
              <>
                <NavItem 
                  label="Dashboard" 
                  active={currentView === 'patient-dashboard'} 
                  onClick={() => onNavigate('patient-dashboard')} 
                  icon={<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                />
                <NavItem 
                  label="Book Appointment" 
                  active={currentView === 'booking'} 
                  onClick={() => onNavigate('booking')} 
                  icon={<path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                />
                <NavItem 
                  label="AI Assistant" 
                  active={currentView === 'ai-chat'} 
                  onClick={() => onNavigate('ai-chat')} 
                  icon={<path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />}
                />
              </>
            ) : (
              <>
                <NavItem 
                  label="Admin Home" 
                  active={currentView === 'admin-dashboard'} 
                  onClick={() => onNavigate('admin-dashboard')} 
                  icon={<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                />
                <NavItem 
                  label="Manage Patients" 
                  active={currentView === 'admin-patients'} 
                  onClick={() => onNavigate('admin-patients')} 
                  icon={<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                />
              </>
            )}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-4 p-2 bg-slate-50 rounded-lg">
              <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 p-6">
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon}
    </svg>
    <span className="font-medium">{label}</span>
  </button>
);

export default Layout;
