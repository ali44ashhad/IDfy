import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Search, LogOut, Menu, X, MapPin, Calendar, CreditCard, UserCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]); // Initialized as array
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | verified | rejected
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Hardcoded sidebar list
  const navItems = [
    { id: 1, name: 'User Queries' },
 
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/get-all-users`);
        
        // Safety check: ensure we are setting an array to state
        const data = response.data;
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("API did not return an array. Received:", data);
          setUsers([]); 
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load user data.");
        setUsers([]); 
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getUserStatus = (user) => user?.status || 'pending';

  const statusCounts = Array.isArray(users)
    ? users.reduce(
        (acc, user) => {
          const status = getUserStatus(user);
          acc.all += 1;
          if (status === 'pending') acc.pending += 1;
          if (status === 'verified') acc.verified += 1;
          if (status === 'rejected') acc.rejected += 1;
          return acc;
        },
        { all: 0, pending: 0, verified: 0, rejected: 0 }
      )
    : { all: 0, pending: 0, verified: 0, rejected: 0 };

  const statusTabs = [
    { key: 'all', label: 'All', count: statusCounts.all },
    { key: 'pending', label: 'Pending', count: statusCounts.pending },
    { key: 'verified', label: 'Verified', count: statusCounts.verified },
    { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
  ];

  // Filter logic with Array check to prevent "filter is not a function" error
  const filteredUsers = Array.isArray(users) 
    ? users.filter(user => {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase());

        const status = getUserStatus(user);
        const matchesStatus = statusFilter === 'all' ? true : status === statusFilter;

        return matchesSearch && matchesStatus;
      })
    : [];


    const handleLogout = async () => {
        try {
          // Call your existing logout API
          // withCredentials ensures the cookie is sent/manipulated by the backend
          await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin-logout`, {}, {
            withCredentials: true 
          });
      
           localStorage.removeItem('adminToken'); 
          
          // Redirect to login page
          navigate('/'); 
        } catch (err) {
          console.error("Logout failed:", err);
          // Even if API fails, you might want to force redirect the user
          navigate('/login');
        }
      };


  return (
    <div className="pt-30 flex h-screen bg-[#0d0f14] text-gray-200 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        pt-30 fixed inset-y-0 left-0 z-50 w-64 bg-[#161a21] border-r border-gray-800 transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
            Admin Panel
          </span>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation List (Hardcoded) */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600/10 hover:text-blue-400 transition-all text-sm font-medium"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Logout Section (Bottom Left) */}
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors group">
            <LogOut size={18} className="mr-3 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-64 w-full">
        
        {/* Header */}
        <header className="h-16 bg-[#161a21]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <button className="lg:hidden p-2 hover:bg-gray-800 rounded-md" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex justify-end">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search by name..."
                className="w-full bg-[#0d0f14] border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">User Inquiries</h1>
            <p className="text-gray-500 text-sm">Managing {filteredUsers.length} records</p>
          </div>

          {/* Status Filter Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {statusTabs.map((tab) => {
              const isActive = statusFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-semibold border transition-colors
                    ${isActive
                      ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                      : 'bg-[#161a21] border-gray-800 text-gray-300 hover:border-blue-500/30 hover:text-blue-300'}
                  `}
                >
                  <span>{tab.label}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-500/20 text-blue-200' : 'bg-gray-800 text-gray-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10 bg-red-500/5 rounded-xl border border-red-500/20">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div key={user._id} className="bg-[#161a21] border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/30 transition-colors">
                  
                  {/* Card Profile Area */}
                  <div className="p-5 flex items-center space-x-4 border-b border-gray-800 bg-gradient-to-br from-blue-500/5 to-transparent">
                    {user.photo ? (
                      <img src={user.photo} alt="profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <UserCircle size={28} className="text-gray-500" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-white truncate">{user.firstName} {user.lastName}</h3>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start space-x-3 text-sm">
                      <MapPin size={16} className="text-blue-500 mt-1 shrink-0" />
                      <div>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">Location</p>
                        <p className="text-gray-300 leading-tight">{user.addressOne}, {user.city} {user.postalCode}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar size={16} className="text-blue-500 shrink-0" />
                        <div>
                          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">Birth Date</p>
                          <p className="text-gray-300">{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <CreditCard size={16} className="text-blue-500 shrink-0" />
                        <div>
                          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">License</p>
                          <p className="text-gray-300 truncate">{user.license || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800/50 flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 text-[10px] uppercase font-bold">Gender</p>
                        <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">{user.gender}</span>
                      </div>
                      <div>
                        <p className="text-gray-300 text-[15px] font-semibold">payment reference</p>
                        <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-300">{user.paymentRef}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-[10px] uppercase font-bold">Signature</p>
                        {user.signature ? (
                          <img src={user.signature} alt="sig" className="h-8 w-auto bg-white rounded p-0.5 mt-1 ml-auto" />
                        ) : (
                          <span className="text-[10px] text-gray-600 italic">None provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="px-5 py-2.5 bg-[#1a1f27] text-[10px] text-gray-600 flex justify-between items-center">
                    <span className="font-mono">ID: ...{user._id?.slice(-6)}</span>
                    <span>Updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Recent'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;