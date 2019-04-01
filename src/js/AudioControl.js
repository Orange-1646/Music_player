(function($, root){
    let $scope = $(document.body)
    class AudioManager{
        constructor(){
            this.myAudio = new Audio()
            this.playing = false
            this.bindEvent()
        }
        bindEvent(){
            $(this.myAudio).on("ended",function(){
                        $scope.find('.next').trigger('click')
            }) 
        }
        play(){
            this.myAudio.play()
            this.playing = true
        }
        pause(){
            this.myAudio.pause()
            this.playing = false
        }
        setAudio(audio){
            this.myAudio.src = audio
            this.myAudio.load()
            if(this.playing) this.play()
        }
        changeProgress(percentage, duration){
            this.myAudio.currentTime = percentage * duration
        }
        toggleMusic(){
            if(this.playing){
                this.pause()
            }
            else{
                this.play()
            }
        }

    }

    root.audioManager = AudioManager
})(window.Zepto, window.player || (window.player = {}))