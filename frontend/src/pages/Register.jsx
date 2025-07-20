import { useState} from 'react'
import { createUserApi } from '../API/Api';
import toast from 'react-hot-toast';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit  = async (e) => {
      if (!name || !email || !password) {
        return toast.error("enter all field")
      }
      try{
        const formData = new FormData();
        formData.append('username', name);
        formData.append('email', email);
        formData.append('password', password);
        const response= await createUserApi(formData);
        if(response?.data?.success){
          return toast.success(response?.data?.message)
        }
        else{
          return toast.error(response?.data?.message)
        }

      }catch (err) {
        console.error("Error creating user:", err);
        toast.error(err?.response?.data?.message)
      }


    }

  return (
    <div>
      <form className='mt-10 '>
        <input type="text" name="name" value={name} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setName(e.target.value)} placeholder='name' />
        <input type="text" name="email" value={email} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type="text" name="password" value={password} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setPassword(e.target.value)} placeholder='password' />
      </form>
      <button onClick={submit} className='bg-green-400 text-white rounded-sm p-3 ml-4'></button>
      <p>live preiew</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{password}</p>
    </div>
  )
}

export default Register
