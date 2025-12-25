import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  UserCheck,
  Chart,
  Dollar,
  Magnifer,
  Logout,
  Refresh,
  Heart,
  MapPoint,
  Planet,
  Calendar,
  CheckCircle,
  CloseCircle,
  ClockCircle,
  Phone,
  ChatRound,
  VideoFrame,
  Filter
} from "@solar-icons/react";

interface User {
  _id: string;
  phoneNumber: string;
  avatar_url?: string;
  role: "user" | "listener";
  is_active: boolean;
  nickname: string;
  has_completed_onboarding: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Listener {
  _id: string;
  user_id: string;
  kyc_status: "verified" | "pending" | "rejected";
  is_available: boolean;
  is_accepting_requests: boolean;
  audio_call_per_minute_rate: number;
  video_call_per_minute_rate: number;
  cost_per_chat_message: number;
  bio: string;
  languages: string[];
  country: string;
  city: string;
  state: string;
  zip: string;
  availability: {
    timezone: string;
    schedule: Record<string, any>;
  };
  area_of_expertise: string[];
  earnings_balance: number;
  createdAt: string;
  updatedAt: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [listeners, setListeners] = useState<Listener[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "listeners">("users");
  const [filterRole, setFilterRole] = useState<"all" | "user" | "listener">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, listenersRes] = await Promise.all([
        fetch("http://localhost:8000/api/v1/dash/users"),
        fetch("http://localhost:8000/api/v1/dash/listeners")
      ]);

      if (!usersRes.ok) {
        throw new Error(`Failed to fetch users: ${usersRes.statusText}`);
      }
      if (!listenersRes.ok) {
        throw new Error(`Failed to fetch listeners: ${listenersRes.statusText}`);
      }

      const usersData = await usersRes.json();
      const listenersData = await listenersRes.json();

      if (usersData.success) {
        setUsers(usersData.data || []);
      } else {
        setError("Failed to load users data");
      }
      
      if (listenersData.success) {
        setListeners(listenersData.data || []);
      } else {
        setError("Failed to load listeners data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch data. Please check if the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      (user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (user.phoneNumber?.includes(searchTerm) ?? false);
    
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && user.is_active) ||
      (filterStatus === "inactive" && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredListeners = listeners.filter((listener) => {
    const matchesSearch = 
      (listener.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (listener.country?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (listener.city?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (listener.area_of_expertise?.some(exp => exp?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false);

    return matchesSearch;
  });

  const totalUsers = users.length;
  const totalListeners = listeners.length;
  const activeUsers = users.filter(u => u.is_active).length;
  const activeListeners = listeners.filter(l => l.is_available).length;
  const totalEarnings = listeners.reduce((sum, l) => sum + l.earnings_balance, 0);
  const verifiedListeners = listeners.filter(l => l.kyc_status === "verified").length;

  const getKycBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500 text-white"><CheckCircle size={12} weight="Bold" className="mr-1" />Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white"><ClockCircle size={12} weight="Bold" className="mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500 text-white"><CloseCircle size={12} weight="Bold" className="mr-1" />Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Heart size={32} weight="Bold" className="text-[#DC67FF]" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#DC67FF] to-[#89BFF4] bg-clip-text text-transparent">
                  Empathy.in Dashboard
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchData}
                disabled={loading}
              >
                <Refresh size={16} weight="Outline" className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
              >
                <Logout size={16} weight="Outline" className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <Card className="border-0 shadow-lg mb-6 bg-red-50 border-l-4 border-red-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CloseCircle size={20} weight="Bold" className="text-red-500" />
                <div>
                  <p className="font-semibold text-red-800">Error Loading Data</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchData}
                  className="ml-auto"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
                  <p className="text-xs text-gray-500 mt-1">{activeUsers} active</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DC67FF] to-[#89BFF4] flex items-center justify-center">
                  <User size={24} weight="Bold" className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Listeners</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalListeners}</p>
                  <p className="text-xs text-gray-500 mt-1">{activeListeners} available</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified Listeners</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{verifiedListeners}</p>
                  <p className="text-xs text-gray-500 mt-1">KYC verified</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle size={24} weight="Bold" className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-6" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalEarnings)}</p>
                  <p className="text-xs text-gray-500 mt-1">All listeners</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Dollar size={24} weight="Bold" className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Search */}
        <Card className="border-0 shadow-lg mb-6" style={{ backgroundColor: '#ffffff' }}>
          <CardHeader style={{ backgroundColor: '#ffffff' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "users" ? "default" : "outline"}
                  onClick={() => setActiveTab("users")}
                  className={activeTab === "users" ? "bg-gradient-to-r from-[#DC67FF] to-[#89BFF4] text-white" : ""}
                >
                  <User size={16} weight="Outline" className="mr-2" />
                  Users ({totalUsers})
                </Button>
                <Button
                  variant={activeTab === "listeners" ? "default" : "outline"}
                  onClick={() => setActiveTab("listeners")}
                  className={activeTab === "listeners" ? "bg-gradient-to-r from-[#DC67FF] to-[#89BFF4] text-white" : ""}
                >
                  <UserCheck size={16} weight="Outline" className="mr-2" />
                  Listeners ({totalListeners})
                </Button>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {activeTab === "users" && (
                  <>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Roles</option>
                      <option value="user">Users</option>
                      <option value="listener">Listeners</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </>
                )}
                <div className="relative flex-1 sm:flex-initial">
                  <Magnifer size={16} weight="Outline" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Users Table */}
        {activeTab === "users" && (
          <Card className="border-0 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12" style={{ backgroundColor: '#ffffff' }}>
                  <Refresh size={32} weight="Outline" className="animate-spin text-[#DC67FF]" />
                </div>
              ) : (
                <div className="overflow-x-auto" style={{ backgroundColor: '#ffffff' }}>
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200" style={{ backgroundColor: '#ffffff' }}>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-500" style={{ backgroundColor: '#ffffff' }}>
                            No users found
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user._id} className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#ffffff' }}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC67FF] to-[#89BFF4] flex items-center justify-center text-white font-semibold overflow-hidden">
                                  {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={user.nickname || "User"} className="w-full h-full object-cover" />
                                  ) : (
                                    (user.nickname?.charAt(0) || "U").toUpperCase()
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.nickname || "Unknown User"}</div>
                                  <div className="text-sm text-gray-500">ID: {user._id.slice(-8)}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phoneNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={user.role === "listener" ? "default" : "outline"}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.is_active ? (
                                <Badge className="bg-green-500 text-white">Active</Badge>
                              ) : (
                                <Badge className="bg-gray-400 text-white">Inactive</Badge>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.has_completed_onboarding ? (
                                <CheckCircle size={20} weight="Bold" className="text-green-500" />
                              ) : (
                                <ClockCircle size={20} weight="Bold" className="text-yellow-500" />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.createdAt)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Listeners Table */}
        {activeTab === "listeners" && (
          <Card className="border-0 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12" style={{ backgroundColor: '#ffffff' }}>
                  <Refresh size={32} weight="Outline" className="animate-spin text-[#DC67FF]" />
                </div>
              ) : (
                <div className="overflow-x-auto" style={{ backgroundColor: '#ffffff' }}>
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200" style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listener</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KYC Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200" style={{ backgroundColor: '#ffffff' }}>
                      {filteredListeners.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-gray-500" style={{ backgroundColor: '#ffffff' }}>
                            No listeners found
                          </td>
                        </tr>
                      ) : (
                        filteredListeners.map((listener) => (
                          <tr key={listener._id} className="hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#ffffff' }}>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                                  L
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{listener.bio || "Listener"}</div>
                                  <div className="text-xs text-gray-500">{listener.languages.join(", ")}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{listener.city}, {listener.state}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Planet size={12} weight="Outline" />
                                {listener.country}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getKycBadge(listener.kyc_status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                {listener.is_available ? (
                                  <Badge className="bg-green-500 text-white">Available</Badge>
                                ) : (
                                  <Badge className="bg-gray-400 text-white">Unavailable</Badge>
                                )}
                                {listener.is_accepting_requests && (
                                  <div className="text-xs text-gray-500">Accepting requests</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs space-y-1">
                                <div className="flex items-center gap-1">
                                  <Phone size={12} weight="Outline" className="text-gray-400" />
                                  <span>${listener.audio_call_per_minute_rate}/min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <VideoFrame size={12} weight="Outline" className="text-gray-400" />
                                  <span>${listener.video_call_per_minute_rate}/min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ChatRound size={12} weight="Outline" className="text-gray-400" />
                                  <span>${listener.cost_per_chat_message}/msg</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {formatCurrency(listener.earnings_balance)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {listener.area_of_expertise.slice(0, 2).map((exp, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {exp}
                                  </Badge>
                                ))}
                                {listener.area_of_expertise.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{listener.area_of_expertise.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

