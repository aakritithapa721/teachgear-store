import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductList = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5555/api/products');
      console.log('Fetched products:', res.data.products);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Failed to fetch products', err);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5555/api/products/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete the product. Please try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="text-center">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.category}</td>
              <td className="p-2 border">रु {product.price.toLocaleString('en-IN')}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => alert("Edit feature to implement")}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
