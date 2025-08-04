import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Shield,
  BarChart3,
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout from the admin panel?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col p-6">
        <div className="flex items-center mb-8">
          <Shield className="w-8 h-8 text-red-600 dark:text-red-300 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        </div>

        <nav className="flex flex-col space-y-4 flex-grow">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <Package className="w-5 h-5 mr-3" />
            Add Product
          </NavLink>

          {/* NEW: Product List link added here */}
          <NavLink
            to="/admin/products-list"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <Package className="w-5 h-5 mr-3" />
            Product List
          </NavLink>

          <NavLink
            to="/admin/users/manage"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <Users className="w-5 h-5 mr-3" />
            Manage Users
          </NavLink>

          <NavLink
            to="/admin/orders/review"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Review Orders
          </NavLink>

          <NavLink
            to="/admin/system/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <Settings className="w-5 h-5 mr-3" />
            System Settings
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
