import {useState} from 'react'
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
            console.log('insertion réussi:' ,res.data);
            navigate('/'); //back to home if ok
        }).catch(err => console.log(err)); //if error print on console
    }
    //Utiliser async/await ou then/catch revient au même pour gérer les requêtes, mais async/await rend 
    // le code souvent plus lisible, 
    // surtout si on a plusieurs opérations à enchaîner. ce qui n'est pas le cas ici.
    //exemple handleSubmit avec async/await 
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:8081/create', { name, email });
    //         console.log('insertion réussi:', res.data);
    //         navigate('/'); // retour à l'accueil si tout va bien
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    //Certaines fonctions en JavaScript doivent être async/await et d’autres non, tout simplement selon 
    // ce qu’elles font : si la fonction doit attendre un résultat “lent” 
    // (genre une requête vers un serveur, lire un fichier, ou appeler une API), elle doit être en async/await.
// Fonction synchrone
//     Si la fonction fait juste des calculs, du filtrage, ou manipule des données déjà en mémoire, 
// tout se fait “instantanément” : pas besoin de async / await, elle renvoie le résultat directement.
// Fonction asynchrone
//     Si la fonction attend une opération longue(réseau, lecture disque, timer), elle devient async 
//     car elle doit “attendre” sans bloquer le reste du programme.
// async rend possible l’utilisation de await pour attendre le résultat de la promesse, puis continuer le 
// code une fois le résultat reçu.
// Résumé simple
//     async / await est utile quand il faut attendre un résultat qui arrive plus tard(ex : requête Axios, fetch).
// Pas besoin de async / await quand tout se passe localement et tout de suite(ex : trier un tableau, 
//     faire une addition).
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
