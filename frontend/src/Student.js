import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Student() {

    const [student, setStudent] = useState([])

    useEffect(() => { // This useEffect hook is used to fetch data from the server when the component is mounted.
        axios.get('http://localhost:8081/')
        .then(res => setStudent(res.data))  //Log the response
        .catch(err => console.log(err)); //Log any errors
    }, [])  // Empty dependency array, so it runs once on mount

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <button className='btn btn-success'>Ajouter</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom </th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, i) => (
                            <tr key={i}> 
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student
