import { useState} from 'react'
import toast from "react-hot-toast";
import { LoginUserApi } from '../API/Api';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit  = async (e) => {
      if (!email || !password) {
       return toast.error("enter all field")
     
    }
      try{
        const data = {
          email: email, password: password
        }
        const response=await loginUserApi(data);
        if(response?.data?.success){
           localStorage.setItem("token", response?.data?.token)
           toast.success(response?.data?.message)
           const decode = jwtDecode(response?.data?.token)
           if(decode.role==="admin"){
            //return <navigate to >
            setTimeout(() => {
              return window.location.href="/homepage"
            }, 1000);
           }
           else{
            setTimeout(() => {
              return eindow.location.href="/dashboard"
            }, 1000);
           }
           return
        }
        else {
          return toast.error(response?.data?.message)
        }
      }
      catch (err) {
        return toast.error(response?.data?.message)
      }
    }

  return (
    <div>
      <from className='mt-10 '>
        <input type="text" name="email" value={email} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type="text" name="password" value={password} className='border border-amber-300 m-2 p-2'
         onChange={(e) => setPassword(e.target.value)} placeholder='password' />
      </from>
      <button onClick={submit} className='bg-green-400 text-white rounded-sm p-3 ml-4'></button>
      <p>live preiew</p>
      <p>{email}</p>
      <p>{password}</p>
    </div>
  )
}

export default Login
