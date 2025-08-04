const User = require("../model/usermodel")
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createUsers = async (req,res) => {
    console.log(req.body)
    console.log(req.files?.length? req.files[0].path : null)
    try {
        const { username, email, password } = req.body;
        if(!username || !password || !email){
            return res.json({success:false, message:"please fill all fields"}); // Fixed typo: sucess -> success
        }
        //const image = req.files?.length? req.files[0].path : null;

        const UserExist = await User.findOne({ where:{username:username} });
        if (UserExist){
        return res.status(201).json({success:false, message:"user already exists "}); // Fixed typo: sucess -> success
        }

        const EmailExist = await User.findOne({ where:{email:email} });
        if (EmailExist){
        return res.status(201).json({success:false, message:"email already exists "}); // Fixed typo: sucess -> success
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, password: hashedPassword, email })
        return res.status(200).json({ success: true, message: "user created",newUser});

    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const updateUsers = async (req,res) => {
    const userId = req.params.id;
    try{
        const UserExist = await User.findByPk(userId);
        if(UserExist){
            console.log("user exist")
            

            const{username,email,password} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const updateduser = await User.update({username:username, password:hashedPassword, email},
                {where: {id:userId}, returning:true});
            res.status(201).json({success:true,message:"user updated"}, updateduser); // Fixed typo: sucess -> success
        }
        else{
            res.json({message:"user doesnt exist"})
        }
    }
    catch(error){
        res.status(400).json({error:error});
    }
};

const getUsers = async (req,res) => {
    const userId = req.params.id;
    try{
        const UserExist = await User.findOne({where:{id: userId}});
        if(UserExist){
            res.json("user exist")
        }
        else{
            res.json({message:"user doesnt exist"})
        }
    }
    catch(error){
        res.status(400).json({error:error});
    }
};

const deleteUsers = async (req,res) => {
    console.log(req.params.id)
    const userId = req.params.id;
    try{
        const UserExist = await User.findByPk(userId);
        if(UserExist){
            const deleteUsers = await User.destroy(
                {where: {id:userId}});
            res.status(201).json({success:true,message:"user deleted"}, deleteUsers); // Fixed typo: sucess -> success, fixed variable name
        }
        else{
            res.json({success: false, message:"user not found"}) // Fixed typo: sucess -> success
        }
    }
    catch(error){
        res.status(400).json({error:error});
    };
};

const getAllUsers = async (req, res) =>{
    console.log(req.headers.authorization)
    try {
        const users = await User.findAll({attributes:{exclude:["email","password"]}});
        res.json({success:true, users: users}); // Fixed typo: sucess -> success
    } catch (error) {
        res.status(500).json ({error: "error fetching users"});
    }
};

// DEBUG VERSION - Replace with original after debugging
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log('🔍 LOGIN ATTEMPT FOR:', email);
        console.log('🔑 PASSWORD PROVIDED:', password);
        
        const user = await User.findOne({where: { email: email }});
        console.log('👤 USER FOUND:', !!user);
        
        if (!user) {
            console.log('❌ No user found with email:', email);
            return res.status(404).json({success: false, message: "User not found"}); // Fixed typo: sucess -> success
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
            { id: user.id, email: user.email, role: user.role },
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

module.exports ={
    createUsers,updateUsers,deleteUsers,getAllUsers,getUsers,loginUser
}