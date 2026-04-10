const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// ✅ MongoDB Atlas (with DB name)
mongoose.connect("mongodb+srv://ishwaryasuresh2004_db_user:HFMkXVuwPoT7qeBl@cluster0.03rbkom.mongodb.net/studentDB?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log("Mongo Error:", err));

// MODEL
const schema = new mongoose.Schema({
    name: {type:String, required:true},
    age: {type:Number, required:true},
    dept: {type:String, required:true},
    email: {type:String, unique:true, required:true}
});

const Model = mongoose.model("Student", schema);

// SERVICE
class Service{

async create(data){
    if(!data.name || !data.email || !data.age)
        throw "All fields required";

    if(data.age<=0) throw "Invalid age";

    const reg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!reg.test(data.email)) throw "Invalid email";

    const exists=await Model.findOne({email:data.email});
    if(exists) throw "Email exists";

    return Model.create(data);
}

async getAll(q){
    let {page=1,limit=5,sort="name",search=""}=q;

    page=parseInt(page);
    limit=parseInt(limit);

    const filter={
        name:{$regex:search,$options:"i"}
    };

    const data=await Model.find(filter)
        .sort({[sort]:1})
        .skip((page-1)*limit)
        .limit(limit);

    const count=await Model.countDocuments(filter);

    return {data,count};
}

get(id){ return Model.findById(id); }

async update(id,data){

    const exists=await Model.findOne({
        email:data.email,
        _id:{$ne:id}
    });

    if(exists) throw "Email exists";

    return Model.findByIdAndUpdate(id,data,{new:true});
}

delete(id){ return Model.findByIdAndDelete(id); }

}

const service=new Service();

// LOGIN
app.post("/api/login",(req,res)=>{
    const {u,p}=req.body;

    if(u==="admin" && p==="1234")
        res.json({ok:true});
    else res.status(401).json({msg:"Invalid"});
});

// ✅ FIXED ROUTES (SAFE JSON ALWAYS)

// GET ALL
app.get("/api/students", async (req,res)=>{
    try{
        const result = await service.getAll(req.query);

        res.json({
            data: result.data || [],
            count: result.count || 0
        });

    }catch(e){
        console.log("ERROR:", e);
        res.status(500).json({
            data: [],
            count: 0,
            msg: "Server Error"
        });
    }
});

// GET ONE
app.get("/api/students/:id", async (req,res)=>{
    try{
        res.json(await service.get(req.params.id));
    }catch(e){
        res.status(500).json({msg:e.toString()});
    }
});

// CREATE
app.post("/api/students", async (req,res)=>{
    try{
        res.json(await service.create(req.body));
    }catch(e){
        res.status(400).json({msg:e});
    }
});

// UPDATE
app.put("/api/students/:id", async (req,res)=>{
    try{
        res.json(await service.update(req.params.id,req.body));
    }catch(e){
        res.status(400).json({msg:e});
    }
});

// DELETE
app.delete("/api/students/:id", async (req,res)=>{
    try{
        res.json(await service.delete(req.params.id));
    }catch(e){
        res.status(500).json({msg:e.toString()});
    }
});

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Running on", PORT));
