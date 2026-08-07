import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
