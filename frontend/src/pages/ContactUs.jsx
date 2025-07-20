/*import React from 'react'

const ContactUs = () => {
    //js ko functions
  return (

    //html css code
    <div className=''>
        ContactUs at asdf@gmail.com
    </div>
  )
}

export default ContactUs*/

import React, { useState } from 'react'
import { Buttons,Textfields } from './components/Elements';
const ContactUs = () => {
  const [liked, setLiked] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    //classname = flex flex-wrap flex-coln
    <div className="flex flex-wrap">
       <button onClick={()=> setLiked(!liked)}
        className={`${liked ? "bg-red-200": "bg-green-200"}
        rounded-sm p-2 w-100 mt-10 text-black `}>
        {liked ? "liked💕" : "like👌"}
      </button>

      <button onClick={()=> setDark(!dark)}
        className={`${dark ? "bg-pink-200 text-black": "bg-blue-200 text-black"}
        rounded-sm p-2 w-100 mt-10`}>
        {dark ? "dark theme💕" : "light theme👌"}
      </button>

       <p className={`${dark ? "bg-black text-white": "bg-white text-black"}`}>hehe</p>
       <p className={`${dark ? "bg-black text-white": "bg-white text-black"}`}>hoho</p>

       <Textfields placeholder="name" text="number"
       onChange={(e) => alert("change")} name="name" />

       
      <Buttons label="click" onclick={() => alert("alert message")} />
      <Buttons label="click" onclick={() => alert("alert")} />
      <Buttons label="click error" className='bg-red-500 p-2 m-4 rounded-sm' onclick={() => alert("alert error")} />


    </div>
  )
}

export default ContactUs
