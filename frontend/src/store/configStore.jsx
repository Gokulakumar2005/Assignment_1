import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../sclies/userSclies.jsx";
import componentReducer from "../sclies/componentSclies.jsx";
import quotationReducer from "../sclies/quotationSclies.jsx";

const store=configureStore({
    reducer:{
       auth: authReducer,
       compo: componentReducer,
       quotation: quotationReducer
    }
})
export default store;