import request from '@/utils/request'
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

export const addUserChannel = item => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: { channels: [item] }
  })
}

export const deleteUserChannel = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${target}`
  })
}