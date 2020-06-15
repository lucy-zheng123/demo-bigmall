import {ADD_COUNT, ADD_PRODUCT} from "./mutation-type";


export default {
  addCart({commit, state}, payload) {
    return new Promise((resolve)=>{
      // 加入之前判断该商品是否存在，如果存在只需要增加数量即可
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      // 不存在再添加商品
      if (oldProduct) {
        commit(ADD_COUNT, {count: payload.count, pro: oldProduct})
        resolve('商品数量＋1')
      } else {
        commit(ADD_PRODUCT, payload)
        resolve('添加商品成功')
      }
    })


  }
}
