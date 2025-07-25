import React, { useState, useEffect } from 'react';
import { fetchProducts, updateProductApi, deleteProductApi, getProductDetailsApi } from '../API/Api';
import { useCart } from '../context/Cartcontext';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { itemCount, addItem } = useCart();

  // Add API base URL from environment
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductApi(productId);
        loadProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      await updateProductApi(productId, updatedData);
      loadProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
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

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Items in cart: {itemCount}</p>
      </div>
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow max-w-xs"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Headphones">Headphones</option>
          <option value="Keyboards">Keyboards</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && !loading && <p>No products found.</p>}
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleViewDetails(product.id)}
          >
            <img
              src={product.image ? `${API_BASE_URL}/uploads/${product.image}` : `${API_BASE_URL}/uploads/placeholder.jpg`}
              onError={(e) => { e.target.src = `${API_BASE_URL}/uploads/placeholder.jpg`; }}
              alt={product.name}
              className="mb-4 object-contain h-40"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-700">
              {new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(product.price)}
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
              className="mt-4 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleUpdate(product.id, { name: 'Updated Product Name' }); }}
              className="mt-2 bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700"
            >
              Update
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}
              className="mt-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {modalProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeModal}
            >
              ×
            </button>
            <img
              src={modalProduct.image ? `${API_BASE_URL}/uploads/${modalProduct.image}` : `${API_BASE_URL}/uploads/placeholder.jpg`}
              onError={(e) => { e.target.src = `${API_BASE_URL}/uploads/placeholder.jpg`; }}
              alt={modalProduct.name}
              className="w-full h-48 object-contain mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{modalProduct.name}</h3>
            <p className="text-gray-600 mb-2">{modalProduct.description}</p>
            <p className="text-gray-800 font-medium mb-2">
              {new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(modalProduct.price)}
            </p>
            <div className="specs mb-4">
              <h4 className="font-semibold text-gray-700">Specifications</h4>
              <p className="text-sm text-gray-600">
                {modalProduct.specs.split('\n').map((spec, index) => (
                  <div key={index}>{spec}</div>
                ))}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleAddToCart(modalProduct); }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Add to Cart
            </button>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}