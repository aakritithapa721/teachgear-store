import React, { useState, useEffect } from 'react';
import { fetchProducts, updateProductApi, deleteProductApi, getProductDetailsApi } from '../API/Api';
import { useCart } from '../context/Cartcontext'; // assuming this is your Cart context

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const { itemCount, addItem } = useCart();

  // Debounce search input (wait 500ms after typing stops)
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Load products whenever debouncedSearch or category changes
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
    try {
      await deleteProductApi(productId);
      loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
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
            className="border rounded p-4 flex flex-col justify-between"
          >
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="mb-4 object-contain h-40 cursor-pointer"
              onClick={() => handleViewDetails(product.id)}
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-700">
              {new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(product.price)}
            </p>

            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleUpdate(product.id, { name: 'Updated Product Name' })}
              className="mt-4 bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal on clicking outside content
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            <h3 className="text-xl font-semibold">{modalProduct.name}</h3>
            <p>{modalProduct.description}</p>
            <p className="mt-2">
              {new Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' }).format(modalProduct.price)}
            </p>
            <button
              onClick={() => handleAddToCart(modalProduct)}
              className="mt-4 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Add to Cart
            </button>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
