<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row :gutter="20">
      <el-col :span="9" style="min-width: 310px">
        <div class="ruleRepe">
          <ruleTable style=" position:relative;"></ruleTable>
        </div>
      </el-col>
      <el-col style="border: 1px solid lightgray;" :span ="15">
        <el-row style="margin-top: 10px">
          <el-tabs v-model="ruleTabs" tab-position="top">
            <el-tab-pane label="定制规则" name="rule">
              <div class="ruleDrag">
                <component :is="currentRule"></component>
              </div>
            </el-tab-pane>
            <el-tab-pane label="描述文件" name="xml">
              <meta-rule-xml></meta-rule-xml>
            </el-tab-pane>
          </el-tabs>
            <!-- <div class="ruleDrag">
              <div class="tabs">
                <button class="tab" style="display:inline-block;float: left"@click="toggleRule('ruleTable')"><a>绑定规则</a></button>
                <button class="tab" style="display:inline-block"@click="toggleRule('ruleXml')"><a>XML</a></button>

              </div>
              <component :is="currentRule"></component>
            </div> -->

          
          <br/>
        </el-row>
        <el-row>

          <!-- <div class="main-right tab">
            <div class="tabs">
              <button class="tab" style="display:inline-block;float: left"@click="toggleTab('cutTreeArea','ruleTable')"><a>Tree1</a></button>
              <button class="tab" style="display:inline-block"@click="toggleTab('cutTreeArea','ruleTable')"><a>Tree2</a></button>
            </div>

            <component :is="currentTree"></component>
          </div> -->
            <el-tabs v-model="treeTabs" tab-position="top" style="height:57px;">
                <el-tab-pane
                    :key="item.key"
                    v-for="(item,index) in treeTabsData"
                    :label="item.name">
                </el-tab-pane>
            </el-tabs>
            <component :is="currentTree"></component>

    <!--<drawTreeArea></drawTreeArea>-->
        </el-row>

        
    </el-col>
      <!--</el-row>-->
      </el-row>
  </div>
  </div>
</template>

<script type="text/javascript">
  import ruleTable from "../rule/ruleTable"
  import metaRuleXml from "./metaRuleXml"
  import {panelTitle} from 'components'
  import {relativeTree} from 'components'

  export default{
    data(){
      return {
        treeTabs:'0',
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
      ruleTable,
      relativeTree,
      metaRuleXml
    },
    methods:{
      toggleTab:function(tab,rule){
        this.currentTab = tab;
        this.currentRule =rule
      },
      toggleRule:function (tab) {
        this.currentRule = tab
      }
    }
  }
</script>
<style scoped lang="scss">
    .ruleRepe{
        //width: 100%;
        height: 825px;
        border: 1px solid lightgray;
        overflow: auto;
        //background-color:	#F5FFFA;
       // border-radius: 8px;
    }
    .ruleDrag{
      height: 300px;
      overflow: auto;
      border: 1px solid lightgray;
    }
</style>