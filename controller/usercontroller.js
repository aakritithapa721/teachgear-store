/*const User = require("../model/usermodel");

const createUsers = async(req, res) => {
  console.log(req.body)
    try {
        const { username, email, password } = req.body;
       await User.create({ username, email, password });
        res.status(201).json({sucess:true, message:"user created!!"});
    } catch (error) {
        res.status(400).json({ error: error });
    }}

const loginusers = (req, res) => {
    res.send("user loggedin")
}

const viewUsers =(req, res) => {
    res.send("user viewed")
}

module.exports = {
    createUsers,loginusers,viewUsers
}; */


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../model/usermodel');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hash });
    res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };