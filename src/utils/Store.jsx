import { configureStore } from '@reduxjs/toolkit'
import accessTokenReducer from './Acesstokenslice'
import userdetailReducer from './Userdetailslice'

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    userdetail: userdetailReducer,
  },
})