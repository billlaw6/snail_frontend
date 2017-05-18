import Mock from 'mockjs'
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    name: {
      last_name: '旷',
      first_name: '某某'
    },
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png'
  }
]

const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: {
      first_name: Mock.Random.cname().substr(1, 2),
      last_name: Mock.Random.cname().substr(0, 1)
    },
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

export { LoginUsers, Users }
