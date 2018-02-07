<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row :gutter="20">
      <el-col :span="8" style="min-width: 310px">
        <div >
        <ruleTable style=" position:relative;"></ruleTable>
        </div>
      </el-col>
      <el-col style="border: 1px solid lightgray;padding: 10px" :span ="12">
        <el-row  :gutter="0">

          <div class="main-right tab">
            <div class="tabs">
              <button class="tab" style="display:inline-block;float: left"@click="toggleTab('drawTreeArea','ruleTable')"><a>Tree1</a></button>
              <button class="tab" style="display:inline-block"@click="toggleTab('drawTreeArea','ruleTable')"><a>Tree2</a></button>
            </div>

            <component :is="currentTree"></component>
          </div>

    <!--<drawTreeArea></drawTreeArea>-->
        </el-row>

        <el-row style="margin-top: 10px" :gutter="0">
          <div >
            <div class="main-right tab">
              <div class="tabs">
                <button class="tab" style="display:inline-block;float: left"@click="toggleRule('ruleTable')"><a>绑定规则</a></button>
                <button class="tab" style="display:inline-block"@click="toggleRule('ruleXml')"><a>XML</a></button>

              </div>
              <component :is="currentRule"></component>
            </div>

          </div>
          <br/>
        </el-row>
    </el-col>
      <!--</el-row>-->
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
  import ruleXml from "./ruleXml"
  import {panelTitle} from 'components'
  import {drawTreeArea} from 'components'

  export default{
    data(){
      return {
        msg: 'metaModel page',
        currentTree:drawTreeArea,
        currentRule:ruleTable
      }
    },
    components: {
      panelTitle,
      ruleTable,
      drawTreeArea,
      ruleXml
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
