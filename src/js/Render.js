(function($, root){
    function renderCover(img){
        let image = new Image()
        image.src = img
        image.onload = function(){
            $('.img-box img').attr('src', img)
            root.blurImg(image, $('body'))
        }
    }
    function renderInfo({ author, music, album }){
        console.log(1)
        var infoStr = `<div class="music-name">${music}</div>
                       <div class="artist">${author}</div>
                       <div class="album">${album}</div>`
        $('.song-info').html(infoStr)
    }
    function renderLike(liked){
        if(liked){
            $('.btn.like').addClass('liked')
        }
        else{
            $('.btn.like').removeClass('liked')
        }
    }
    function render(data){
        renderCover(data.image)
        renderInfo({
            author : data.singer,
            music : data.song,
            album : data.album
        })
        renderLike(data.isLike)
    }
    function renderLikedList(list){
        let html = ''
        list.forEach(item=>{
            html += `<div data-index=${item.index}>${item.song}
                    </div>`
        })
        $('.liked-list').html(html)
    }
    root.render = {
        render,
        renderLikedList
    }
})(window.Zepto, window.player || (window.player = {}))