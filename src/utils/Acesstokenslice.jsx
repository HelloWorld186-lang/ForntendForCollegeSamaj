import { createSlice } from '@reduxjs/toolkit'

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: {
    value: ""
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.value = action.payload
    },
    clearAccessToken: (state) => {
      state.value = null
    },
  },
})

export const { setAccessToken, clearAccessToken } = accessTokenSlice.actions

export default accessTokenSlice.reducer