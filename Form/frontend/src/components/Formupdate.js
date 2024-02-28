import React from 'react';
import '../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Formupdate = () => {
    

    
    const [data,setData] = useState({
        fname: '',
        lname: '',
        email: '',
        mob: '',
        gender: '',
        pass: '',
        cpass: ''
    });


    const {id} = useParams();
    

    const fetchData = async(id) => {
        try {
            const response = await axios.get(`http://localhost:8001/api/update/${id}`);
            setData(response.data)
        } catch (error) {
            console.error("Unable to connect",error);
        }
    }



    useEffect(() => {
        fetchData();
       }, [id])
    

    


    const handleSubmit = async (e) => {
        e.preventDefault();


        


       
        try {
            const response = await axios.put(`http://localhost:8001/api/update/${id}`)
            console.log('Successfully updated',response.data)
        } catch (error) {
           console.error('Failed to update the data',error) 
        }
        
        


    //     axios.post("http://localhost:8001/signup" ,inpVal)
    // .then(response => {
    //     console.log(response.data)
    // })
    // .catch(error => {
    //     console.log('Error in submitting the form',error)
    // })

        


        
    }

    

  return (
    <div>
        <div>
            <h1>Update Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <label>First Name:
            <input type='text' value={data.fname}  placeholder='First Name'/>
        </label>
        <label>Last Name:
            <input type='text' value={data.lname}  placeholder='Last Name'/>
        </label>
        <label>Email:
            <input type='email' value={data.email}  placeholder='Email'/>
        </label>
        <label>Mobile No.:
            <input type='number' value={data.mob}  placeholder='Mobile'/>
            
        </label>
        <div>
        <label>Gender:</label><br/>
        <label htmlFor="Male">Male
        <input type="radio" id="Male" name="gender" checked={data.gender === 'male'} value="male" />
        </label>
        <label htmlFor="Female">Female
        <input type="radio" id="Female" name="gender" checked={data.gender === 'female'} value="female" />
        </label>
        <label htmlFor="Other">Other
        <input type="radio" id="Other" name="gender" checked={data.gender === 'other'} value="other" />
        </label>
        </div>
        <label>Password:
            <input type='Password' value={data.pass}  placeholder='Password'/> 
        </label>
        <label>Re-Password:
            <input type='text' value={data.cpass}  placeholder='Password'/>
            
        </label>
        <input style={{width:'10%',backgroundColor:'blue',color:'white'}} value={`Update`} type='submit'/>
        </form>
    </div>
  )
}

export default Formupdate