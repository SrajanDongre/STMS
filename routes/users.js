var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbSchema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all',async (req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try{
    const db = await client.db(dbName)
    let users = await db.collection('Student').find().toArray();
    res.json({
      statusCode:200,
      data:users
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode:500,
      message:'Internal server error'
    })
  }finally{
    client.close()
  }
})

router.post('/add-user',async (req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try{
    const db = await client.db(dbName)
    let users = await db.collection('Student').insertMany(req.body)
    res.json({
      statusCode:200,
      message:'User created successfully'
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode:500,
      message:'Internal server error'
    })
  }finally{
    client.close()
  }
})

router.put('/all',async (req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try{
    const db = await client.db(dbName)
    let users = await db.collection('Student').updateOne({_id:mongodb.ObjectId('res.params.id')},{
      $get : {
        Mentor:req.body.Mentor,
        Student:req.body.Student
      }
    })
    res.json({
      statusCode:200,
      message:'User updated successfully',
      data: student
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode:500,
      message:'Internal server error'
    })
  }finally{
    client.close()
  }
})

router.delete('/delete-user',async (req,res)=>{
  const client = await MongoClient.connect(dbUrl)
  try{
    const db = await client.db(dbName)
    let users = await db.collection('Student').find().toArray();
    res.json({
      statusCode:200,
      message:'User deleted successfully'
    })
  }catch(error){
    console.log(error)
    res.json({
      statusCode:500,
      message:'Internal server error'
    })
  }finally{
    client.close()
  }
})

module.exports = router;
