import React, { useState } from 'react';
import axios from 'axios';

const Uploads = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', image); // ✅ must match backend field name

    try {
      const res = await axios.post('http://localhost:5555/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product added!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <br />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <br />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <br />
        <input type="file" onChange={handleImageChange} required />
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Uploads;

