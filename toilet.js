const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect("mongodb+srv://karthikselvaraj:Lenovosw8@cluster0-ogkwu.mongodb.net", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('..............Playboy Connected to MongoDB.................'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const toiletSchema = new mongoose.Schema({
    status: String,
    date: String
});
const Toilet = mongoose.model('Toilet', toiletSchema);

// async function newEntry(sts, dte) {
//     const entry = new Toilet({
//         status: sts,
//         date: dte,
//     });

//     const result = await entry.save();
//     console.log(result);
// }
// newEntry(true, Date());
 
async function getToiletStatus(res,Toiletno,printall) {
    const result = await Toilet.find();
    if(!printall){
        if(Toiletno !=3)
        res.send(result[Toiletno].status);
        else
        res.send("Toilet doesnt exits")
    }
    else
    {   var printres =[];
        for(var a=0;a<3;a++){
            printres.push(result[a].status)
        }
        res.send(printres);
    }
}
async function updateToiletStatus(id,sts,res){
    const toilet = await Toilet.findById(id);
    if(!toilet) {res.send("no toilet exists"); return};
    toilet.status = sts;
    toilet.date = Date();
    const result = await toilet.save();
    console.log(result);
    res.send(result)
  }
  
app.get('/:id',(req,res)=>{
   getToiletStatus(res,req.params.id,false);
}) 

app.get('/',(req,res)=>{
    getToiletStatus(res,3,true);
 }) 

 app.post('/:no/:sts',(req,res)=>{
     var number = false;
     if(req.params.no === '0') number ='5de7dae71c9d440000f6747f';
     else if(req.params.no === '1') number ='5de7dafc1c9d440000f67480';
     else if(req.params.no === '2') number ='5de7db1fe3acc348801fcf6a';
     else res.send("no toilet "+ req.params.no)
   updateToiletStatus(number,req.params.sts,res);
  })

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to the port ${port}`));