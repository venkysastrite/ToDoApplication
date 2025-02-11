const express = require("express");
const mongoose = require("mongoose");
const UserListModel = require("./UserListModel");
const UserToDoListModel = require("./UserTodoListModel");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const port = 3001;
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todosw") //todosw is the database name and it will automatically take the collection name from the model name what we give duting creation
.then(()=>{console.log(`Database connected to port ${port}`);})
.catch((err)=>{console.log(err);});

app.post("/api/adduser",(req,res)=>{
    const {userID,password} = req.body;
    const newUser = new UserListModel({userID:String(userID),password : String(password)});
    newUser.save()
    .then(()=>{res.status(200).json({userID,password})})
    .catch((err)=>{console.log(err);
        res.status(404).json();});
});

app.get("/api/check/:id",(req,res)=>{
    console.log("Hello");
    const userID = req.params.id;
    UserListModel.findOne({userID : String(userID)})
    .then((user)=>{
        console.log(user);
        if(!user)
        {
            return res.status(404).json({message:"User doesn't exist"});
        }
        res.status(200).json({message:"User found"});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:"Internal Server Error"});
    });
});

app.delete("/api/delete/:id",(req,res)=>{
    const userID = req.params.id;
    UserListModel.findOneAndDelete({userID:String(userID)})
    .then((user)=>{
        if(!user)
        {
            console.log("User NOT FOUND");
            return res.status(404).json();
        }
        UserToDoListModel.findOneAndDelete({userID : String(userID)})
        .then((user)=>{
            if(!user)
            {
                console.log("User Also deleted from ToList database");
            }
            console.log("User Deleted in TODO Database");
        })
        .catch((err)=>{
            console.log(err);
        });
        res.status(200).json();
    })
    .catch((err)=>{
        res.status(500).json();
    });
});

// Add todo
app.post("/api/addtolist", async (req, res) => {
    const { userID, item } = req.body;

    if (!userID || !item) {
        return res.status(400).json({ error: "userID and item are required" });
    }

    try {
        const updatedUser = await UserToDoListModel.findOneAndUpdate(
            { userID: userID },
            {
                $set: { userID: userID },
                $push: { items: { item: item } }
            },
            { 
                upsert: true, 
                new: true 
            }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in /api/addtolist:", error);
        res.status(500).json({ error: error.message });
    }
});



// Mark todo complete
app.put("/api/todos/:todoId/complete", async (req, res) => {
    const { todoId } = req.params;

    try {
        const updatedUser = await UserToDoListModel.findOneAndUpdate(
            { "items._id": todoId },
            { 
                $set: { "items.$.completed": true }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/users",(req,res)=>{
    UserListModel.find()
    .then((users)=>{
        if(!users)
        {
            return res.status(404).json({message:"Couldn't fetch Users"});
        }
        res.status(200).json(users);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:"Error in retrieving users"});
    });
}); 

app.get("/api/check1/:id", async (req, res) => {
    try {
        const user = await UserToDoListModel.findOne({ userID: req.params.id });

        console.log("Fetched User:", user); // Debugging

        if (!user) {
            return res.status(404).json({ message: "No todos found", items: [] });
        }

        res.status(200).json({ items: user.items || [] }); // Ensure items is always an array
    } catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/api/verify',(req,res)=>{
    const {userID,password} = req.body;
    console.log(userID,password);
    UserListModel.findOne({userID:String(userID),password:String(password)})
    .then((user)=>{
        if(!user)
        {
            return res.status(404).json();
        }
        console.log("HELLO");
        return res.status(200).json({message:"VERIFIED"});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:"Some Internal Error Occured"});
    })
})

app.listen(port,()=>{
    console.log(`Service is running on port ${port}`);
});

