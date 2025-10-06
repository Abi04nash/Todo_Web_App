// src/store/store.js

import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';

// 1. Import redux-persist libraries
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Your authSlice remains the same
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

// 2. Combine your reducers (even if you only have one)
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    // Add other reducers here if you have them
});

// 3. Create the persist configuration
const persistConfig = {
    key: 'root', // The key for the persisted state in localStorage
    storage,
    whitelist: ['auth'] // Only the 'auth' slice will be persisted
};

// 4. Create a new persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 5. Configure the store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // This is to ignore a warning from redux-persist
        }),
});

// 6. Export the persistor
export const persistor = persistStore(store);