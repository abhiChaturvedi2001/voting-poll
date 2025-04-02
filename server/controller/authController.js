import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const token = await user.getJWT();
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Login successful.", user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        })

        return res.status(200).json({
            message: "Logged Out SuccessFully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const id = req.id
        const user = await User.findById({ _id: id }).select("-password");
        return res.status(200).json({
            user,
            message: "profile fetch successfully",
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

