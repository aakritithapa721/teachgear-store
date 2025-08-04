import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter,
  Eye,
  RotateCcw
} from 'lucide-react';

const MyOrders = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: '#ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: '$149.99',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: '$99.99' },
        { name: 'Phone Case', quantity: 2, price: '$25.00' }
      ],
      trackingNumber: 'TRK123456789'
    },
    {
      id: '#ORD-002',
      date: '2024-01-12',
      status: 'Shipped',
      total: '$89.50',
      items: [
        { name: 'Laptop Stand', quantity: 1, price: '$59.99' },
        { name: 'USB Cable', quantity: 1, price: '$19.99' }
      ],
      trackingNumber: 'TRK987654321'
    },
    {
      id: '#ORD-003',
      date: '2024-01-10',
      status: 'Processing',
      total: '$234.00',
      items: [
        { name: 'Mechanical Keyboard', quantity: 1, price: '$149.99' },
        { name: 'Gaming Mouse', quantity: 1, price: '$79.99' }
      ],
      trackingNumber: null
    },
    {
      id: '#ORD-004',
      date: '2024-01-08',
      status: 'Cancelled',
      total: '$45.00',
      items: [
        { name: 'Screen Cleaner', quantity: 3, price: '$15.00' }
      ],
      trackingNumber: null
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-green-500" size={20} />;
      case 'Shipped': return <Truck className="text-blue-500" size={20} />;
      case 'Processing': return <Clock className="text-yellow-500" size={20} />;
      case 'Cancelled': return <RotateCcw className="text-red-500" size={20} />;
      default: return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return darkMode ? 'text-green-400 bg-green-900' : 'text-green-700 bg-green-100';
      case 'Shipped': return darkMode ? 'text-blue-400 bg-blue-900' : 'text-blue-700 bg-blue-100';
      case 'Processing': return darkMode ? 'text-yellow-400 bg-yellow-900' : 'text-yellow-700 bg-yellow-100';
      case 'Cancelled': return darkMode ? 'text-red-400 bg-red-900' : 'text-red-700 bg-red-100';
      default: return darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-700 bg-gray-100';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Orders
        </h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Track and manage your orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        <div className="relative">
          <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } shadow-sm hover:shadow-md transition-shadow`}
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {order.id}
                </h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ordered on {order.date}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Package size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total: {order.total}
                </span>
                {order.trackingNumber && (
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tracking: {order.trackingNumber}
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Eye size={16} className="mr-2" />
                  View Details
                </button>
                
                {order.status === 'Delivered' && (
                  <button className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Package size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;