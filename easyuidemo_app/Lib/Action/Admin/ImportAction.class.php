<?php
class ImportAction extends Action
{
    public function allDb()
    {
        $contents = file_get_contents('./scheme/easyui_demo.sql');
        if (!$contents) $this->error('出错了');
        $sql_arr = explode(';', $contents);
        foreach ($sql_arr as $sql)
        {
            if(trim($sql))
            {
                $result = M()->query(trim($sql));
                if (false === $result)
                {
                    $this->error('出错了');
                }
            }
        }
        $this->success('成功导入数据表，正在跳转回去...', '/', 3);
    }
}