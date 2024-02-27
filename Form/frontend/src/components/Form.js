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

    const [error, setError] = useState({
        pass: '',
        cpass: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();


        if(inpVal.pass !== inpVal.cpass) {
            setError((prevError) => ({
                ...prevError,
                cpass: 'Password dont match'
            }))
            return;
        } else {
            setError((prevError) => ({
                ...prevError,
                cpass: ''
            }))
        }

        


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
        <input type="radio" id="Male" name="gender" checked={inpVal.gender === 'male'} value="male" onChange={() => handleChange('gender','male')}/>
        </label>
        <label htmlFor="Female">Female
        <input type="radio" id="Female" name="gender" checked={inpVal.gender === 'female'} value="female" onChange={() => handleChange('gender','female')}/>
        </label>
        <label htmlFor="Other">Other
        <input type="radio" id="Other" name="gender" checked={inpVal.gender === 'other'} value="other" onChange={() => handleChange('gender','other')}/>
        </label>
        </div>
        <label>Password:
            <input type='Password' value={inpVal.pass} onChange={(e) => handleChange('pass',e.target.value)} placeholder='Password'/> 
        </label>
        <label>Re-Password:
            <input type='text' value={inpVal.cpass} onChange={(e) => handleChange('cpass',e.target.value)} placeholder='Password'/>
            {error.cpass && <p style={{color:'red'}}>{error.cpass}</p>}
        </label>
        <input style={{width:'10%',backgroundColor:'blue',color:'white'}}  type='submit'/>
        </form>
    </div>
  )
}

export default Form