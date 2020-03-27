// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
// 检测是否数据库中Open_id存在
// 检测是否名称存在
// Entries: collectionName: 数据库名称
// Entries: id: Matriculation ID
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var list = db.collection(event.collectionName).where({
    _openid: wxContext.OPENID
  }).get()
  return await list
}