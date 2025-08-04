import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, updateProductApi, deleteProductApi, getProductDetailsApi } from "../../../Api/Api";
import EditProductModal from './components/EditProductModal';
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  Edit3, 
  Trash2, 
  Eye,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5555';

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    loadProducts();
  }, [debouncedSearch, category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts(debouncedSearch, category);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await deleteProductApi(productId);
        loadProducts();
        // Show success message
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleViewDetails = async (productId) => {
    try {
      const productDetails = await getProductDetailsApi(productId);
      if (!productDetails.specs) {
        productDetails.specs = 'Size: Standard\nWeight: 0.5kg\nColor: Black';
      }
      setModalProduct(productDetails);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
  };

  const closeEditModal = () => {
    setEditProduct(null);
  };

  const handleSaveUpdate = async (updatedData) => {
    try {
      await updateProductApi(editProduct.id, updatedData);
      closeEditModal();
      loadProducts();
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Failed to update product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100', label: 'Out of Stock' };
    if (stock < 10) return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Low Stock' };
    return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'In Stock' };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Package className="text-blue-600 dark:text-blue-400" />
              <span>Product Management</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your store inventory and product listings
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            <Plus size={20} />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
              </div>
              <Package className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => p.stock > 0).length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.stock > 0 && p.stock < 10).length}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Search size={16} className="inline mr-2" />
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name, description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Filter size={16} className="inline mr-2" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="Educational Books">Educational Books</option>
                <option value="Teaching Materials">Teaching Materials</option>
                <option value="School Supplies">School Supplies</option>
                <option value="Technology & Electronics">Technology & Electronics</option>
                <option value="Classroom Furniture">Classroom Furniture</option>
                <option value="Art & Craft Supplies">Art & Craft Supplies</option>
                <option value="Sports & Recreation">Sports & Recreation</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => {
                    const stockStatus = getStockStatus(product.stock || 0);
                    const StatusIcon = stockStatus.icon;
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.image ? `${API_BASE_URL}/uploads/${product.image}` : `${API_BASE_URL}/uploads/placeholder.jpg`}
                              onError={(e) => { e.target.src = `${API_BASE_URL}/uploads/placeholder.jpg`; }}
                              alt={product.name}
                              className="h-16 w-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {product.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(product.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {product.stock || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                            <StatusIcon size={12} className="mr-1" />
                            {stockStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleViewDetails(product.id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 p-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Product Details Modal */}
        {modalProduct && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Product Details</h3>
                <button
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={modalProduct.image ? `${API_BASE_URL}/uploads/${modalProduct.image}` : `${API_BASE_URL}/uploads/placeholder.jpg`}
                    onError={(e) => { e.target.src = `${API_BASE_URL}/uploads/placeholder.jpg`; }}
                    alt={modalProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{modalProduct.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{modalProduct.description}</p>
                  </div>
                  
                  <div>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(modalProduct.price)}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Stock: {modalProduct.stock || 0} units</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Category: {modalProduct.category || 'Uncategorized'}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Specifications</h5>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {modalProduct.specs?.split('\n').map((spec, index) => (
                        <div key={index}>{spec}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => openEditModal(modalProduct)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Edit Product
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={closeEditModal}
            onSave={handleSaveUpdate}
          />
        )}
      </div>
    </div>
  );
}