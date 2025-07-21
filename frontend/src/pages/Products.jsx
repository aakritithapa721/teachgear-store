/*import { useState } from "react";
import { addProductApi } from "../API/Api"; 
import toast from "react-hot-toast";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [cart, setCart] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !image)
      return toast.error("All fields required");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      const res = await addProductApi(formData);
      if (res?.data?.success) {
        toast.success("Product added");
        setCart([...cart, { name, description, price }]);
        setName(""); setDescription(""); setPrice(""); setImage(null);
      } else toast.error(res.data.message);
    } catch (err) {
      toast.error("Error adding product");
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="mt-10">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border m-2 p-2" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border m-2 p-2" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="border m-2 p-2" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="m-2" />
        <button type="submit" className="bg-red-300 text-white p-2 ml-2">Add Product</button>
      </form>

      {cart.length > 0 && (
        <div className="mt-4">
          <h3>Cart</h3>
          <ul>
            {cart.map((item, i) => (
              <li key={i}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AddProduct;

*/

import React, { useState, useEffect } from 'react';
import { fetchProducts, updateProductApi, deleteProductApi, getProductDetailsApi } from '../API/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalProduct, setModalProduct] = useState(null); // State for Modal
  const { itemCount, addItem } = useCart(); // Using Cart Context - correct destructuring

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts(search, category);
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
      setModalProduct(productDetails); // Open Modal
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  const closeModal = () => {
    setModalProduct(null); // Close Modal
  };

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      {/* Display cart count */}
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
              onClick={() => handleViewDetails(product.id)} // Open modal on click
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-700">${product.price}</p>

            <button
              onClick={() => handleAddToCart(product)} // Pass the actual product
              className="mt-4 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>

            {/* Update and Delete buttons */}
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

      {/* Product Details Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold">{modalProduct.name}</h3>
            <p>{modalProduct.description}</p>
            <p className="mt-2">${modalProduct.price}</p>
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