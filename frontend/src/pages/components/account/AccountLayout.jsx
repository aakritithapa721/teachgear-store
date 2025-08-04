import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountSidebar from './AccountSidebar';

const AccountLayout = ({ darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <AccountSidebar darkMode={darkMode} />
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;