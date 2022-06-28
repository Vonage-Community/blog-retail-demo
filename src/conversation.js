const vonage = require('./vonage')

const getUsers = async function () {
  return new Promise((resolve, reject) => {
    vonage.users.get({ page_size: 100, order: 'asc' }, (error, result) => {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(result._embedded.data.users)
      }
    })
  })
}

const getUser = async function (mobileNumber) {
  let user
  await createUser(mobileNumber)
    .then(data => {
      user = data
    })
    .catch(async (err) => {
      if (err) {
        console.error(err)
      }
      const users = await getUsers()
      for (let i = 0; i < users.length; i++) {
        if (users[i].name === mobileNumber) {
          user = users[i]
        }
      }
    })

  return user
}

const createUser = async function (mobileNumber) {
  return new Promise((resolve, reject) => {
    vonage.users.create({ name: mobileNumber, display_name: mobileNumber }, (error, result) => {
      if (error) {
        reject(new Error(error))
      } else {
        resolve({ ...result, mobileNumber })
      }
    })
  })
}

module.exports = {
  getUser, getUsers, createUser
}
