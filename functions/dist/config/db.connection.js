"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// db Local
// mongoose.connect('mongodb://127.0.0.1:27017/work',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   } as mongoose.ConnectOptions
// );
// DB Atlas
mongoose_1.default.connect('mongodb+srv://resyanac:Resyaa21@cluster21.guz7tco.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
exports.db = mongoose_1.default.connection;
