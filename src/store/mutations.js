import {
  ADD_COUNT,
  ADD_PRODUCT,
  PRO_COUNT_DECREMENT,
  PRO_COUNT_INCREMENT,
  CHANGE_PRO_STATUS,
  CHECK_ALL_PRODUCT
} from "./mutation-type";

export default {
  [ADD_COUNT](state, payload) {
    payload.pro.count += payload.count
  },
  [ADD_PRODUCT](state, payload) {
    
    payload.checked = true
    state.cartList.push(payload)
  },
  [PRO_COUNT_DECREMENT](state, iid) {
    let pro = state.cartList.find(item => item.iid === iid)
    pro.count--
  },
  [PRO_COUNT_INCREMENT](state, iid) {
    let pro = state.cartList.find(item => item.iid === iid)
    pro.count++
  },
  [CHANGE_PRO_STATUS](state, iid) {
    let pro = state.cartList.find(item => item.iid === iid)
    pro.isCheck = !pro.isCheck
  },
  [CHECK_ALL_PRODUCT](state) {
    // 如果是全部选中状态
    if (this.getters.isCheckAll){
      state.cartList.forEach(item => item.checked = false)
    }else {
      state.cartList.forEach(item => item.checked = true)
    }
  },
}
