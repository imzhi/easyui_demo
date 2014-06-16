;(function($) {
    $.extend({
        Show_Warning: function(msg, title) {
            $.messager.show({
                title: title || '提示',
                iconCls: 'icon-help',
                msg: msg,
                showType: 'slide',
            });
        },
        Show_Error: function(msg, title) {
            $.messager.alert(title || '错误', msg, 'error');
        },
        Close_Progress: function() {
            $.messager.progress('close');
        },
        Open_Progress: function() {
            $.messager.progress();
        },
        createRandNum: function(num) {
            return Math.random().toString().slice(-Math.abs(num));
        }
    });
    $.fn.extend({
        serializeJSON: function() {
            var o = {};
            $(this.serializeArray()).each(function() {
                o[this.name] = this.value;
            });
            return o;
        },
        Destroy_Dialog: function() {
            return this.dialog('destroy');
        },
        Center_Dialog: function() {
            return this.dialog('center');
        },
        Reload_Datagrid: function() {
            return this.datagrid('reload');
        },
        Get_Selected_Datagrid: function() {
            return this.datagrid('getSelected');
        },
        Unselect_All_Datagrid: function() {
            return this.datagrid('unselectAll');
        },
        Reload_Treegrid: function() {
            return this.treegrid('reload');
        },
        Get_Selected_Treegrid: function() {
            return this.treegrid('getSelected');
        },
        Unselect_All_Treegrid: function() {
            return this.treegrid('unselectAll');
        }
    });

    /**
     * validatebox规则扩展
     */
    $.extend($.fn.validatebox.defaults.rules, {
        equals: {
            validator: function(value, param) {
                return value == $(param[0]).val();
            },
            message: '数据不一致'
        },
        minLength: {
            validator: function(value, param) {
                return value.length >= param[0];
            },
            message: '请最少输入{0}个字符'
        },
        maxLength: {
            validator: function(value, param) {
                return value.length <= param[0];
            },
            message: '请最多输入{0}个字符'
        },
        equalLength: {
            validator: function(value, param) {
                return value.length == param[0];
            },
            message: '请输入{0}个字符'
        },
        isPassword: {
            validator: function(value, param) {
                return value.length >= 4 && value.length <= 20 && false !== value.indexOf(' ');
            },
            message: '密码在4-20位之间，且不能包含空格'
        },
        isSimplePassword: {
            validator: function(value, param) {
                return true;
            },
            message: '密码不能过于简单'
        },
        isUsername: {
            validator: function(value, param) {
                return /[a-z0-9]{2,20}/i.test(value);
            },
            message: '用户名在2-20位之间，由字母或者数字组成'
        },
        isBirthday: {
            validator: function(value, param) {
                return /\d{4}-\d{2}-\d{2}/.test(value)
            },
            message: '生日填写无效。填写格式为1990-05-11'
        }
    });
})(jQuery);

window.CONSTANTS = {
    PAGELIST: [10, 20,50,100],
    PAGESIZE: 20,
};