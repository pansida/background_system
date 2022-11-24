import Mock from "mockjs";
import homeapi from "./mockServeData/home"
import user from "./mockServeData/user"
import permission from "./mockServeData/permission"


Mock.mock('/api/home/getData',homeapi.getStatisticalData)


Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getMenu/, 'post',permission.getMenu)