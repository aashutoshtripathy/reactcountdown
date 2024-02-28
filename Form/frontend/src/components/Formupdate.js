import React from 'react';
import '../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Formupdate = () => {
    
    const {id} = useParams();

    const navigate = useNavigate();

    
    const [data,setData] = useState({
        fname: '',
        lname: '',
        email: '',
        mob: '',
        gender: '',
        pass: '',
        cpass: ''
    });


    

    const fetchData = async(id) => {
        try {
            const response = await axios.get(`http://localhost:8001/api/fetch/${id}`);
            setData(response.data);
            const responseData = response.data[0]
            setData({
                fname: responseData.fname,
                lname: responseData.lname,
                email: responseData.email,
                mob: responseData.mob,
                gender: responseData.gender,
                pass: responseData.pass,
              });
        } catch (error) {
            console.error("Unable to connect",error);
        }
    }



    useEffect(() => {
        fetchData(id);
       }, [id])
    

       const handleChange = (identfier,value) => {
        setData(prevData => ({
            ...prevData,
            [identfier]:value
        }))
       }

    


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            await axios.put(`http://localhost:8001/api/update/${id}`,data);
            navigate('/formdata')
            console.log('Successfully Updated.');
        } catch (error) {
            console.error('Error encountered in updating',error)
        }
        


       
        // try {
        //     const response = await axios.put(`http://localhost:8001/api/update/${id}`,data)
        //     console.log('Successfully updated',response.data)
        // } catch (error) {
        //    console.error('Failed to update the data',error)
        // }
        
        


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
            <input type='text' value={data.fname} onChange={(e) => handleChange('fname',e.target.value)}  placeholder='First Name'/>
        </label>
        <label>Last Name:
            <input type='text' value={data.lname} onChange={(e) => handleChange('lname',e.target.value)} placeholder='Last Name'/>
        </label>
        <label>Email:
            <input type='email' value={data.email} onChange={(e) => handleChange('email',e.target.value)} placeholder='Email'/>
        </label>
        <label>Mobile No.:
            <input type='number' value={data.mob} onChange={(e) => handleChange('mob',e.target.value)} placeholder='Mobile'/>
            
        </label>
        <div>
        <label>Gender:</label><br/>
        <label htmlFor="Male">Male
        <input type="radio" id="Male" name="gender" checked={data.gender === 'male'} onChange={(e) => handleChange('gender','male')} value="male" />
        </label>
        <label htmlFor="Female">Female
        <input type="radio" id="Female" name="gender" checked={data.gender === 'female'} onChange={(e) => handleChange('gender','female')} value="female" />
        </label>
        <label htmlFor="Other">Other
        <input type="radio" id="Other" name="gender" checked={data.gender === 'other'} onChange={(e) => handleChange('gender','other')} value="other" />
        </label>
        </div>
        <label>Password:
            <input type='Password' value={data.pass} onChange={(e) => handleChange('pass',e.target.value)} placeholder='Password'/> 
        </label>
        <label>Re-Password:
            <input type='text' value={data.pass} onChange={(e) => handleChange('pass',e.target.value)} placeholder='Password'/>
            
        </label>
        <input style={{width:'10%',backgroundColor:'blue',color:'white'}} value={`Update`} type='submit'/>
        </form>
    </div>
  )
}

export default Formupdate