import { useParams } from 'react-router-dom';
import { FiCheck, FiPackage, FiTruck, FiMapPin, FiHome } from 'react-icons/fi';

const steps = [
  { id: 1, label: 'Order Placed', desc: 'Your order has been placed', icon: FiPackage },
  { id: 2, label: 'Confirmed', desc: 'Seller has confirmed your order', icon: FiCheck },
  { id: 3, label: 'Shipped', desc: 'Your order is on its way', icon: FiTruck },
  { id: 4, label: 'Out for Delivery', desc: 'Your order is out for delivery', icon: FiMapPin },
  { id: 5, label: 'Delivered', desc: 'Order delivered successfully', icon: FiHome },
];

export default function OrderTracking() {
  const { id } = useParams();
  const currentStep = 3;

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A] font-[Outfit]">Track Order</h1>
          <p className="text-sm text-gray-500 font-[Inter] mt-1">
            Order ID: <span className="text-[#00A2A5] font-semibold">{id}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-[Inter] text-gray-500">Estimated Delivery</span>
            <span className="text-sm font-semibold text-[#0F172A] font-[Outfit]">
              Sunday, Jun 8, 2025
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00A2A5] rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100" />

            <div className="space-y-0">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;
                const isPending = step.id > currentStep;

                return (
                  <div key={step.id} className="relative flex gap-5 pb-8 last:pb-0">
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          isCompleted
                            ? 'bg-[#00A2A5] border-[#00A2A5] text-white'
                            : isActive
                            ? 'bg-white border-[#FF5E00] text-[#FF5E00] shadow-md shadow-orange-100'
                            : 'bg-white border-gray-200 text-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex-1 pt-1.5">
                      <p
                        className={`font-semibold text-sm font-[Outfit] ${
                          isCompleted
                            ? 'text-[#00A2A5]'
                            : isActive
                            ? 'text-[#FF5E00]'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                        {isActive && (
                          <span className="ml-2 text-xs bg-orange-50 text-[#FF5E00] px-2 py-0.5 rounded-full font-[Inter] font-medium">
                            Current
                          </span>
                        )}
                      </p>
                      <p
                        className={`text-xs font-[Inter] mt-0.5 ${
                          isPending ? 'text-gray-300' : 'text-gray-400'
                        }`}
                      >
                        {step.desc}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-gray-300 font-[Inter] mt-0.5">
                          {index === 0
                            ? 'Jun 2, 10:32 AM'
                            : index === 1
                            ? 'Jun 2, 2:15 PM'
                            : 'Jun 3, 8:00 AM'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-[#0F172A] font-[Outfit] text-sm mb-3">
            Delivery Address
          </h3>
          <p className="text-sm text-gray-500 font-[Inter] leading-relaxed">
            Md Muakhhir Hussain<br />
            8-3-228/1236/3, Jawahar Nagar<br />
            Hyderabad, Telangana — 500045
          </p>
        </div>
      </div>
    </div>
  );
}
