import { createSlice } from '@reduxjs/toolkit'

export const loginSlice  = createSlice({
  name: 'loginSlice',
  initialState: {
    userInfo:{}
  },
  reducers: {
    userInfoAction: (state,userinfo) => {
      state.userInfo = userinfo.payload.userInfo
    }
  }

})

export const { userInfoAction } = loginSlice.actions

export default loginSlice.reducer