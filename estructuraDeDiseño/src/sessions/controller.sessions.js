const { Router } = require("express");
const Users = require('../dao/models/users.model');

const router = Router();




router.get('/current', (req, res) => {
  
  if (req.user) {
 
    const userId = req.user.id;


    Users.findById(userId)
      .then(user => {
        if (user) {
      
          res.json({ user });
        } else {
          res.status(404).json({ message: 'Usuario no encontrado' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  } else {
    res.status(401).json({ message: 'No se ha iniciado sesión' });
  }
});


module.exports = router;
