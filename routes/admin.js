import express from 'express'
const router = express.Router();
import { protect } from '../middlewares/auth.js';
import { authorize } from '../controllers/authorizeConroller.js';

router.get("/dashboard",protect,authorize('admin'), (req,res)=>{
    res.json({
        message: `Welcome to dashboard ${req.user.name}`
    })
})

export default router
