/*防抖函数*/
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer) //判断timer是否有值可以等等
    timer = setTimeout(() => {
      func.apply(this, ...args)   //...可以传入多个数值
    }, delay)
  }
}

/*节流函数*/
export function throttle(fn, delay) {
  let canRun = true
  return function (...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(fn, args)
      canRun = true
    }, delay)
  }

}

export const backTopMixIn={
  data(){
    return{
      show:false,
      backToFunc :(index)=>{

        let posY = index !== undefined?this.distanceList[index]:0
        let userChoice = false
        if(posY == 0 || posY  ){
          this.$refs.scroll.backTo(0,posY,150)
          return 0
        }else{
          if(posY == null) {
            userChoice = confirm("图片未加载完成，按确认重新跳转")
            console.log(userChoice,posY);
            if(userChoice){
              setTimeout(()=>{
                posY = this.distanceList[index]
                if (posY) {
                this.$refs.scroll.backTo(0,posY,150)
                }
              },1000)
            }
          }
        }
      }
    }
  },
}

