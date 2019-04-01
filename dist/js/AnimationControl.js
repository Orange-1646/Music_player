(function($, root){
    class AnimationManager{
        constructor(dom){
            this.rotating = false
            this.timer = null
            this.angle = 0
            this.dom = dom
        }
        start(){
            this.rotating = true
            this.timer = setInterval(()=>{
                this.angle += 0.1
                this.dom.css({
                    'transform' : `rotate(${this.angle}deg)`
                })
            }, 0.1)
            
        }
        pause(){
            clearInterval(this.timer)
            this.rotating = false
        }
        clear(){
            this.angle = 0
            this.dom.css({
                'transform' : 'rotate(0)'
            })
        }
        toggleAnimation(){
            if(this.rotating){
                this.pause()
            }
            else{
                this.start()
            }
        }
    };
    root.animationManager = AnimationManager
})(window.Zepto, window.player || (window.player = {}))