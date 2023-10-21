
import mongoose from 'mongoose';


// DB Atlas
mongoose.connect('mongodb+srv://resyanac:Resyaa21@cluster21.guz7tco.mongodb.net/?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as mongoose.ConnectOptions
);


export const db = mongoose.connection;