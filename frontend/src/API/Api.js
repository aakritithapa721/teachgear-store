import axios from 'axios';

const ApiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const createUserApi = (data) => ApiFormData.post("/api/test/createUsers", data);
export const RegisterUserApi = (data) => Api.post("/api/test/createUsers", data);
export const LoginUserApi = (data) => Api.post("/api/test/loginUser", data); // Fixed: LoginUser -> loginUser
export const addProductApi = (formData) => ApiFormData.post("/api/products/add", formData);

// Fetch products with optional search and category filters
export const fetchProducts = (search = '', category = '') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  return Api.get(`/api/products?${params.toString()}`).then(res => res.data.products);
};

// Update product (by ID) — changed POST to PUT here
export const updateProductApi = (productId, data) => Api.put(`/api/products/update/${productId}`, data);

// Delete product (by ID)
export const deleteProductApi = (productId) => Api.delete(`/api/products/delete/${productId}`);

// Fetch single product details
export const getProductDetailsApi = (productId) => Api.get(`/api/products/${productId}`).then(res => res.data.product);
