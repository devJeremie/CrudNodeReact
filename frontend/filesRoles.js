/*Pour commencer, vous devez d'abord créer un modèle de données 
pour représenter les utilisateurs et leurs rôles. 
*/
//exemple : (vous pouvez créer un nouveau fichier 'userModel.js' par exemple)
//adapté pour une base de donnée en mysql 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crudnode'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

const userModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  getUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE username =?', username, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  //...
};

module.exports = userModel;
  /*Une fois que vous avez mis en place l'authentification, 
  vous pouvez créer des routes spécifiques pour les utilisateurs admin. 
  Par exemple, vous pouvez créer une route pour afficher le tableau de bord admin*/
  //exemple: (server.js) //evidemment certain nom de const sont arbitraire a vous d'adapter selon le projet 
const express = require('express');
const app = express();
const mysql = require('mysql');

const userModel = require('./user.model');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crudnode'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

app.get('/admin/dashboard', (req, res) => {
  userModel.getAllUsers().then((users) => {
    if (req.user.role === 'admin') {
      res.render('admin/dashboard', { users: users });
    } else {
      res.redirect('/');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000')
  })
  /*Ici si le user connecté à un rôle admin il est redirigé vers la page du dashboard
  sinon c'est vers la page d'accueil, pensez a créer la vue du dashboard evidemment
  pensez a adapter a votre code voilà les devs*/