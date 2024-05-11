const express=require('express');
const webpush=require('web-push');
const bodyparser=require('body-parser');
const path=require('path');

const app=express();
app.use(express.static(path.join(__dirname,"Client")));
const publicVapidKey="BMw3CfVCdibltTIlB4NP4HfQoVtXtN5zF3X3soMP3F_m35FMBLUk3EtNIEMYSaNzLqe8GrV9KUhdOK44l2XUJDY";
const privateVapidKey="jgTIGBr5H7cQXbYT8uVDoxl4UdlB3kSQdsyDwIARA2E";

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);
app.use(bodyparser.json())
app.post('/subscribe',(req,res)=>{
    //Get Push Subscription Object
    const subscription=req.body;
    console.log('Post Request is Submitted')
    // Send 201-resource Created

    res.status(201)
       .json({

       });  

    const payload=JSON.stringify({title:'Push Test'});
    
    // pass object into sendNotification

    webpush.sendNotification(subscription,payload)
           .catch(err=>console.error(err));
 
})
app.get('/subscribe',(req,res)=>{
    //Get Push Subscription Object
    const subscription=req.body;
 
    // Send 201-resource Created

    res.status(201)
       .json({

       });  

    const payload=JSON.stringify({title:'Push Test'});
    
    // pass object into sendNotification

    webpush.sendNotification(subscription,payload)
           .catch(err=>console.error(err));
 
})

const port=5000;

app.listen(port,(req,res)=>{
 console.log(`server started listening Request Successfully`);
});