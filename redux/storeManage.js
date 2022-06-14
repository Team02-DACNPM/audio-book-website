import { createSlice } from '@reduxjs/toolkit';
export const counterSlice = createSlice({
    name: 'storeManage',
    initialState: {
        jwt: 'null',
        user: 'null',
        cart: {
            books: [],
        },
    },
    reducers: {
        updateJwt: (state, action) => {
            state.jwt = action.payload;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },

        addBooksToCart: (state, action) => {
            const id = action.payload._id;
            const index = state.cart.books.findIndex((item) => item._id === id);
            if (index === -1) {
                state.cart.books.push(action.payload);
            }
        },

        updateCart: (state, action) => {
            state.cart = action.payload;
        },

        removeBook: (state, action) => {
            const id = action.payload;
            const newBooks = state.cart.books.filter((item) => item._id !== id);
            state.cart.books = newBooks;
        },

        destroyCart: (state, action) => {
            state.cart = {
                books: [],
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateJwt, updateUser, addBooksToCart, updateCart, removeBook, destroyCart } = counterSlice.actions;

export default counterSlice.reducer;
