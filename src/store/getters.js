export default {
  getProductCount(state) {
    return state.cartList.length === 0 ? '' : `(${state.cartList.length})`
  },
  getProducts(state) {
    return state.cartList
  },
  getTotalPrice(state) {
    return state.cartList.reduce((pre, item) => {
      if (item.checked) {
        return pre + (item.count * item.realPrice)
      } else {
        return pre + 0
      }
    }, 0).toFixed(2)
  },
  getCheckProduct(state) {
    return state.cartList.filter(item => {
      return item.checked
    }).length
  },
  isCheckAll(state) {
    if (state.cartList.length === 0) return false
    return !state.cartList.find(item => {
      return !item.checked
    })
    
    //  return !(this.cartList.filter(item => !item.checked).length)
   

  }
}
