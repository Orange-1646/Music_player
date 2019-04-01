let musicList = []
let root = window.player
let render = root.render
let index = {}
let audio = new root.audioManager()
let animation = new root.animationManager($('.img-box'))
let progress
let likedList = []


function getData(url){
    $.ajax({
        type : "GET",
        url,
        success(data){
            musicList = data
            bindEvent()
            bindTouch()
            render.render(data[0])
            audio.setAudio(data[0].audio)
            index = new root.indexManager(data.length)
            progress = new root.progressManager()
            progress.initTime(data[0].duration)
            initLikedList()
            blur(data[0].image, $('body'))         
        },
        error(){
            console.log('request failed')
        },
    })
}

function reset(){
    progress.reset()
    animation.clear()
    audio.setAudio(musicList[index.index].audio)
    render.render(musicList[index.index])
    progress.initTime(musicList[index.index].duration)
}

function switchMusic(direction){
    index.changeIndex(direction)
    reset()
}


function switchMusicTo(i){
    index.changeIndexTo(i)
    reset()
}

function bindEvent(){
    $('.btn.prev').on('click', function(){
        switchMusic(-1)
    })
    $('.btn.next').on('click', function(){
        switchMusic(1)
    })
    $('.btn.play').on('click', function(){
        audio.toggleMusic()
        animation.toggleAnimation()
        $('.song-img').toggleClass('playing')
        $('.btn.play').toggleClass('playing')
        progress.togglePlay()
    })
    $('.btn.like').on('click', function(e){
        $('.btn.like').toggleClass('liked')
        changeLike()
    })
    $('.btn.list').on('click', function(){
        render.renderLikedList(likedList)
        $('body').one('click', function(){
            $('.liked-list').toggleClass('hide')
        })
        $('.liked-list').toggleClass('hide')
        return false
    })
    $('.liked-list').delegate('div', 'click', function(e){
        $('body').unbind('click')
        let i = $(e.target).attr('data-index')
        console.log(i)
        switchMusicTo(i)
        $('.liked-list').toggleClass('hide')
        return false
    })
}

function bindTouch(){
    $('.slider').on('touchstart', function(e){
        progress.pause()
        animation.pause()
        audio.pause()
    }).on('touchmove', function(e){
        progress.dragUpdate(e.changedTouches[0].clientX)
        audio.changeProgress(progress.percentage, progress.totalTime)
    }).on('touchend', function(e){
        progress.start()
        animation.start()
        audio.play()
        $('.btn.play').addClass('playing')
    })
}
function initLikedList(){
    musicList.forEach((item, index)=>{
        if(item.isLike){
            item.index = index
            likedList.push(item)
        }
    })
}
function changeLike(){
    musicList[index.index].isLike = !musicList[index.index].isLike
    if(likedList.indexOf(musicList[index.index]) < 0){
        musicList[index.index].index = index.index
        likedList.push(musicList[index.index])
    }
    else{
        likedList.splice(likedList.indexOf(musicList[index.index]), 1)
    }
}


getData('../mock/data.json')