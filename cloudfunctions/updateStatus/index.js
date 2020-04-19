// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
// 检测是否数据库中Mail和Name匹配与否以及其领取状态是否为是
// 需要通过where检测学校邮箱然后检测邮编
// Entries: collectionName: 数据库名称
// Entries: email: 学校邮箱
// Return: Success / Failure
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var date = new Date()
  try {
    return await db.collection(event.collectionName).where({
      Mail: event.email
    }).update({
      data: {
        Status: 1
      }
    })
  }
  catch(e) {
    console.error(e)
  }
}