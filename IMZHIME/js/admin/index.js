var INDEX = {
    LEFT_NAV_TREE_ID: '#left_nav_tree',
    TABS_ID: '#index_tabs',
    new_tab_view: function() {},
    full_screen_view: function() {},
    expand_view: function() {},
    close_tab: function() {
        var self = this;
        var $index_tabs = $(INDEX.TABS_ID);
        $index_tabs.tabs('close', $index_tabs.tabs('getTabIndex', $index_tabs.tabs('getSelected')));
    },
    close_other_tabs: function() {
        var self = this;
        var $index_tabs = $(INDEX.TABS_ID);

        var all_tabs = $index_tabs.tabs('tabs');
        var count = all_tabs.length;

        var curr_tab = $index_tabs.tabs('getSelected');
        var curr_index = $index_tabs.tabs('getTabIndex', curr_tab);
        var curr_title = $index_tabs.tabs('getTab', curr_index).panel('options').title;
        while (count--) {
            if (count !== curr_index && $index_tabs.tabs('getTab', count).panel('options').closable) {
                $index_tabs.tabs('close', count);
            }
        }
        $index_tabs.tabs('select', curr_title);
    },
    close_all_tabs: function() {
        var self = this;
        var $index_tabs = $(INDEX.TABS_ID);
        var all_tabs = $index_tabs.tabs('tabs');
        var count = all_tabs.length;
        while(count--) {
            if ($index_tabs.tabs('getTab', count).panel('options').closable) {
                $index_tabs.tabs('close', count);
            }
        }
    }
};

$(function() {
    $(INDEX.LEFT_NAV_TREE_ID).tree({
        animate: true,
        lines: true,
        url: '/index.php/Api/Menu/get_tree_menus',
        loadFilter: function(data) {
            return data;
        },
        onClick: function(node) {
            var $index_left_nav_tree = $(INDEX.LEFT_NAV_TREE_ID);
            if (!$index_left_nav_tree.tree('isLeaf', node.target)) {
                $index_left_nav_tree.tree('toggle', node.target);
            } else if (node.attributes) {
                if (node.attributes.type === 'tab') {
                    var $index_tabs = $(INDEX.TABS_ID);
                    if ($index_tabs.tabs('exists', node.text)) {
                        $index_tabs.tabs('select', node.text);
                    } else {
                        $index_tabs.tabs('add', {
                            title: node.text,
                            iconCls: 'icon-help',
                            href: node.attributes.url,
                            closable: true,
                            tools: [{
                                iconCls: 'icon-mini-refresh',
                                handler: function() {
                                    var curr_tab = $index_tabs.tabs('getTab', node.text).panel('refresh', node.attributes.url);
                                    // console.log($index_tabs.tabs('getSelected'));
                                }
                            }]
                        });
                    }
                }
            }
        }
    });
});