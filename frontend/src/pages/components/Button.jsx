import React, { useState } from 'react'

export const ListandKeys = () => {
    const [list, setList] = useState([
        { id: 1, name: "product1", price: 120, image: "vite.svg" },
        { id: 2, name: "product2", price: 130, image: "vite.svg" }
    ])

    // Function to add a new product
    const addNewProduct = () => {
        const newProduct = {
            id: list.length + 1,
            name: `product${list.length + 1}`,
            price: Math.floor(Math.random() * 200) + 100, // Random price between 100-300
            image: "vite.svg"
        }
        setList([...list, newProduct])
    }

    return (
        <div className="p-4">
            {/* Add New Product Button */}
            <button 
                onClick={addNewProduct}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
                Add New Product
            </button>

            {/* Product List */}
            <ul className='flex flex-col'>
                {list.map((item) => (
                    <div key={item.id} className='border border-amber-500 m-4 p-4 rounded'>
                        <li className="list-none">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12" />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}