const User = require("../model/usermodel")
const createUsers = async (req,res) => {
    console.log(req.body)
    try {
        const { username, email, password } = req.body;
       await User.create({ username, email, password });
        res.status(201).json({sucess:true, message:"user created!!"});
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
 
const updateUsers = async (req,res) => {
    const userId = req.params.id;
    try{
        const userExist = User.findByPk(userId);
        if (userExist){
            console.log("user exist")
            const {username,password,email} = req.body;
            const updateduser = await User.update({ username: username, password, email },
            {where: { id: userId } });
            res.status(201).json({ updateduser });
        }
        else{
            res.json({message:"user donot exist"})
        }

    }catch (error){
        res.status(400).json({ error: error });
    }

};
 
const deleteUsers = async (req,res) => {
    console.log(req.params)
    console.log(req.body)
    return res.send("user deleted");
};
 
    const getAllUsers =async (req, res) => {

        try{
            const users = await User.findAll();
            res.json({ success: true, users: users });
        }catch (error){
            res.status(500).json({ error: "Error fetching users" });
        }
    };

    const findUserById = async (req,res) => {
    const userId = req.params.id;
    try{
        const userExist = User.findOne({where:{userId}});
        if (userExist){
    
            res.json(201).json("user exist");
        }
        else{
            res.json({message:"user donot exist"})
        }

    }catch (error){
        res.status(400).json({ error: error });
    }

};
 

module.exports ={
    createUsers,updateUsers,deleteUsers,getAllUsers }
 
