/*const router = require('express').Router();
const { createUsers, updateUsers, deleteUsers, getAllUsers, loginUser } = require('../controller/testcontroller');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isAdmin');
const fileUpload = require('../middleware/multer');
//const authGuard = require('../middleware/authguard');
 
router.post("/createUsers",fileUpload("image"), createUsers);

router.post("/createUsers", createUsers);
router.post("/loginUser", loginUser);
router.put("/updateUsers/:id", updateUsers);
router.delete("/deleteUsers/:id", deleteUsers);
router.get("/getAllusers",authGuard,isAdmin, getAllUsers); //authGuard,

 
module.exports = router;*/

const router = require('express').Router();
const { createUsers, updateUsers, deleteUsers, getAllUsers, loginUser } = require('../controller/testcontroller');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isAdmin');
const fileUpload = require('../middleware/multer');

router.post("/createUsers", fileUpload("image"), createUsers); // Use .optional() to allow requests without files
router.post("/loginUser", loginUser);
router.put("/updateUsers/:id", updateUsers);
router.delete("/deleteUsers/:id", deleteUsers);
router.get("/getAllusers", authGuard, isAdmin, getAllUsers);

module.exports = router;