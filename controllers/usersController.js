import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js';


export const getUsers = async (req,res)=>{
    const users = await User.find();
    res.json(users);
}

export const createUser = async (req,res)=> {
    const user = new User(req.body);
    const saved = await user.save();

    res.status(201).json(saved)
}

export const updateUser = async(req,res)=>{
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new:true }
        );

        if(!updatedUser){
            return res.status(404).send("User not found")
        }
        res.json(updatedUser)
    } catch (err) {
        res.status(500).send("Server error")
    }
}

export const deleteUser = async(req,res)=>{
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).send("User not found")
        }
        res.send(`User with id: ${id} is deleted.`)
    } catch (err) {
        res.status(500).send("Server error")
    }
}


export const getUserInfo = async(req,res) => {

    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).send("User not found.")
    
    res.json(user)
}

// real crud operation
// export const register = async(req, res, next)=>{
//     const {name, email, password} = req.body;

//     try {
//         // email = email.toLowerCase();
//         const exists = await User.findOne({email})
//         if(exists) return res.status(400).json({ message: "This email is already exists." })

//         const user = await User.create({name,email,password})

//         const token = generateToken(user._id)
//         res.status(201).json({ token })
//     } catch (err) {
//         next(err);
//     }

// }

