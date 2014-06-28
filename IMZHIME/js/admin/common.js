String.prototype.append = function(str) {
    var after;
    // 如果是正整数
    if (+str == str && Math.abs(str) == str) {
         after = this + '_' + str;
    } else {
        after = this + str;
    }
    return after;
};

;(function($) {

    /**
     * 全屏API
     * 来源：http://www.2fz1.com/?p=108
     */
    window.fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function() { return false; },
        requestFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        prefix: ''
    };

    var browserPrefixes = ['webkit', 'moz', 'o', 'ms', 'khtml'];
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        //检测支持全屏的浏览器前缀，该API各浏览器厂商在该方法加了自己的前缀
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
                break;
            }
        }
    }

    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        };
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        };
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        };
    }

    // 按ESC键dialog响应关闭事件
    $(document).bind('keydown', function(e) {
        var $dialog = $('.panel.window').find('.panel-body.panel-body-noborder.window-body');
        var $messager = $('.panel.window.messager-window');
        if ($messager[0]) {
            if (27 === e.keyCode) { // ESC
                $('.messager-button > .l-btn', $messager).eq(-1).trigger('click');
            }
        } else if ($dialog[0]) {
            if (27 === e.keyCode) { // ESC
                $dialog.Destroy_Dialog();
            }
            if (13 === e.keyCode) { // Enter
                $('.dialog-button > .l-btn:eq(-2)', $dialog).trigger('click');
            }
        }
    });

    window.CONSTANTS = {
        PAGELIST: [10,20,50],
        PAGESIZE: 20,
    };
})(jQuery);