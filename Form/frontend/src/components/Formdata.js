import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Formdata = () => {
    const [data, setData] = useState([])


    const navigate = useNavigate();


    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8001/api/data");
            setData(response.data)
        } catch (error) {
            console.log("Error in frtching the data from the backend",error)
        }
    }


    useEffect(() => {
      fetchData();
    }, [])


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8001/api/data/${id}`);
            fetchData();
        } catch (error) {
            console.log(`Error with deleting the data with ID : ${id}`)
        }
    }


    const handleUpdate = async (id) => {
        try {
            // await axios.put(`http://localhost:8001/api/update/${id}`);
            navigate('/updateform')
            console.log('Updated successfully')
        } catch (error) {
            console.error('Error in updating the data')
        }
    }
    



  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Gender</th>
                    <th>Password</th>
                    <th colSpan={2}>Operations</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((item,index) => {
                    return<tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.email}</td>
                        <td>{item.mob}</td>
                        <td>{item.gender}</td>
                        <td>{item.pass}</td>
                        <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
                        <td><button onClick={() => handleUpdate(item.id)}>Update</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Formdata