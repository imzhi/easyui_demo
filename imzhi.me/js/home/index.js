// 红色：#E51400
// 绿色：#339933
// 蓝色：#1BA1E2
// 橙色：#F09609
// 草绿：#8CBF26
// 湖蓝：#00ABA9
// 洋红：#FF0097
// 粉色：#E671B8
// 棕色：#996600
// 紫色：#A200FF

$(function() {

    var dump = function(content) {
        console.log(content);
    };

    var $body = $('body');
    var $box = $('.boxes .box');
    // console.log($('.box').width());
    var row_num = Math.floor($body.width() / $box.width());
    var metro_colors = ['#E51400', '#339933', '#1BA1E2', '#F09609', '#8CBF26', '#00ABA9', '#FF0097', '#E671B8', '#996600', '#A200FF'];
    var old_arr = [];
    var new_arr = [];
    var fill_color_arr = [];
    $box.each(function(i) {
        // console.log(i / row_num, fill_color_arr[0]);

        var first_layer = Math.floor(i / row_num);
        var second_layer = i % 10;

        var curr_color = metro_colors[second_layer];

        if (!fill_color_arr[first_layer]) {
            fill_color_arr[first_layer] = [];
        }

        if (first_layer) {
            // 和当前块的颜色与上面块的颜色相同的情况
            if (fill_color_arr[first_layer - 1][second_layer] === curr_color) {
                curr_color = metro_colors[++i % 10];
            }
        }
        fill_color_arr[first_layer][second_layer] = curr_color;
        $(this).css('backgroundColor', curr_color);
    });
    dump(fill_color_arr);

});
