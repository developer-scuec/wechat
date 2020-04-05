// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
// 使用了 async await 语法
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('address').where({
      _id: false
    })
      .update({
        data: {
          progress: _.inc(10)
        },
      })
  } catch (e) {
    console.error(e)
  }
}