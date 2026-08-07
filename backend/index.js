import dotenv from 'dotenv';
dotenv.config({ override: true });
import express from "express";
import cors from "cors";
import { ConfigureDB } from "./config/db.js";
import UserCtrl from './app/controller/userController.js';
import ComponentCtrl from './app/controller/componentCtrl.js';
import QuotationCtrl from './app/controller/quotationCtrl.js';
import { authenticateUser } from './app/middlewares/auth.js';
import { authorizeUser } from "./app/middlewares/authorize.js";

const app = express();
const port = process.env.port || 1972;
ConfigureDB();
app.use(cors());
app.use(express.json());

app.post("/user/register", UserCtrl.Create);
app.post("/user/login", UserCtrl.login);
app.get("/user/account", authenticateUser, UserCtrl.account);

// admin
app.post("/create/component", authenticateUser, authorizeUser(["admin"]), ComponentCtrl.Create);
app.get("/components", authenticateUser, ComponentCtrl.List);
app.get("/admin/fetch/components", authenticateUser, authorizeUser(["admin"]), ComponentCtrl.fetchALLComponent);
app.put("/components/:id", authenticateUser, authorizeUser(["admin"]), ComponentCtrl.UpdatePrice);
app.delete("/components/:id", authenticateUser, authorizeUser(["admin"]), ComponentCtrl.Delete);

// quotations
app.post("/quotations", authenticateUser, QuotationCtrl.Create);
app.get("/admin/quotations", authenticateUser, authorizeUser(["admin"]), QuotationCtrl.List);

app.listen(port, () => {
    console.log("sever is connected on " + port);
});
