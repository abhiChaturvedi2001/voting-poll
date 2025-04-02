import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });


userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5h"
    });
    return token;
}

const User = mongoose.model("User", userSchema);
export default User;