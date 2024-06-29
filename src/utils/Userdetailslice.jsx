import { createSlice } from '@reduxjs/toolkit'

export const userdetailSlice = createSlice({
  name: 'userdetail',
  initialState: {
    value: null,
  },
  reducers: {
    setuserdetail: (state, action) => {
      state.value = action.payload
    },
    clearuserdetail: (state) => {
      state.value = null
    }
  },
})

export const { setuserdetail, clearuserdetail } = userdetailSlice.actions

export default userdetailSlice.reducer