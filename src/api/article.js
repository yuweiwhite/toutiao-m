import request from '@/utils/request'
export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

export const getDetails = id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${id}`,
  })
}

export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}