<template>
    <div class="panel">
      <panel-title :title="$route.meta.title">
        <el-button type="primary" icon="check" size="small">保存</el-button>
        <el-button type="primary" icon="delete" size="small">删除</el-button>
        <el-button type="primary" icon="plus" size="small">添加</el-button>
      </panel-title>
      <div class="panel-body">
        <el-row :gutter="5">
          <el-col :span=19>
            <drawTreeArea></drawTreeArea>
          </el-col>
          <el-col :span=5>
            <el-table
              :data="treeData"
              style="width:100%"
              height="560"
              highlight-current-row
              @current-change="handleCurrentChange">
              <el-table-column
                type="index"
                align="center"
                width="50">
              </el-table-column>
              <el-table-column
                prop="name"
                label="特征树"
                align="center">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        
      </div>
    </div>
  
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import {drawTreeArea} from 'components'
  export default{
    data(){
      return {
        currentRow: null,
        treeData:[{
          name:"商家实体树"
        },{
          name:"商品实体树"
        },{
          name:"订单实体树"
        }]
      }
    },
    components: {
      panelTitle,
      drawTreeArea
    },
    methods:{
      handleCurrentChange(val){
        this.currentRow=val;
        //console.log(this.currentRow);
      }
    }
  }
</script>
