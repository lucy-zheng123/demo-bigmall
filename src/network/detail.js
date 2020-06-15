import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: 'detail',
    params: {
      iid
    }
  })
}
export function getRecommend() {
  return request({
    url:'recommend'
  })
}



export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsPram {
  constructor(info, rule) {
    //注：images可能没有值（某些商品没有值,有些有）
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

export class CommentInfo {
  constructor(rate){
    this.uname = rate.list[0].user.uname
    this.uhead = rate.list[0].user.avatar
    this.style = rate.list[0].style
    this.content = rate.list[0].content
    this.date = rate.list[0].created*1000       //乘以1000是为了转换为date数据
    this.images = rate.list[0].images && rate.list[0].images
  }
}
