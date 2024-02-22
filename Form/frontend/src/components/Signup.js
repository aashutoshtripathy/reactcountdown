import React from 'react'
import { useState } from 'react'

const Signup = () => {
    const [inpVal, setInpVal] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
    })


    function handleChange(identifier,value){
        setInpVal(prevVal => ({
            ...prevVal,
            [identifier]: value
        }))
    }


    function handleSubmit(e){
        e.preventDefault();

        setInpVal({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='fname'>First Name:</label>
            <input type='text' name='fname' id='fname' onChange={(e) => handleChange('fname',e.target.value)} value={inpVal.fname}/>
            <label htmlFor='lname'>Last Name:</label>
            <input type='text' name='lname' id='lname' onChange={(e) => handleChange('lname',e.target.value)} value={inpVal.lname}/>
            <label htmlFor='email'>E-Mail</label>
            <input type='email' name='email' id='email' onChange={(e) => handleChange('email',e.target.value)} value={inpVal.email}/>
            <label htmlFor='pass'>Password:</label>
            <input type='password' name='pass' id='pass' onChange={(e) => handleChange('password',e.target.value)} value={inpVal.password}/>
            <label htmlFor='cpass'>Re-Password:</label>
            <input type='text' name='cpass' id='cpass' onChange={(e) => handleChange('cpassword',e.target.value)} value={inpVal.cpassword}/>    
            <input type='submit' value={`SignUp`} />
        </form>
    </div>
  )
}

export default Signup