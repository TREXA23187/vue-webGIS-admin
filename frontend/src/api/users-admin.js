import request from '@/utils/request'

export const getUsersList = ()=>{
  return request({
    url:'/api/users',
    method:'get'
  })
}

export const deleteUser = (id)=>{
  return request({
    url:'/api/users',
    method:'delete',
    data:{
      id
    }
  })
}

export const addUser = (data)=>{
  return request({
    url:'/api/signup',
    method:'post',
    data
  })
}
