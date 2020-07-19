export default {
  prizeArr:[],
  prizeObj:{},
  generatePrize(defaultPrize,prize){
    let customPrize=prize?Object.keys(prize):defaultPrize
    let prizes = prize?Object.assign({},prize):{}
    if(customPrize.length<8){ //用默认奖品补全8个奖品
      for(let i = 0;i<defaultPrize.length;i++){
        if(!customPrize.includes(defaultPrize[i])){
          customPrize.push(defaultPrize[i])
          prizes[defaultPrize[i]] = 1000
        }
        if(customPrize.length===8){break}
      }
    }
    this.prizeArr = customPrize
    this.prizeObj = prizes
    return {
      prizeArr:customPrize,
      prizeObj:prizes
    }
  },
  //生成HTML 旋转顺序和数组顺序相同
  generateTemplate(defaultPrize,prize){
    let prizes = this.generatePrize(defaultPrize,prize).prizeArr
    let str = ''
    str = `<div class='prize' data-index='1'>${prizes[0]}</div>
    <div class='prize' data-index='2'>${prizes[1]}</div>
    <div class='prize' data-index='3'>${prizes[2]}</div>
    <div class='prize' data-index='9'>${prizes[7]}</div>
    <div class='prize btn' data-index='5'>开始</div>
    <div class='prize' data-index='4'>${prizes[3]}</div>
    <div class='prize' data-index='8'>${prizes[6]}</div>
    <div class='prize' data-index='7'>${prizes[5]}</div>
    <div class='prize' data-index='6'>${prizes[4]}</div>`
    return `'<div class="game_pane">${str}</div>'`
  },
  //计算奖品 转到随机奖品，至少需要走几个格子
  getPrize(prize){
    let rand=parseInt(Math.random()*100)
    let nums =Object.values(prize)
    let probTotal = 0
    if(nums.length<8){
      let len = 8-nums.length
      let temp = nums.reduce((item,i)=>item+i,0)
      let prob = (100-temp)/len
      for(let k =0;k<len;k++){
        nums.push(prob)
      }
    }
    let index = 0
    for(let i = 0;i<nums.length;i++){
      probTotal+=nums[i]
      if(rand<probTotal){
        index = i
        break
      }
    }
    return index
  }
}