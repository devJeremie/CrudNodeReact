import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios  from "axios";

function CreateStudent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) { //handle submit function for the form
        event.preventDefault(); 
        axios.post('http://localhost:8081/create', {name, email}) //methode post on create page form
        .then(res => {
            console.log(res);
            navigate('/'); //back to home if ok
        }).catch(err => console.log(err)); //if error print on console
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Ajouter Etudiant</h2>
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
                <button className='btn btn-success'>Soumettre</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent
