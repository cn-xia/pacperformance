<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row :gutter="10">
        <el-col :span="6"> 
          <div class="ruleBox">
            {{msg}}
          </div>
        </el-col>
        <el-col :span="18">
          <div class="ruleBox">
            {{msg}}
          </div>
        </el-col>
      </el-row>
        
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        msg: 'rule page'
      }
    },
    components: {
      panelTitle
    }
  }
</script>
<style scoped lang="scss">
    .ruleBox{
        width: 100%;
        height: 558px;
        border: 1px solid lightgray;
        //background-color:	#F5FFFA;
       // border-radius: 8px;
    }
</style>