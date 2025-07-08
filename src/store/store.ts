import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/features/auth/authSlice"; // You may need to create this if missing
// Later: Add admin-specific reducers here (e.g., users, doctors, complaints, etc.)

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth for now
};

const rootReducer = combineReducers({
  auth: authReducer,
  // Add admin-specific slices here, like:
  // users: usersReducer,
  // doctors: doctorsReducer,
  // complaints: complaintsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
