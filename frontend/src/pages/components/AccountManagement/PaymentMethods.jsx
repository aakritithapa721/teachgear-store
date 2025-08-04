// src/pages/account/PaymentMethods.jsx
import React, { useState } from 'react';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '03/26', isDefault: false }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleAddCard = () => {
    if (newCard.number && newCard.expiry && newCard.cvv && newCard.name) {
      const last4 = newCard.number.slice(-4);
      const newMethod = {
        id: Date.now(),
        type: 'Visa', // Simplified for demo
        last4,
        expiry: newCard.expiry,
        isDefault: false
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      setNewCard({ number: '', expiry: '', cvv: '', name: '' });
      setShowAddForm(false);
    }
  };

  const removeCard = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const setDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h2>
          <p className="text-gray-600">Manage your saved payment methods</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Card
        </button>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <CreditCard size={16} className="text-white" />
              </div>
              <div>
                <div className="font-medium">{method.type} •••• {method.last4}</div>
                <div className="text-sm text-gray-500">Expires {method.expiry}</div>
              </div>
              {method.isDefault && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Default
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <button
                  onClick={() => setDefault(method.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Set Default
                </button>
              )}
              <button
                onClick={() => removeCard(method.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Card Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={newCard.number}
                onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={newCard.cvv}
                onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCard}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;