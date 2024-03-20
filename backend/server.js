const express = require("express"); //création de const express qui permet d'acceder à express
const cors = require('cors');//permet aux différents serveurs d'échanger des données entre eux.
const mysql = require("mysql")


const app = express(); //permet  d'utiliser les méthodes de l'objet express dans la variable "app"

// const corsOptions = {
//     origin: 'http://localhost:8081',
//     optionsSuccessStatus : 200
// }

app.use(express.json()); 

app.use(cors());
// app.use(cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));


const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudnode'
})

app.get("/", (req, res) => {  //crée un endpoint a ladresse "/" et ensuite il attend une requete et une reponse
    //res.json("Salut a toi de puis le backend"); //en reponse on renvoie le message
    const sql = "SELECT  * FROM student"; //crée la  requête SQL pour récupérer toutes les informations du tableau "student"
    database.query(sql, (err, data) => { //fonction de rappel qui prend deux arguments err pour les error et data qui sont les données a retrourner
       if(err) return res.json("Error"); // la condition  est vraie, on execute ce qu'il y a après le "if", sinon Salut a toi depuis le backend
       return res.json(data); 
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";
    const values = [ 
        req.body.name, 
        req.body.email
    ]
    database.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
    
})

app.put('/update/:id',cors(corsOptions), (req, res) => {
    const sql = "update student set `name` = ?, `email` = ? where id = ?";
    const values = [ 
        req.body.name, 
        req.body.email
    ]
    const id = req.params.id;
    database.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
    
})

app.listen(8081, () => { //attribue le port  8081 au serveur et exécute une fonction anonyme listen
    console.log('Server is running on port 8081');
})