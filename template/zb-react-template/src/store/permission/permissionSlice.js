import { createSlice } from '@reduxjs/toolkit'

export const permissionSlice  = createSlice({
  name: 'permissionSlice',
  initialState: {
    project:{},
    module:[],
    menu:[],
    page:[],
    activeMenu:{}
  },
  reducers: {
    permissionAction: (state,perminfo) => {
      state.project = perminfo.payload.project
      state.menu = perminfo.payload.menu
      state.page = perminfo.payload.page
      state.module = perminfo.payload.module
    },
    setActiveMenu: (state,action) => {
      state.activeMenu = action.payload.activeMenu
    }
  }

})

export const { permissionAction,setActiveMenu } = permissionSlice.actions

export default permissionSlice.reducer