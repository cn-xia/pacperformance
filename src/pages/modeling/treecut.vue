<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button type="primary" icon="check" size="small">保存</el-button>
    </panel-title>
    <div class="panel-body">
      <el-row :gutter="5">
        <el-col :span="5">
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
        <el-col :span=19>
            <cutTreeArea></cutTreeArea>
          </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle,cutTreeArea} from 'components'

  export default{
    data(){
      return {
        treeData:[{
          name:"第一棵树"
        },{
          name:"第二棵树"
        },{
          name:"第三棵树"
        }]
      }
    },
    components: {
      panelTitle,
      cutTreeArea
    },
    methods:{
      handleCurrentChange(val){
        this.currentRow=val;
        //console.log(this.currentRow);
      }
    }
  }
</script>