import React from 'react'
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    accno: '',
    ifsc: '',
    amount: '',
    donationType: '',
    email: '',
    membership: ''
}

const slice = createSlice({
    name: 'paymentDetails',
    initialState,
    reducers: {
        submit(state,action) {
            state.name = action.payload.name
            state.accno = action.payload.accno
            state.ifsc = action.payload.ifsc
            state.email = action.payload.email
            state.membership = action.payload.membership
        },
        type(state,action) {
            state.donationType = action.payload.selectedtype
        },
        amt(state,action) {
            state.amount = action.payload.amount
        },
        reset(state,action) {
            state.name = initialState.name
            state.accno = initialState.accno
            state.ifsc = initialState.ifsc
            state.email = initialState.email
            state.membership = initialState.membership
        }
    }
})

const store = configureStore({ reducer: { paymentDetails: slice.reducer } })
export const counterActions = slice.actions;
export default store;
