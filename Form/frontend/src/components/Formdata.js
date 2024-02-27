import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Formdata = () => {
    const [data, setData] = useState([])


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
                    <th colSpan={3}>Operations</th>
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
                        <td><button>Edit</button></td>
                        <td><button>Delete</button></td>
                        <td><button>Update</button></td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Formdata