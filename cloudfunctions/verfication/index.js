// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
// 检测是否数据库中Mail和Name匹配与否以及其领取状态是否为是
// 需要通过where检测学校邮箱然后检测邮编
// Entries: collectionName: 数据库名称
// Entries: email addr
// Return: List
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var date = new Date()
  // Get the list of data where mail is event.mail
  var list = db.collection(event.collectionName).where({
    Mail: event.email
  }).get()
  return await list
}