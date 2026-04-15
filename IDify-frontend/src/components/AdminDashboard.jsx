import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Search, LogOut, Menu, X, MapPin, Calendar, CreditCard, UserCircle, Send  } from 'lucide-react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]); // Initialized as array
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | verified | rejected
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusUpdatingUserId, setStatusUpdatingUserId] = useState(null);
  const navigate = useNavigate();
  // Hardcoded sidebar list
  const navItems = [
    { id: 1, name: 'User Queries' },
 
  ];

  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiBase}/api/auth/get-all-users`, {
          withCredentials: true,
        });
        
        // Safety check: ensure we are setting an array to state
        const data = response.data;
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("API did not return an array. Received:", data);
          setUsers([]); 
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        const msg = err?.response?.data?.message || err?.message || "Failed to load user data.";
        setError(msg);
        setUsers([]); 
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedUser(null);
    };
    if (selectedUser) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedUser]);

  const getUserStatus = (user) => user?.status || 'pending';
  const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : 'N/A');

  const handleSetStatus = async (user, nextStatus) => {
    const userId = user?._id;
    if (!userId) return;

    const currentStatus = getUserStatus(user);
    if (currentStatus === nextStatus) return;

    const fullName = `${user.firstName || ''} ${user.middleName || ''} ${user.lastName || ''}`.replace(/\s+/g, ' ').trim();
    const ok = window.confirm(`Mark ${fullName || 'this user'} as ${nextStatus}?`);
    if (!ok) return;

    try {
      setStatusUpdatingUserId(userId);
      const response = await axios.put(
        `${apiBase}/api/auth/update-user-status/${userId}`,
        { status: nextStatus },
        { withCredentials: true }
      );

      const updatedUser = response?.data?.user;
      setUsers((prev) =>
        Array.isArray(prev)
          ? prev.map((u) => (u?._id === userId ? { ...u, ...(updatedUser || {}), status: nextStatus } : u))
          : prev
      );
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to update status';
      window.alert(msg);
    } finally {
      setStatusUpdatingUserId(null);
    }
  };

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
      {/* Details Modal */}
      {selectedUser && (
        <div className="fixed t-10 inset-0 z-[60] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />

          <div className="relative w-[95vw] sm:max-w-5xl bg-[#161a21] border border-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
            <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">User details</p>
                <h2 className="text-lg sm:text-xl font-bold text-white truncate">
                  {selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}
                </h2>
                <p className="text-xs text-gray-500 truncate">{selectedUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-4 mb-6">
                {selectedUser.photo ? (
                  <img
                    src={selectedUser.photo}
                    alt="profile"
                    className="w-10 h-16 rounded-full object-cover ring-2 ring-blue-500/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                    <UserCircle size={34} className="text-gray-500" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-3">
                      <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-1">Status</p>
                      <p className="text-sm text-gray-200 font-semibold">{getUserStatus(selectedUser)}</p>
                    </div>
                    <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-3">
                      <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-1">Pronoun</p>
                      <p className="text-sm text-gray-200">{selectedUser.pronoun || 'N/A'}</p>
                    </div>
                    <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-3">
                      <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-1">Telegram ID</p>
                      <p className="text-sm text-gray-200 break-words">{selectedUser.tellegramId || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Identity</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-200 break-words">
                      {`${selectedUser.firstName || ''} ${selectedUser.middleName || ''} ${selectedUser.lastName || ''}`.replace(/\s+/g, ' ').trim() || 'N/A'}
                    </p>
                    <p className="text-gray-400 break-words">{selectedUser.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Address</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-200 break-words">{selectedUser.addressOne || 'N/A'}</p>
                    <p className="text-gray-200 break-words">{selectedUser.addressTwo || 'N/A'}</p>
                    <p className="text-gray-300 break-words">{selectedUser.city || 'N/A'} {selectedUser.postalCode || ''}</p>
                  </div>
                </div>

                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Personal</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Birth date</p>
                      <p className="text-gray-200">{formatDate(selectedUser.dateOfBirth)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Gender</p>
                      <p className="text-gray-200">{selectedUser.gender || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">License</p>
                  <p className="text-gray-200 break-words text-sm">{selectedUser.license || 'N/A'}</p>
                </div>

                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Payment reference</p>
                  <p className="text-gray-200 break-words text-sm">{selectedUser.paymentRef || 'N/A'}</p>
                </div>

                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Timestamps</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Created</p>
                      <p className="text-gray-200">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase font-bold">Updated</p>
                      <p className="text-gray-200">{formatDate(selectedUser.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Photo</p>
                  {selectedUser.photo ? (
                    <img src={selectedUser.photo} alt="photo" className="w-auto h-25 object-contain-contain" />
                  ) : (
                    <span className="text-sm text-gray-500 italic">None provided</span>
                  )}
                </div>
                <div className="bg-[#0d0f14] border border-gray-800 rounded-xl p-4">
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mb-2">Signature</p>
                  {selectedUser.signature ? (
                    <img src={selectedUser.signature} alt="sig" className="w-full max-h-64 object-contain rounded bg-white" />
                  ) : (
                    <span className="text-sm text-gray-500 italic">None provided</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-200 hover:bg-blue-600/30 transition-colors text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
                <div
                  key={user._id}
                  className="text-left bg-[#161a21] border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  
                  {/* Card Profile Area */}
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="w-full text-left p-5 flex items-center space-x-4 border-b border-gray-800 bg-gradient-to-br from-blue-500/5 to-transparent focus:outline-none"
                  >
                    {user.photo ? (
                      <img src={user.photo} alt="profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                        <UserCircle size={28} className="text-gray-500" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-white truncate">{user.firstName} {user.middleName} {user.lastName}</h3>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </button>

                  {/* Body Content */}
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="w-full text-left p-5 space-y-4 focus:outline-none"
                  >
                    <div className="flex space-x-3 text-sm">
                      <div className="text-left">
                      <MapPin size={16} className="text-blue-500 mt-1 shrink-0" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">Location</p>
                        <p className="text-gray-300 leading-tight">{user.addressOne}, {user.city} {user.postalCode}</p>
                      </div>
                      <div className=" text-left ml-10">
                     <div className="flex items-center space-x-2">
                     <Send size={16} className="text-blue-500" />
                     <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">Telegram ID</p>
                     </div>
                        <p className="pl-5 text-gray-300 leading-tight">{user.tellegramId}</p>
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
                  </button>

                  {/* Status Buttons */}
                  <div className="px-5 py-3 bg-[#1a1f27] border-t border-gray-800/60 flex items-center justify-between gap-2">
                    {(['pending', 'verified', 'rejected'] || []).map((s) => {
                      const current = getUserStatus(user);
                      const isActive = current === s;
                      const isBusy = statusUpdatingUserId === user._id;

                      const base =
                        'px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40';
                      const active =
                        s === 'pending'
                          ? 'bg-yellow-500/15 border-yellow-500/30 text-yellow-200'
                          : s === 'verified'
                            ? 'bg-green-500/15 border-green-500/30 text-green-200'
                            : 'bg-red-500/15 border-red-500/30 text-red-200';
                      const inactive =
                        'bg-[#161a21] border-gray-800 text-gray-300 hover:border-blue-500/30 hover:text-blue-300';

                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={isBusy}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSetStatus(user, s);
                          }}
                          className={`${base} ${isActive ? active : inactive} ${isBusy ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          {s === 'pending' ? 'Pending' : s === 'verified' ? 'Verified' : 'Rejected'}
                        </button>
                      );
                    })}
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