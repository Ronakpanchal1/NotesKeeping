import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

  let history = useNavigate()

  const [credentials,setCredentials] = useState({email:"",password:""})
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const response = await fetch("http://localhost:5000/api/auth/login",{
      method : 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body : JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json = await response.json()
    console.log(json)

    if(json.success){
      localStorage.setItem('token',json.authToken)
      history('/')
      props.showAlert( 'success', 'Login successfull' )
      
    }else{
      props.showAlert( 'danger', json.error )
    }
    
  }
  return (
    <div>
     <h2 className='mb-3 my-4'>Enter your login details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
        </div>
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}
