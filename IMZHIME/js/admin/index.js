var INDEX = {
    LEFT_NAV_TREE_ID: '#left_nav_tree',
    TABS_ID: '#index_tabs'
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
            console.log($(INDEX.LEFT_NAV_TREE_ID).tree('isLeaf', node.target));
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