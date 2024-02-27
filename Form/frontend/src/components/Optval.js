import React from 'react'
import { useState } from 'react'

const Optval = () => {
    const [val, setVal] = useState({
        name:'ashu',
        password: '',
        aim: '',
        email: '',
        status: '',
        pre: ''
    })
    function handleChange(identifier,value){
        setVal(prevVal => ({
            ...prevVal,
            [identifier]: value
        }))
    }
    function handleSubmit(e){
        e.preventDefault();


        setVal({
            name: '',
            password: '',
            aim: '',
        email: '',
        status: '',
        pre: ''
        })
    }


    const optionSelected = Object.values(val).some(field => field === '');
    const passwordField = val.name === 'ashu' ;
  return (
    <div>
        <form onSubmit={handleSubmit}>
  <label htmlFor="name">Choose a name:</label>
  <select id="name" value={val.name} onChange={(e) => handleChange('name',e.target.value)} name="name">
    <option value="ashu">Ashutosh Tripathy</option>
    <option value="prem">Prem Kumar</option>
    <option value="kunal" >Kunal Singh</option>
  </select>
    {passwordField && <input type='password' value={val.password} onChange={(e) => handleChange('password',e.target.value)} placeholder='Password'/>}
    <label>Aim</label>
  <input type='text' placeholder='Aim' value={val.aim} onChange={(e) => handleChange('aim',e.target.value)}/>
  <label>Email</label>
  <input type='text' placeholder='Email' value={val.email} onChange={(e) => handleChange('email',e.target.value)}/>
  <label>status</label>
  <input type='text' placeholder='Status' value={val.status} onChange={(e) => handleChange('status',e.target.value)}/>
  <label>Pre</label>
  <input type='text' placeholder='Pre' value={val.pre} onChange={(e) => handleChange('pre',e.target.value)}/>
  <input type="submit" value={`Login`} disabled={optionSelected}/>

</form>
    </div>
  )
}

export default Optval