import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { 
  LogOut, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = ({ darkMode }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 145,
    totalProducts: 89,
    totalOrders: 324,
    revenue: 15420
  });

  // State for products list and loading/error
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);

      // Check if user is admin
      if (decoded.role !== 'admin') {
        navigate('/dashboard'); // Redirect non-admins to user dashboard
        return;
      }
    } catch (err) {
      console.error('Invalid token:', err);
      navigate('/login');
    }
  }, [navigate]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setProductError(null);
      try {
        const res = await fetch('http://localhost:5555/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setProductError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`http://localhost:5555/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');

      // Remove deleted product from state
      setProducts(products.filter(product => product._id !== id));
      alert('Product deleted successfully');
    } catch (err) {
      alert(`Error deleting product: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`p-8 min-h-screen ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Admin Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Dashboard
          </h1>
          <p className={`${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Welcome back, {user?.username || user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Users</p>
              <p className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{stats.totalUsers}</p>
            </div>
            <div className={`p-3 rounded-full ${
              darkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Users className={`w-6 h-6 ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`} />
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Products</p>
              <p className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{stats.totalProducts}</p>
            </div>
            <div className={`p-3 rounded-full ${
              darkMode ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <Package className={`w-6 h-6 ${
                darkMode ? 'text-green-300' : 'text-green-600'
              }`} />
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Total Orders</p>
              <p className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{stats.totalOrders}</p>
            </div>
            <div className={`p-3 rounded-full ${
              darkMode ? 'bg-purple-900' : 'bg-purple-100'
            }`}>
              <ShoppingCart className={`w-6 h-6 ${
                darkMode ? 'text-purple-300' : 'text-purple-600'
              }`} />
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Revenue</p>
              <p className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>${stats.revenue.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-full ${
              darkMode ? 'bg-yellow-900' : 'bg-yellow-100'
            }`}>
              <TrendingUp className={`w-6 h-6 ${
                darkMode ? 'text-yellow-300' : 'text-yellow-600'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Product List Section */}
      <div className={`mb-8 p-6 rounded-lg shadow-sm border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-2xl font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Product List
        </h2>

        {loadingProducts && <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Loading products...</p>}
        {productError && <p className="text-red-500">{productError}</p>}

        {!loadingProducts && !productError && products.length === 0 && (
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>No products found.</p>
        )}

        {!loadingProducts && products.length > 0 && (
          <table className={`w-full text-left border-collapse`}>
            <thead>
              <tr>
                <th className={`border-b p-2 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Name</th>
                <th className={`border-b p-2 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Price</th>
                <th className={`border-b p-2 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Category</th>
                <th className={`border-b p-2 ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">${product.price.toFixed(2)}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Settings className="w-5 h-5 mr-2" />
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/admin/add-product')}
              className="w-full flex items-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </button>

            <button
              onClick={() => navigate('/admin/users')}
              className="w-full flex items-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </button>

            <button
              onClick={() => navigate('/admin/orders')}
              className="w-full flex items-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              View All Orders
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <BarChart3 className="w-5 h-5 mr-2" />
            Recent Activity
          </h2>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                darkMode ? 'bg-green-900' : 'bg-green-100'
              }`}>
                <Package className={`w-4 h-4 ${
                  darkMode ? 'text-green-300' : 'text-green-600'
                }`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>New product added</p>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                darkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <Users className={`w-4 h-4 ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>5 new user registrations</p>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>4 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                darkMode ? 'bg-yellow-900' : 'bg-yellow-100'
              }`}>
                <AlertCircle className={`w-4 h-4 ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-600'
                }`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>Low stock alert for 3 products</p>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Product Management</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/admin/products" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>View All Products</a></li>
            <li><a href="/admin/categories" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>Manage Categories</a></li>
            <li><a href="/admin/tags" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>Manage Tags</a></li>
          </ul>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>Order Management</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/admin/orders" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>View All Orders</a></li>
            <li><a href="/admin/returns" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>Manage Returns</a></li>
          </ul>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>User Management</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/admin/users" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>View All Users</a></li>
            <li><a href="/admin/roles" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>Manage Roles</a></li>
            <li><a href="/admin/permissions" className={`hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>Manage Permissions</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
