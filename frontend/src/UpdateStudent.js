import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios  from "axios";

function UpdateStudent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event) { //handle submit function for the form
        event.preventDefault(); 
        axios.put('http://localhost:8081/update/'+id, { name, email}) //methode post on create page form
        .then(res => {
            console.log(res);
            navigate('/'); //back to home if ok
        }).catch(err => console.log(err)); //if error print on conole
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Modifier Etudiant</h2>
                <div className='mb-2'>
                    <label htmlFor="">Nom </label>
                    <input type="text" placeholder='Entrez votre nom' className='form-control' 
                    onChange = {e => setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email </label>
                    <input type="email" placeholder='Entrez votre email' className='form-control' 
                    onChange = {e => setEmail(e.target.value)}
                    />
                </div>
                <button className='btn btn-success'>Modifier</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent