import React, { useState } from 'react'

export const ListandKeys = () => {
    const [list, setList] = useState([{ id: 1, name: "product1",
        price: 120 , image:"vite.svg"},
        { id: 2, name: "product2", price: 130 }])
    return (
        <div>
            <ul className='flex flex-col'>
                {list.map((item, index) => (
                    <div className='boder border-amber-500 m-4'>
                        <li key={index} > {item}</li>

                    </div>
                ))}
            </ul>
        </div>
    )
}