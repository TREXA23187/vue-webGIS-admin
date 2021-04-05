const {pool} = require('../utils/db')


const signup = (req, res, next) => {

    const {username,password} = req.body
    const insert = `insert into user_info values(uuid_generate_v4(),'${username}',${password})`

    pool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            res.render('fail',{
                data:JSON.stringify({
                    message:'sign up failed'
                })
            })
            return;
        }
        client.query(insert, [], function (isErr, rst) {
            done()
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ');
                // console.log(rst.rows[0].row_to_json)
                // console.log(rst)
                // res.send('signup secc')
                res.render('succ',{
                    data:JSON.stringify({
                        username,
                        password
                    })
                })
            }
        })
    })
}

const getInfo = (req,res,next)=>{
    const search = `SELECT * FROM public.user_info`

    pool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            return;
        }
        client.query(search, [], function (isErr, rst) {
            done()
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ');
                // console.log(rst.rows[0].row_to_json)
                // console.log(rst)
                res.send(rst.rows)
            }
        })
    })
}

const deleteUser = (req,res,next)=>{
    const {id} = req.body
    const del = `DELETE FROM public.user_info WHERE "id" = '${id}'`
    pool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            return;
        }
        client.query(del, [], function (isErr, rst) {
            done()
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ');
                // console.log(rst.rows[0].row_to_json)
                // console.log(rst)
                res.send(`${id} deleted`)
            }
        })
    })
}
module.exports = {signup,getInfo,deleteUser}
