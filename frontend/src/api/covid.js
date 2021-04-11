import request from '@/utils/request'

export const getCovidInfo = ()=>{
  return request({
    url:'/api/covid',
    method:'get'
  })
}
