// src/pages/components/Admin/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ darkMode }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '', // Added category
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProductData({ ...productData, image: e.target.files[0] });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category); // Add category
    formData.append('image', productData.image);

    try {
      const res = await axios.post('http://localhost:5555/api/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        alert('Product added successfully!');
        setProductData({
          name: '',
          description: '',
          price: '',
          category: '',
          image: '',
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Error while adding product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-8 max-w-2xl mx-auto min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={productData.description}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price ($) *</label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              value={productData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="">Select Category</option>
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
          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:mr-4' : 'bg-white border-gray-300 text-gray-900 file:bg-gray-100 file:text-gray-700 file:border-0 file:rounded file:px-4 file:py-2 file:mr-4'}`}
            />
            <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:bg-green-700'} text-white`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Product...
                </span>
              ) : (
                '+ Add Product'
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setProductData({ name: '', description: '', price: '', category: '', image: '' });
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-700'}`}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;