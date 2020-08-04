const { users } = require("../model");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const register = async (req, res) =>{
    try{
        const params = req.body;
        console.log(params);
        const duplicated = await users.findOne({where: {username: params.username}});
        if (duplicated) {
            return res.status(400).send({
                message: 'username sudah di pakai',
            })
        }
        params.password = await bcrypt.hashSync(req.body.password,10);
        const data = await users.create(params);
        return res.status(200).send({
            message:'OK',
            data,
        })
    } catch (err) {
        return res.status(400).send({
            message:err.message,
        })
    }
}
const login = async (req,res) =>{
    try {
        const params = req.body;
        const query = {
            where: {
                username: params.username
            },
            raw:true
        };
        const user = await users.findOne(query);
        if(!user){
            return res.status(400).send({
                message:'username tidak ketemu',
            })
        }
        const compare_password = bcrypt.compareSync(params.password, user.password);
        if (!compare_password){
            return res.status(400).send({
                message: 'password tidak sama',
        })
    }
    const sign_token = {
        issuer: 'contoh.com',
        subject: 'contoh.com',
        algorithm: 'HS256', 
        expiresIn: '1d', 
        audience: 'http://contoh.com',
        }
        const token = jwt.sign(user, process.env.JWT_SECRET,
            sign_token);
            return res.status(200).send({
                message:'ok',
                data:{
                    user,
                    token,
                },
            })
} catch (err) {
    return res.status(400).send({
        message:err.message,
    })
}
}
module.exports ={
    register,
    login,
    
}

