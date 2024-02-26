import React from 'react';
import '../App.css';
import { useState } from 'react';

const Form = () => {
    const [inpVal, setInpVal] = useState({
        fname: '',
        lname: '',
        email: '',
        mob: '',
        gender: '',
        pass: '',
        cpass: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();


        setInpVal({
            fname: '',
            lname: '',
            email: '',
            mob: '',
            gender: '',
            pass: '',
            cpass: '' 
            })
    }

    const handleChange = (identifier, value) => {
        setInpVal(prevVal => ({
            ...prevVal,
            [identifier]: value
        }))

        
    }

  return (
    <div>
        <div>
            <h1>SignUp Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label>First Name:
            <input type='text' value={inpVal.fname} onChange={(e) => handleChange('fname',e.target.value)} placeholder='First Name'/>
        </label>
        <label>Last Name:
            <input type='text' value={inpVal.lname} onChange={(e) => handleChange('lname',e.target.value)} placeholder='Last Name'/>
        </label>
        <label>Email:
            <input type='email' value={inpVal.email} onChange={(e) => handleChange('email',e.target.value)} placeholder='Email'/>
        </label>
        <label>Mobile No.:
            <input type='text' value={inpVal.mob} onChange={(e) => handleChange('mob',e.target.value)} placeholder='Mobile'/>
        </label>
        <div>
        <label>Gender:</label><br/>
        <label htmlFor="Male">Male
        <input type="radio" id="Male" name="gender" value="Male"/>
        </label>
        <label htmlFor="Female">Female
        <input type="radio" id="Female" name="gender" value="Female"/>
        </label>
        <label htmlFor="Other">Other
        <input type="radio" id="Other" name="gender" value="Other"/>
        </label>
        </div>
        <label>Password:
            <input type='Password' value={inpVal.pass} placeholder='Password'/>
        </label>
        <label>Re-Password:
            <input type='text' value={inpVal.cpass} placeholder='Password'/>
        </label>
        <input style={{width:'10%',backgroundColor:'blue',color:'white'}}  type='submit'/>
        </form>
    </div>
  )
}

export default Form