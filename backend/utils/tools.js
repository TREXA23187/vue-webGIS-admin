const fs = require('fs')
const path = require('path')
const {pool} = require('../utils/db')
const jwt = require('jsonwebtoken')

exports.findUser = async (username,password)=> {
    const find = `select * from user_info where username='${username}' and password='${password}'`
    const query = async () => {
        const connect = await pool.connect()
        try {
            let res = await connect.query(find, [])
            console.log(res.rows)
        } finally {
            connect.release()
        }
    }
}

exports.sign = (username)=>{
    const privateKey = fs.readFileSync(path.join(__dirname,'../keys/rsa_private_key.pem'))
    const token = jwt.sign({username},privateKey,{algorithm:'RS256'})
    return token
}

exports.verify = (token)=>{
    const publicKey = fs.readFileSync(path.join(__dirname,'../keys/rsa_public_key.pem'))
    const result = jwt.verify(token,publicKey)
    return result
}
