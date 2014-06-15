<?php
class DataAction extends CommonAction {
    public function _initialize() {
        parent::_initialize();
        if (!$this->isAjax()) {
            exit('not access');
        }
    }

    public function combobox_themes() {
        combobox_return(array(
            'Base' => array(
                'default' => 'Default',
                'bootstrap' => 'Bootstrap',
                'gray' => 'Gray',
                'black' => 'Black',
                'metro' => 'Metro',
            ),
            'Metro' => array(
                'metro-blue'   => 'Blue',
                'metro-gray'   => 'Gray',
                'metro-green'  => 'Green',
                'metro-orange' => 'Orange',
                'metro-red'    => 'Red',
            ),
            'UI' => array(
                'ui-cupertino'      => 'Cupertino',
                'ui-dark-hive'      => 'Dark Hive',
                'ui-pepper-grinder' => 'Pepper Grinder',
                'ui-sunny'          => 'Sunny',
            ),
        ));
    }
}