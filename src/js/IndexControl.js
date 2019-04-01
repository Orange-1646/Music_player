(function($, root){
    class IndexManager{
        constructor(length){
            this.length = length
            this.index = 0
        }
        changeIndex(direction){
            this.index = (this.index + direction + this.length) % this.length
        }
        changeIndexTo(num){
            this.index = num
        }
    }

    root.indexManager = IndexManager
})(window.Zepto, window.player || (window.player ={}))