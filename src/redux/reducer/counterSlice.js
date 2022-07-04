import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    range: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes,
            if (action.payload?.value) {
                state.value += 1
            }
            if (action.payload?.range) {
                state.range += 2
            }
        },
        decrement: (state, action) => {
            if (action.payload?.value) {
                state.value -= 1
            }
            if (action.payload?.range) {
                state.range -= 2
            }
            // state.value -= 1,
            //     state.range -= 2
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer