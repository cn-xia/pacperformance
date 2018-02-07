<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row :gutter="300">
      <el-col :span="8">
        <div style=" width:100%;height:100%; border: 1px solid lightgray">
        <ruleTable></ruleTable>
        </div>
      </el-col>
      <el-col :span ="8">
        <el-row :gutter="500">

<drawTreeArea></drawTreeArea>
        </el-row>
      <br/>
        <el-row :gutter="500">
          <div style=" width:100%;height:100%; border: 1px solid lightgray">

          <ruleTable></ruleTable>
          </div>
        </el-row>
    </el-col>
      </el-row>

    </div>
  </div>
</template>
<style>
  el-col{
    overflow:auto; ;
  }
</style>
<script type="text/javascript">
  import ruleTable from "../rule/ruleTable"
  import {panelTitle} from 'components'
  import {drawTreeArea} from 'components'

  export default{
    data(){
      return {
        msg: 'metaModel page'
      }
    },
    components: {
      panelTitle,
      ruleTable,
      drawTreeArea
    }
  }
</script>
