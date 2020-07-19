import dom from "./dom.js";
import util from "./util.js";
class Game{
  constructor(options){
    this.defaultPrize = [
      '华为',
      'iPhoneX',
      '谢谢惠顾',
      '手环',
      '小熊抱枕',
      '格力冰箱',
      '电风扇',
      '小度音响'
    ]
    this.prize = options.prize
    this.timer = false
    this.circus = options.circus?options.circus:56 //定制转的圈数，8的整数倍
    this.game_pane = util.generateTemplate(this.defaultPrize,this.prize)//生成转盘
    this.initStartUI(); // 初始化开始界面
  }
  /**
   * 初始化游戏界面
   */
  initStartUI() { 
    let el = dom.create(this.game_pane);
    let btn = el.querySelector(".btn");
    dom.insert(el);
    btn.addEventListener("click", e => {
      this.start();
    });
  }
  start(){
    //阻止抽奖过程随意点击
    if(this.timer){
      return
    }
    this.timer = true
    let rand = util.getPrize(this.prize)+this.circus //转到随机奖品，需要走几个格子，加上圈数
    let sort = [1,2,3,4,6,7,8,9]
    let doms = dom.getElements('.prize')
    let i = 0
    let count = 0
    let timer = null
    let timerOperation = ()=>{
      let prize = ''
      for(let j = 0;j<doms.length;j++){
        let element = doms[j]
        if(element.dataset.index){
          element.className = 'prize'
        }
        if(element.dataset.index === String(sort[i])){
          element.className = 'prize active'
          prize = element.innerHTML
        }
      }
      if(i === 7){i=-1}
      let speed = parseInt(this.circus/3)
      if(count>speed){
        clearInterval(timer)
        timer = setInterval(timerOperation,100) //控制速度，先快
      }
      if(count>this.circus-11){
        clearInterval(timer)
        timer = setInterval(timerOperation,300)//控制速度 到达一定圈数慢下来
      }
      if(count === rand){
        let tempFunc = ()=>{
          this.timer = false
          alert('你获得的奖品是：'+prize)
       }
        setTimeout(tempFunc,0)
        clearInterval(timer)
        return
      }
      count++
      i++
    }
    timer = setInterval(timerOperation,300)
  }
}

export default Game;