import React, { useEffect } from 'react'
import axios from 'axios'

function Student() {

    useEffect(() => { // This useEffect hook is used to fetch data from the server when the component is mounted.
        axios.get('http://localhost:8081/')
        .then(res => console.log(res))  //Log the response
        .catch(err => console.log(err)); //Log any errors
    }, [])  // Empty dependency array, so it runs once on mount

  return (
    <div className='d-flex vh-10 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded'>
            <button className='btn btn-success'>Ajouter</button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom </th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student
