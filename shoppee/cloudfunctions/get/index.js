const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 10
exports.main = async (event, context) => {


  // 承载所有读操作的 promise 的数组

    const promise = db.collection('shops').skip(event.index * MAX_LIMIT).limit(MAX_LIMIT).get()

  
  // 等待所有
 
    return {
      data:promise
    
    }
  
}