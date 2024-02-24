import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([])
    // useEffect(() => {
    //  const response = await axios.get('http://localhost:8000/api/data')
    //   .then(res => setData(res.data))
    //   .catch(err => console.log(err))
    // }, [])




const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/data');
            setData(response.data);
        } catch (error) {
            console.log("Error fetching the data from backend : ",error);
        }
    }
    // fetchData();

    useEffect(() => {
      fetchData()
        

    }, [])




    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:8000/api/data/${id}`);
            fetchData();
        } catch (error) {
            console.log(`Error deleting with ID ${id}`,error)
        }
    }
    

    


    
  return (
    <div>
        <div>
            <div>
                <Link to={`/create`}>Create +</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th colSpan={2}>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item,index) => {
                        return<tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                            <td>
                                <button><Link to={`/Update/${item.id}`}>Update</Link></button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home