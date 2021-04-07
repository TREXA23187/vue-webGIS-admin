import request from '@/utils/request'

export const getUsersList = ()=>{
  return request({
    url:'/api/users/info',
    method:'get'
  })
}

export const deleteUser = (id)=>{
  return request({
    url:'/api/users/user',
    method:'delete',
    data:{
      id
    }
  })
}

export const addUser = (data)=>{
  return request({
    url:'/api/users/signup',
    method:'post',
    data
  })
}
