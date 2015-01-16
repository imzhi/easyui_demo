;(function($, window, undefined) {

    $.extend($.fn.tree.defaults, {
        queryParams: {},
        loader: function(params, success, error) {
            var opts = $(this).tree('options');
            if (!opts.url) { return false; }
            if (opts.queryParams) { params = $.extend({}, opts.queryParams, params); }
            $.ajax({
                type: opts.method, url: opts.url, data: params, dataType: 'json',
                success: function(data) { success(data); },
                error: function() { error.apply(this, arguments); }
            });
        }
    });
    // setQueryParams()好像无效，待验证
    $.extend($.fn.tree.methods, {
        setQueryParams: function(jq, params) {
            return jq.each(function() { $(this).tree('options').queryParams = params; });
        }
    })

    $.extend({
        Show_Warning: function(msg, title) {
            $.messager.show({
                title: title || '提示', msg: msg,
                showType: 'slide',
            });
        },
        Show_Error: function(msg, title) {
            $.messager.alert(title || '错误', msg, 'error');
        },
        Close_Progress: function() { $.messager.progress('close'); },
        Open_Progress: function() { $.messager.progress(); },
        createRandNum: function(num) {
            return Math.random().toString().slice(-Math.abs(num));
        }
    });


    $.fn.extend({
        requestFullScreen: function() {
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    if (fullScreenApi.isFullScreen()) {
                        fullScreenApi.cancelFullScreen(this);
                    } else {
                        fullScreenApi.requestFullScreen(this);
                    }
                }
            });
        },
        serializeJSON: function() {
            var o = {};
            $(this.serializeArray()).each(function() { o[this.name] = this.value; });
            return o;
        },
        Destroy_Dialog: function() { return this.dialog('destroy'); },
        Center_Dialog: function() { return this.dialog('center'); },
        Reload_Datagrid: function() { return this.datagrid('reload'); },
        Get_Selected_Datagrid: function() { return this.datagrid('getSelected'); },
        Unselect_All_Datagrid: function() { return this.datagrid('unselectAll'); },
        Reload_Treegrid: function() { return this.treegrid('reload'); },
        Load_Treegrid: function(params) { return this.treegrid('load', params); },
        Get_Selected_Treegrid: function() { return this.treegrid('getSelected'); },
        Unselect_All_Treegrid: function() { return this.treegrid('unselectAll'); },
        Reload_Tree: function(target) {
            if (target) { return this.tree('reload', target); }
            return this.tree('reload');
        },
        Dialog: function(settings) {
            var self = this;
            var defaults = {
                // 默认属性
                title: '新窗口', width: 280, modal: true,
                collapsible: true, cache: false,
                // 新增属性
                selected: null,
                onBeforeLoadCallback: function() {},
                onLoadCallback: function() {},
                onBeforeOpenCallback: function() {},
                onOpenCallback: function() {},
                submitSuccess: function(result) {
                    $(self).Destroy_Dialog();
                    $.Show_Warning(result.info);
                },
                submitSuccessCallback: function() {},
                submitFailure: function(result) { $.Show_Error(result.info); },
                submitFailureCallback: function() {},
                buttonText: '保存',
                buttonIconCls: 'icon-save'
            };

            defaults['buttonFormSubmit'] = function() {
                $('form', self).form('submit', {
                    url: defaults.buttonUrl,
                    onSubmit: function() {
                        var isValid = $(self).form('validate');
                        if (!isValid) { $.Close_Progress(); }
                        return isValid;
                    },
                    success: function(res) {
                        $.Close_Progress();
                        var result = $.parseJSON(res);
                        if (1 === result.status) {
                            defaults.submitSuccess(result);
                            defaults.submitSuccessCallback();
                        } else {
                            defaults.submitFailure(result);
                            defaults.submitFailureCallback();
                        }
                    }
                });
            };
            defaults['buttonHandler'] = function() { defaults['buttonFormSubmit'](); };

            $.extend(defaults, settings);

            var options = $.extend({}, defaults, {
                onBeforeLoad: function() { defaults.onBeforeLoadCallback(); },
                onLoad: function() {
                    defaults.selected && $('form', self).form('load', defaults.selected);
                    defaults.onLoadCallback();
                    $(self).Center_Dialog();
                },
                onBeforeOpen: function() { defaults.onBeforeOpenCallback(); },
                onOpen: function() { defaults.onOpenCallback(); },
                onClose: function() { $(self).Destroy_Dialog(); },
                buttons: [{
                    text: defaults.buttonText, iconCls: defaults.buttonIconCls,
                    handler: defaults.buttonHandler
                }, {
                    text: '关闭', iconCls: 'icon-no',
                    handler: function() { $(self).Destroy_Dialog(); }
                }]
            }, settings);

            // 如留言板dialog则无href属性
            if (!defaults.href) { $(self).dialog(options); }
            else {
                $.post('Api/Auth/check_menu_auth', {
                    data: defaults.href.split('/').slice(-2).join('/')
                }, function(res) {
                    if (0 === res) {
                        $.messager.alert('错误', '未授权', 'error');
                        return false;
                    }
                    $(self).dialog(options);
                });
            }
        },

        Tree: function(settings) {
            var self = this;
            var defaults = {
                animate: true, lines: false,
                loader: function(params, success, error) {
                    var opts = $(this).tree('options');
                    if (!opts.url) { return false; }
                    if (opts.queryParams) {
                        params = $.extend({}, opts.queryParams, params);
                    }
                    $.ajax({
                        type: opts.method, url: opts.url, data: params,
                        dataType: 'json',
                        success: function(data) { success(data); },
                        error: function() { error.apply(this, arguments); }
                    });
                }
            };
            var options = $.extend({}, defaults, settings);
            $(self).tree(options);
        },
        Combobox: function(settings) {
            var self = this;
            var defaults = {
                valueField: 'id', textField: 'value', groupField: null,
                editable: false, required: true, panelHeight: 'auto'
            };
            var options = $.extend({}, defaults, settings);
            $(self).combobox(options);
        },
        Treegrid: function(settings) {
            var self = this;
            var defaults = {
                fit: true, rownumbers: true, border: false,
                singleSelect: true, animate: true, method: 'post',
            };
            var options = $.extend({}, defaults, settings);
            $(self).treegrid(options);
        },
        Datagrid: function(settings) {
            var self = this;
            var defaults = {
                border: false, fit: true, rownumbers: true,
                singleSelect: true, idField: 'id', method: 'post', pagination: true,
                pageList: window.CONSTANTS.PAGELIST,
                pageSize: window.CONSTANTS.PAGESIZE
            };
            var options = $.extend({}, defaults, settings);
            $(self).datagrid(options);
        },
        Combogrid: function(settings) {
            var self = this;
            var defaults = {
                editable: false, idField: 'id', textField: 'value',
                pagination: true, required: true,
                pageList: window.CONSTANTS.PAGELIST,
                pageSize: window.CONSTANTS.PAGESIZE,
            };
            var options = $.extend({}, defaults, settings);
            $(self).combogrid(options);
        },
        Combotree: function(settings) {
            var self = this;
            var defaults = {
                editable: false, lines: true, animate: true,
                required: true, panelHeight: 'auto'
            };
            var options = $.extend({}, defaults, settings);
            $(self).combotree(options);
        },
    });



    /**
     * validatebox规则扩展
     */
    $.extend($.fn.validatebox.defaults.rules, {
        equals: {
            validator: function(value, param) { return value == $(param[0]).val(); },
            message: '数据不一致'
        },
        minLength: {
            validator: function(value, param) { return value.length >= param[0]; },
            message: '请最少输入{0}个字符'
        },
        maxLength: {
            validator: function(value, param) { return value.length <= param[0]; },
            message: '请最多输入{0}个字符'
        },
        equalLength: {
            validator: function(value, param) { return value.length == param[0]; },
            message: '请输入{0}个字符'
        },
        isPassword: {
            validator: function(value, param) {
                return value.length >= 4 && value.length <= 20 && false !== value.indexOf(' ');
            },
            message: '密码在4-20位之间，且不能包含空格'
        },
        isSimplePassword: {
            validator: function(value, param) { return true; },
            message: '密码不能过于简单'
        },
        isUsername: {
            validator: function(value, param) { return /[a-z0-9]{2,20}/i.test(value); },
            message: '用户名在2-20位之间，由字母或者数字组成'
        },
        isBirthday: {
            validator: function(value, param) { return /\d{4}-\d{2}-\d{2}/.test(value) },
            message: '生日填写无效。填写格式为1990-05-11'
        }
    });
})(jQuery, window, undefined);