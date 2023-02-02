

export const addNewReplacement = replacement => (
  $.ajax({
    method: 'post',
    url: '/api/replacements',
    data: {replacement}
  })
)

export const updateReplacement = replacement => (
  $.ajax({
    method: 'put',
    url: `/api/replacements/${replacement.id}`,
    data: {replacement}
  })
)

export const getAllReplacements = () => (
  $.ajax({
    method: 'get',
    url: '/api/replacements'
  })
)

export const deleteReplacement = replacement => (
  $.ajax({
    method: 'delete',
    url: `/api/replacements/${replacement.id}`
  })
)