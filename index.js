const express=require('express');
const app=express();
const port=8080;
const path=require('path');
const mongoose=require('mongoose');
const Chat=require("./models/chat");
const methodOverride=require("method-override");
const ExpressError=require("./ExpressError");

app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main().then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

}

//Index route
app.get('/chats', asyncWrap(async(req,res,next)=>{
    let chats=await Chat.find();
    res.render('index.ejs',{chats});  
   
}))

//NEW ROUTE
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//Create route
app.post("/chats",asyncWrap(async(req,res,next)=>{

        let {from,to,msg}=req.body;
        let newChat=new Chat({
            from:from,
            to:to,
            msg:msg,
            created_at:new Date()
        });
        await newChat.save();
        console.log("chat saved");
        res.redirect("/chats");
    
    
}))

//EDIT ROUTE
app.get("/chats/:id/edit",asyncWrap(async(req,res,next)=>{

        let{id}=req.params;
        let chat=await Chat.findById(id);
        if(!chat){
            return next(new ExpressError(404,"Chat Not Found"));
        }
        res.render("edit.ejs",{chat});
    
    
}))
//update
app.put("/chats/:id",asyncWrap(async(req,res,next)=>{
    
        let {id}=req.params;
        let {newMsg}=req.body;
        let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
        console.log(updatedChat);
        res.redirect('/chats');
    
    
}))

//delete route
app.delete("/chats/:id",asyncWrap( async(req,res,next)=>{
    
        let{id}=req.params;
        let deletedChat=await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    
    
}))

app.use((err,req,res,next)=>{
    let{status=500,message}=err;
    res.status(status).send(message);
})
app.listen(port,()=>{
    console.log(`app listening to port: ${port}`);
})
























// let chat1=new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"Send me your answer key",
//     created_at:new Date()
// });

// Chat.findByIdAndDelete("6a06149f4b68fd03c6cd8b68").then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })