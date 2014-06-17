var SITE_INFO = {
    DLG_ID: '#site_info_dialog'
};

$(function() {
    $('<div/>').attr('id', SITE_INFO.DLG_ID.substring(1)).Dialog({
        title: '站点信息',
        width: 320,
        href: '/index.php/Site/info',
        buttonIconCls: 'icon-no',
        buttonUrl: '/index.php/Api/Site/edit_info',
        onLoadCallback: function() {
            $.getJSON('/index.php/Api/Site/get_info', function(result) {
                $('form', SITE_INFO.DLG_ID).form('load', result);
            });
        }
    });
});