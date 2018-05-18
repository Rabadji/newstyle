const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");
var purchase="page1";



app.get('/terms',function(req,res){
  res.sendFile(path.join(__dirname+'/newstyle/Terms.html'));
});
app.get('/privacy',function(req,res){
  res.sendFile(path.join(__dirname+'/newstyle/Privacy.html'));
});
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/newstyle/About.html'));
});




//#################change purchase
app.post('/newstyle_page',function(req,res){
    purchase=req.body.page;
    res.send(purchase);
})

app.use(express.static("newstyle"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/newstyle/" + "style.css");
});
app.get('/newstyle_page1',function(req,res){
  res.sendFile(path.join(__dirname+'/newstyle/page1.html'));
});
app.get('/newstyle_page2',function(req,res){
  res.sendFile(path.join(__dirname+'/newstyle/page2.html'));
});

app.get('/purchase_newstyle',function(req,res){
  res.sendFile(path.join(__dirname+'/newstyle/'+purchase+'.html'));
});


//####################################inapp####################################
app.get('/purchase_newstyle',function(req,res){
    db.collection('newstyle_inapp').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})
app.put('/newstyle_inapp/:inappid',function(req,res){
    const id=req.params.inappid;
    db.collection("newstyle_inapp").update({_id:ObjectID(id)}, {inapp:req.body.inapp});
    res.send(req.body.inapp);
});
app.post('/newstyle_inapp',function(req,res){
        var txt={ inapp:req.body.inapp,     
        };
    db.collection('newstyle_inapp').insert(txt,function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    res.send(txt);
    })
})






MongoClient.connect("mongodb://localhost:27017/newstyle",function(err,database){
    if(err){
        return console.log(err);
    }
    db=database;
    app.listen(3010);
    
})