import React, { useState, useEffect } from 'react';

const EditProductModal = ({ product, onClose, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
  };

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4 font-medium text-gray-700 dark:text-gray-300">
            Product Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 p-2 rounded w-full mt-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoFocus
            />
          </label>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
