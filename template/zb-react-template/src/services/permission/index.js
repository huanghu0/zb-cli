import { fetchGet } from '../index'
export const getPermissionInfo = (params = {}) => fetchGet('/perminfo',params)