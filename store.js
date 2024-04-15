import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./features/cart/CartSlice";
import productReducer from "./features/product/Saveproduct";
import userReducer from "./features/user/UserSlice"
import menuReducer from "./features/menu/MenuSlice"

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: productReducer,
    user: userReducer,
    menu: menuReducer,
    // Add other reducers here if you have any
  },
});

export const persistor = persistStore(store);
