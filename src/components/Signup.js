import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Signup(props) {


  let history = useNavigate()

  const [credentials,setCredentials] = useState({ name:"" , email:"" , password:"", Cpassword:"" })

  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handleSubmitForm = async(e)=>{
    e.preventDefault()

    const {name, email, password, Cpassword} = credentials

    const response = await fetch("http://localhost:5000/api/auth/createuser",{

      method : 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body : JSON.stringify({ name, email, password })
    })
    const json = await response.json()

    if(json.error){
      props.showAlert( 'danger', json.error )
      
    }else{
      localStorage.setItem('token',json.authToken)
      history('/')
      props.showAlert( 'success', 'Account created successfully' )
    }
  }

  
  return (
    <div className='container'>
      <h2 className="mb-3 my-4">Create a new account</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3 my-4">
          <label htmlFor="name" className="form-label">Enter your full name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="Cpassword" name="Cpassword" value={credentials.Cpassword} onChange={onChange} minLength={5} required />
        </div>
        <button className='btn btn-primary'>Login</button>
      </form>
    </div>
  )
}
