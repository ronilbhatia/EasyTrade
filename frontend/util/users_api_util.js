export const fetchUserData = id => ({
  $.ajax({
    url: '/api/users/data'
  })
})
