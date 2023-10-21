import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
    no: {
        type : String,
        required : true
    },
    status: {
        type: String,
        default: "Tertunggak",
        enum: ['Tertunggak', 'Tertagih']
    },
    isDeleted: {
        type: Boolean
    }
},{
    timestamps: {
        currentTime: () => new Date().setUTCHours(0, 0, 0, 0)
    },
    versionKey: false
})

export const taxModel = mongoose.model("taxes", taxSchema);