import UserModel from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserCtrl = {};

UserCtrl.Create = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const UserPresentWithEmail = await UserModel.findOne({ email });
        if (UserPresentWithEmail) {
            return res.status(400).json({ error: "email already present" })
        }
        else {
            const usersCount = await UserModel.countDocuments();
            const user = new UserModel({
                userName,
                email,
                password,
                role: usersCount === 0 ? "admin" : "saleExcutive"
            });
            const salt = await bcryptjs.genSalt();
            const hashpassword = await bcryptjs.hash(password, salt);
            user.password = hashpassword;
            await user.save();

            res.json(user);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

UserCtrl.login = async (req, res) => {
    const body = req.body;
    try {
        const userPresent = await UserModel.findOne({ email: body.email });
        if (!userPresent) {
            return res.status(400).json({ error: "Invalid Email" });
        }
        if (!userPresent.password) {
            return res.status(400).json({ error: "This account uses Google Login. Please use 'Continue with Google'." });
        }
        const passwordMatch = await bcryptjs.compare(body.password, userPresent.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        const tokenData = {
            userId: userPresent._id,
            role: userPresent.role
        };
        const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: "7d" });
        res.json({ token });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

UserCtrl.account = async (req, res) => {
    try {
        const users = await UserModel.findById(req.userId)
        res.json(users);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}

export default  UserCtrl;