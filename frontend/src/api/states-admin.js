import request from '@/utils/request'

export const getStatesList = ()=>{
  return request({
    url:'/api/states/info',
    method:'get'
  })
}
