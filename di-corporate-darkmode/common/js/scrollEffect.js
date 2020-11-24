(function (win) {
    function ScrollEffect(target) {
        this.target = $(target);
        this.target.css('opacity',0);
        $(window).on('scroll',this.scrollEvent.bind(this));
        var that = this;
        setTimeout(
            function(){
                that.scrollEvent();
            },
            100
        );
        this.scrollEvent();
        
    }
    ScrollEffect.prototype.scrollEvent = function(e){
        var scroll_height = $(window).scrollTop();
        var win_height = $(window).height();
        scroll_height = scroll_height + win_height -200;
        this.target.each(function(index,item){
            var element_height = $(item).offset().top;
            if(element_height < scroll_height){
                $(item).removeAttr('style').addClass('effect');
            }
        });
    };
    win.ScrollEffect = ScrollEffect;
})(window)
