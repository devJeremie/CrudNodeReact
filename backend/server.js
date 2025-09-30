const express = require("express");
const cors = require('cors');
const mysql = require("mysql")

const app = express();

const corsOptions = {
    origin: [
        'http://localhost:3000',//adresse seveur front et celle qui est a noté sur votre navigateur Google Chrome
        'http://localhost:8081',//adresse serveur backend
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Content-Type,Authorization',
    credentials: true, // allow cookies to be sent with requests
};

app.use(express.json());
//test du server cors a cause de l'erreur
// app.use((req, res, next) => {
//     console.log('Request Headers:', req.headers);
//     console.log('Response Headers:', res.getHeaders());
 
//     next();
//  });

// Activation de CORS (Cross-Origin Resource Sharing) pour permettre les requêtes entre domaines
app.use(cors(corsOptions));

// Création d'une connexion à la base de données MySQL
const database = mysql.createConnection({
  host: 'localhost', // Adresse IP ou nom de domaine du serveur MySQL
  user: 'root', // Nom d'utilisateur pour se connecter à la base de données
  password: '', // Mot de passe pour se connecter à la base de données
  database: 'crudnode' // Nom de la base de données à utiliser
})

// Route pour récupérer tous les étudiants
app.get("/", (req, res) => {
  // Requête SQL pour récupérer tous les étudiants
  const sql = "SELECT  * FROM student";
  // Exécution de la requête SQL
  database.query(sql, (err, data) => {
    // Si une erreur se produit, renvoie un message d'erreur
    if(err) return res.json("Error");
    // Sinon, renvoie les données récupérées
    return res.json(data);
  });
});

// Route pour créer un nouvel étudiant
app.post('/create', (req, res) => {
  // Requête SQL pour insérer un nouvel étudiant
  //
  const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)";
  // Valeurs à insérer
  const values = [ 
    req.body.name, // Nom de l'étudiant
    req.body.email // Email de l'étudiant
  ];
  // Exécution de la requête SQL
  database.query(sql, values, (err, data) => {
    // Si une erreur se produit, renvoie un message d'erreur
    if (err) {
      console.log('SQL Error:', err);
      return res.status(500).json({ error: 'Error in inserting student' });
    }
    // if(err) return res.json("Error");
    // Sinon, renvoie les données insérées
    return res.json(data);
  })
})
// app.post('/create', (req, res) => {
//   const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)";
//   const values = [req.body.name, req.body.email];
//   database.query(sql, values, (err, data) => {
//     if (err) {
//       console.error('Erreur SQL:', err);
//       // Renvoi d'un code HTTP 500 et message d'erreur JSON
//       return res.status(500).json({ message: 'Erreur lors de l\'insertion en base', error: err });
//     }
//     return res.json(data);
//   });
// });

// Route pour modifier un étudiant existant
app.put('/update/:id', (req, res) => {
  // Requête SQL pour modifier un étudiant
  const sql = "update student set `name` =?, `email` =? where id =?";
  // Valeurs à modifier
  const values = [ 
    req.body.name, // Nouveau nom de l'étudiant
    req.body.email // Nouvel email de l'étudiant
  ]
  // ID de l'étudiant à modifier
  const id = req.params.id;

  // Exécution de la requête SQL
  database.query(sql, [...values, id], (err, data) => {
    // Si une erreur se produit, renvoie un message d'erreur
    if(err) return res.json("Error");
    // Sinon, renvoie les données modifiées
    return res.json(data);
  })
})

// Route pour supprimer un étudiant
app.delete('/student/:id', (req, res) => {
  // Requête SQL pour supprimer un étudiant
  const sql = "DELETE FROM student WHERE id =?";
  // ID de l'étudiant à supprimer
  const id = req.params.id; 
  
  // Exécution de la requête SQL
  database.query(sql, [id], (err, data) => {
    // Si une erreur se produit, renvoie un message d'erreur
    if(err) return res.json("Error");
    // Sinon, renvoie les données supprimées
    return res.json(data);
  })
})

// Démarrage du serveur sur le port 8081
app.listen(8081, () => {
  console.log('Server is running on port 8081');
})