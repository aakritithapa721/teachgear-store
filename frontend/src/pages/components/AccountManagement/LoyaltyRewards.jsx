import React, { useState } from 'react';
import { Gift } from 'lucide-react';

const LoyaltyRewards = () => {
  const [userPoints] = useState(2850);
  const [tier] = useState('Silver');
  const [pointsToNext] = useState(1150);

  const rewards = [
    { id: 1, name: '$5 Off Coupon', points: 500, available: true },
    { id: 2, name: '$10 Off Coupon', points: 1000, available: true },
    { id: 3, name: 'Free Shipping', points: 750, available: true },
    { id: 4, name: '$25 Off Coupon', points: 2500, available: true },
    { id: 5, name: 'Premium Support', points: 3000, available: false },
    { id: 6, name: '$50 Off Coupon', points: 5000, available: false }
  ];

  const transactions = [
    { id: 1, description: 'Order #12345', points: 50, date: '2024-01-15', type: 'earned' },
    { id: 2, description: 'Redeemed $10 Coupon', points: -1000, date: '2024-01-10', type: 'redeemed' },
    { id: 3, description: 'Order #12344', points: 75, date: '2024-01-08', type: 'earned' },
    { id: 4, description: 'Bonus Points', points: 200, date: '2024-01-05', type: 'bonus' }
  ];

  const redeemReward = (reward) => {
    if (userPoints >= reward.points && reward.available) {
      alert(`Successfully redeemed ${reward.name}!`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loyalty Rewards</h2>
        <p className="text-gray-600">Earn points with every purchase and redeem them for rewards</p>
      </div>

      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90">Current Points</div>
          <div className="text-3xl font-bold">{userPoints.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90">Tier Status</div>
          <div className="text-3xl font-bold">{tier}</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90">Points to Gold</div>
          <div className="text-3xl font-bold">{pointsToNext.toLocaleString()}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Progress to Next Tier</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Silver</span>
          <span className="text-sm font-medium text-gray-600">Gold (4000 points)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(userPoints / 4000) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{pointsToNext} more points needed for Gold tier</p>
      </div>

      {/* Available Rewards */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => {
            const canRedeem = userPoints >= reward.points && reward.available;
            return (
              <div
                key={reward.id}
                className={`border rounded-lg p-4 ${
                  canRedeem ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Gift size={20} className={canRedeem ? 'text-blue-600' : 'text-gray-400'} />
                  <span className={`text-sm font-medium ${canRedeem ? 'text-blue-600' : 'text-gray-500'}`}>
                    {reward.points} pts
                  </span>
                </div>
                <h4 className="font-medium mb-2">{reward.name}</h4>
                <button
                  onClick={() => redeemReward(reward)}
                  disabled={!canRedeem}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    canRedeem
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canRedeem ? 'Redeem' : 'Not Available'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Points History</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
              <div className={`font-semibold ${
                transaction.points > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.points > 0 ? '+' : ''}{transaction.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyRewards;