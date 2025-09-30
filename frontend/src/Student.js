import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Student() {

    const [student, setStudent] = useState([])

    // useEffect(() => { // This useEffect hook is used to fetch data from the server when the component is mounted.
    //     axios.get('http://localhost:8081/')
    //     .then(res => setStudent(res.data))  //Log the response
    //     .catch(err => console.log(err)); //Log any errors
    // }, [])  // Empty dependency array, so it runs once on mount
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                console.log(res.data); // Vérifie ici la structure
                // Si res.data est un objet, adapte la ligne suivante :
                // Exemple : setStudent(res.data.students) si ton tableau s'appelle 'students'
                setStudent(Array.isArray(res.data) ? res.data : res.data.students || []);
            })
            .catch(err => console.log(err));
    }, []);

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete('http://localhost:8081/student/'+id)
    //         window.location.reload()
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete('http://localhost:8081/student/' + id);
            if (res.data.affectedRows > 0) {
                setStudent(student.filter(s => s.id !== id));
            } else {
                console.log('Aucun étudiant supprimé, vérifiez l\'ID');
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <Link to="/create" className='btn btn-success'>Ajouter</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nom </th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data, i) => (
                            <tr key={i}> 
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <Link to={`update/${data.id}`} className='btn btn-primary'>Modifier</Link>
                                    <button className='btn btn-danger ms-2' onClick={ e => handleDelete(data.id)}>Supprimer</button>
                                </td>
                            </tr>
                        //   (student ?? []).map((data, i) => (
                        //       <tr key={i}>
                        //           <td>{data.name}</td>
                        //           <td>{data.email}</td>
                        //           <td>
                        //               <Link to={`update/${data.id}`} className='btn btn-primary'>Modifier</Link>
                        //               <button className='btn btn-danger ms-2' onClick={() => handleDelete(data.id)}>Supprimer</button>
                        //           </td>
                        //       </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student
