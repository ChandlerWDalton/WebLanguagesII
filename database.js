const mongoose = require('mongoose');
const uri = "mongodb+srv://todo_user:cQzs4y1PdAPDcaQn@cluster0.081q2sn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
    uri,{
        usedNewUrlParser: true,
        usesrUnifiedToplogy: true
    }
)