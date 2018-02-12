<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row>
        <div>
          <flowPic></flowPic>
        </div>
      </el-row>
      <el-row :gutter="5">
          <el-col :span=14>
              <el-tabs v-model="treeTabs" tab-position="top" style="height:57px;">
                  <el-tab-pane
                      :key="item.key"
                      v-for="(item,index) in treeTabsData"
                      :label="item.name">
                  </el-tab-pane>
              </el-tabs>
              <component :is="currentTree"></component>
          </el-col>
          <el-col :span=10>
            <el-tabs v-model="ruleTabs" tab-position="top">
              <el-tab-pane label="规则" name="rule">
                <div class="rule">
                  <component :is="currentRule"></component>
                </div>
              </el-tab-pane>
              <el-tab-pane label="描述文件" name="xml">
                <rule-xml></rule-xml>
              </el-tab-pane>
            </el-tabs>
            
          </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import ruleTable from "../rule/ruleTable"
  import {panelTitle} from 'components'
  import ruleXml from "./ruleXml"
  import {flowPic} from 'components'
  import {relativeTree} from 'components'
  export default{
    data(){
      return {
        treeTabs:'1',
        ruleTabs:'rule',
        currentTree:relativeTree,
        currentRule:ruleTable,
        treeTabsData:[{
            key:'1',
            name:'商家实体树'
        },{
            key:'2',
            name:'商品实体树'
        },{
            key:'3',
            name:'订单实体树'
        }]
      }
    },
    components: {
      panelTitle,
      flowPic,
      relativeTree,
      ruleTable,
      ruleXml
    }
  }
</script>
<style scoped lang="scss">
    .rule{
        width: 100%;
        height: 380px;
        border: 1px solid lightgray;
        overflow: auto;
        //background-color:	#F5FFFA;
       // border-radius: 8px;
    }
</style>