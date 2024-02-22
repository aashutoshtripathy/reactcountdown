import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8081/')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    }, [])
    
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
                        <th>Name</th>
                        <th>Email</th>
                        <th colSpan={2}>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student,index) => {
                        return<tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                            <td>
                                <button>Edit</button>
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