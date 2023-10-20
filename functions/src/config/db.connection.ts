
import mongoose from 'mongoose';
import dbConfig from './db.config';

// db Local
// mongoose.connect('mongodb://127.0.0.1:27017/work',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   } as mongoose.ConnectOptions
// );

// DB Atlas
mongoose.connect('mongodb+srv://resyanac:Resyaa21@cluster21.guz7tco.mongodb.net/?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as mongoose.ConnectOptions
);


export const db = mongoose.connection;