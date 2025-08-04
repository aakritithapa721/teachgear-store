// src/pages/components/Admin/components/EditProductModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    category: product.category || '',
    stock: product.stock || 0,
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (formData.image) {
      data.append('image', formData.image);
    }
    onSave(data);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h3>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;