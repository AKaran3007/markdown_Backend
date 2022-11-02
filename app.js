const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require ("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl = "mongodb+srv://aspkaran:karananand123@cluster0.mpe9ubl.mongodb.net/test"
mongoose.connect(mongoUrl , {
    useNewUrlParser:true
}).then(() => { console.log("connected to database");
})

.catch(e=>console.log(e));

require("./userDetails")

const User = mongoose.model("userInfo");

app.post("/register" , async(req,res) => {
    const {fname, lname, email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password,10);
   
       try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Already Exists"})
        }
           await User.create({
               fname,
               lname,
               email,
               password: encryptedPassword,
           });
           res.send({status:"ok..."})
       } catch (error) {
           res.send({status:"error..."})
       }
   });


app.listen(5000 , () => {
    console.log("Server Started");
});


