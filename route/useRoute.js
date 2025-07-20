const route = require('express').Router();

const usercontroller = require('../controller/user controller')


route.post('/register',usercontroller.createUsers)
route.get('/login',usercontroller.loginusers)
route.get('/view',usercontroller.viewUsers)
module.exports = route;


route.post('/createUsers',createUsers);
route.put('/updateUsers/:id',updateUsers);
route.delete('/deleteUsers/:id',deleteUsers);

module.exports = route;
