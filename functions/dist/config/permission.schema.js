"use strict";
// // dbConnection.ts
// import mongoose, { ConnectOptions } from 'mongoose';
// import { getMongoURI } from './db.connection';
// import Permission from '../model/permission';
// import { UserRole } from './user.schema';
// async function seedPermissions() {
//   try {
//     const roles: UserRole[] = [UserRole.Admin, UserRole.Approver, UserRole.Staff];
//     for (const role of roles) {
//       const existingRole = await Permission.findOne({ role: role });
//       if (!existingRole) {
//         const newRole = new Permission({ role: role });
//         await newRole.save();
//       }
//     }
//   } catch (error) {
//     console.error('Error seeding permissions:', error);
//   }
// }
// const dbConnection = () => {
//   const MONGO_URI  // Determine the MongoDB URI based on your configuration
//   mongoose
//     .connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as ConnectOptions)
//     .then(() => {
//       console.log('Success connected to MongoDB');
//       seedPermissions();
//     })
//     .catch((err: Error) => {
//       console.error(err);
//     });
// };
// export default dbConnection;
