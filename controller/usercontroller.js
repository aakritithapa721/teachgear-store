const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../model/usermodel');

const createUsers = async (req, res) => {
  console.log('Received request body:', req.body);
  console.log('File path (if any):', req.files?.length ? req.files[0].path : null);
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !password || !email) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const username = `${firstName} ${lastName}`; // Combine firstName and lastName into username
    const UserExist = await User.findOne({ where: { username } });
    if (UserExist) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    const EmailExist = await User.findOne({ where: { email } });
    if (EmailExist) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, password: hashedPassword });
    console.log('User created:', newUser.toJSON());
    return res.status(201).json({ success: true, message: "User created", user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔍 LOGIN ATTEMPT FOR:', email);
    console.log('🔑 PASSWORD PROVIDED:', password);

    const user = await User.findOne({ where: { email } });
    console.log('👤 USER FOUND:', !!user);

    if (!user) {
      console.log('❌ No user found with email:', email);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log('📊 USER INFO:', {
      id: user.id,
      username: user.username,
      email: user.email,
      passwordHash: user.password,
      passwordLength: user.password ? user.password.length : 0,
      createdAt: user.createdAt
    });

    console.log('🔒 COMPARING PASSWORDS...');
    console.log('Input password:', password);
    console.log('Stored hash:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ PASSWORD MATCH RESULT:', isMatch);

    if (!isMatch) {
      console.log('❌ Password comparison failed');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'user' },
      process.env.JWT_TOKEN,
      { expiresIn: '24h' }
    );

    console.log('🎉 LOGIN SUCCESSFUL');
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('💥 LOGIN ERROR:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updateUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const UserExist = await User.findByPk(userId);
    if (UserExist) {
      console.log("User exists");
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const updatedUser = await User.update(
        { username, password: hashedPassword, email },
        { where: { id: userId }, returning: true }
      );
      res.status(200).json({ success: true, message: "User updated", user: updatedUser[1][0] });
    } else {
      res.status(404).json({ success: false, message: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const UserExist = await User.findOne({ where: { id: userId } });
    if (UserExist) {
      res.json({ success: true, user: UserExist });
    } else {
      res.status(404).json({ success: false, message: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const deleteUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const UserExist = await User.findByPk(userId);
    if (UserExist) {
      await User.destroy({ where: { id: userId } });
      res.status(200).json({ success: true, message: "User deleted" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

module.exports = { createUsers, updateUsers, deleteUsers, getAllUsers, getUsers, loginUser };