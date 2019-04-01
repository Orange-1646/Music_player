(function($, root){
    class ProgressManager{
        constructor(){
            this.totalTime = 0
            this.totalTimeFormatted = __timeFormatter(this.totalTime)
            this.currentTime = 0
            this.currentTimeFormatted = __timeFormatter(this.currentTime)
            this.playing = false
            this.frameId = null
            this.totalWidth = $('.total-progress').offset().width
            this.initialLeft = $('.total-progress').offset().left
            this.percentage = this.currentTime / this.totalTime
        }
        initTime(time){
            this.totalTime = time
            this.totalTimeFormatted = __timeFormatter(time)
            this.percentage = 0
            this.renderTime(0)
        }
        start(){
            this.playing = true
            let timeStamp = new Date().getTime()
            let update = (percentage)=>{
                let time = percentage * this.totalTime + this.currentTime
                this.renderTime(time)
            }
            let frame = ()=>{
                let nowTime = new Date().getTime()
                let percentage = (nowTime - timeStamp)/this.totalTime/1000
                this.renderPercentage()
                update(percentage)
                timeStamp = nowTime
                this.frameId = requestAnimationFrame(frame)
            }

            frame()          

        }
        pause(){
            this.playing = false
            cancelAnimationFrame(this.frameId)
        }
        renderTime(time){
            var self = this
            this.currentTime = time
            this.currentTimeFormatted = __timeFormatter(time)
            this.percentage = time / this.totalTime
            $('.total-time').html(self.totalTimeFormatted)
            $('.current-time').html(self.currentTimeFormatted)
        }

        dragUpdate(progress){
            this.currentLeft = progress
            if(progress <= this.initialLeft) progress = this.initialLeft
            if(progress >= this.initialLeft + this.totalWidth) progress = this.initialLeft + this.totalWidth
            this.percentage = (progress - this.initialLeft) / this.totalWidth
            this.renderTime(this.percentage * this.totalTime)
            this.renderPercentage()
        }
        renderPercentage(){
            let leftPercentage = (this.percentage - 1)*100 + '%'
            $('.current-progress').css({
                'transform' : `translateX(${leftPercentage})`
            })
        }
            
        togglePlay(){
            if(this.playing){
                this.pause()
            }
            else{
                this.start()
            }
        }
        reset(){
            this.renderTime(0)
            this.percentage = 0
            this.renderPercentage()
        }
        
    }
    function __timeFormatter(time){
        var min = Math.floor(time / 60)
        var sec = Math.floor(time % 60)
        if(min < 10){
            min = '0'+ min
        }
        if(sec < 10){
            sec = '0' + sec
        }

        return `${min} : ${sec}`
    }
    root.progressManager = ProgressManager
})(window.Zepto, window.player || (window.player = {}))