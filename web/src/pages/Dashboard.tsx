import { useState } from 'react';
import { FiPackage, FiHeart, FiMapPin, FiUser, FiChevronRight } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';

const tabs = [
  { id: 'orders', label: 'My Orders', icon: FiPackage },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'addresses', label: 'Addresses', icon: FiMapPin },
  { id: 'profile', label: 'Profile Settings', icon: FiUser },
];

const mockOrders = [
  { id: 'ZPT-1001', date: '28 May 2025', status: 'Delivered', total: 2499, items: 2 },
  { id: 'ZPT-1002', date: '15 May 2025', status: 'Shipped', total: 7999, items: 1 },
  { id: 'ZPT-1003', date: '02 May 2025', status: 'Processing', total: 1299, items: 3 },
];

const statusColors: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const user = useAuthStore((s) => s.user);
  const [profile, setProfile] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-60 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#00A2A5] flex items-center justify-center text-white font-bold text-lg font-[Outfit]">
              {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-[#0F172A] font-[Outfit] text-sm">
                {user?.full_name || 'Guest User'}
              </p>
              <p className="text-xs text-gray-500 font-[Inter]">{user?.email}</p>
            </div>
          </div>

          <nav className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-[Inter] transition-colors border-b border-gray-50 last:border-0 ${
                    activeTab === tab.id
                      ? 'bg-[#00A2A5]/10 text-[#00A2A5] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                  <FiChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#0F172A] font-[Outfit]">My Orders</h2>
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-[#0F172A] font-[Outfit] text-sm">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-gray-400 font-[Inter] mt-0.5">{order.date}</p>
                    <p className="text-xs text-gray-500 font-[Inter]">{order.items} item(s)</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        statusColors[order.status] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-[#FF5E00] font-bold font-[Outfit]">
                      ₹{order.total.toLocaleString()}
                    </span>
                    <a
                      href={`/order/${order.id}`}
                      className="text-[#00A2A5] text-xs font-semibold hover:underline font-[Inter]"
                    >
                      Track
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] font-[Outfit] mb-4">Wishlist</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400 font-[Inter]">
                <FiHeart className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>Your wishlist is empty</p>
                <a href="/" className="mt-4 inline-block h-10 px-5 rounded-lg bg-[#00A2A5] text-white text-sm font-semibold">
                  Browse Products
                </a>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] font-[Outfit] mb-4">Saved Addresses</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-gray-400 font-[Inter]">
                <FiMapPin className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No saved addresses</p>
                <button className="mt-4 h-10 px-5 rounded-lg bg-[#00A2A5] text-white text-sm font-semibold">
                  + Add Address
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] font-[Outfit] mb-4">Profile Settings</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                {(['full_name', 'email', 'phone'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-gray-500 font-[Inter] mb-1 capitalize">
                      {field.replace('_', ' ')}
                    </label>
                    <input
                      type="text"
                      value={profile[field]}
                      onChange={(e) =>
                        setProfile((p) => ({ ...p, [field]: e.target.value }))
                      }
                      className="w-full h-11 px-4 rounded-lg border border-gray-200 text-sm font-[Inter] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#00A2A5]/30 focus:border-[#00A2A5]"
                    />
                  </div>
                ))}
                <button className="h-11 px-6 rounded-lg bg-[#00A2A5] text-white font-semibold text-sm mt-2 hover:bg-[#008c8f] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
