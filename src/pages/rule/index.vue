<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row :gutter="20">

        <el-col :span="14" :offset="3">
          <el-tabs v-model="ruleTabs" tab-position="top">
              <el-tab-pane label="组织货品" name="organize"></el-tab-pane>
              <el-tab-pane label="商品发布准备" name="release"></el-tab-pane>
          </el-tabs>
          <div class="rule" >
            <!-- <div class="main-right tab">
              <div class="tabs">
                <button class="tab" style="display:inline-block;float: left"@click="toggleTab('ruleTable')"><a>组织货品</a></button>
                <button class="tab" style="display:inline-block"@click="toggleTab('ruleTable')"><a>商品发布准备</a></button>

              </div>
            <component :is="currentTab"></component>
            </div> -->
            <component :is="currentTab"></component>
            
          </div>

          <!--<div v-for="(list,index) in lists" class="rule v-col&#45;&#45;auto">-->
            <!--<div class="panel">-->
              <!--<div class="panel__body">-->
                <!--<vddl-list    class="panel__body&#45;&#45;list"-->
                           <!--:list="list" :horizontal="true">-->
                  <!--&lt;!&ndash;<vddl-draggable class="panel__body&#45;&#45;item"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:draggable="rule.subject"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:index="index"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:wrapper="rule"&ndash;&gt;-->
                                  <!--&lt;!&ndash;effect-allowed="move">&ndash;&gt;-->
                   <!--&lt;!&ndash;<span contenteditable class="ruleBolck subject">&ndash;&gt;-->
        <!--&lt;!&ndash;{{item.subject}}</span>&ndash;&gt;-->
                  <!--&lt;!&ndash;</vddl-draggable>&ndash;&gt;-->
                  <!--<vddl-draggable class="ruleBolck subject panel__body&#45;&#45;item"-->
                                  <!--v-for="(item, index) in list" :key="item.id"-->
                                  <!--:draggable="item"-->
                                  <!--:index="index"-->
                                  <!--effect-allowed="move">-->
                   <!--{{item.label}}-->
                  <!--</vddl-draggable>-->
                  <!--<vddl-draggable class="ruleBolck subject panel__body&#45;&#45;item"-->
                                  <!--v-for="(item, index) in list" :key="item.id"-->
                                  <!--:draggable="item"-->
                                  <!--:index="index"-->
                                  <!--effect-allowed="move">-->
                    <!--{{item.ab}}-->
                  <!--</vddl-draggable>-->
                  <!--<vddl-placeholder class="red">Custom placeholder</vddl-placeholder>-->
                <!--</vddl-list>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

        </el-col>
        <el-col  :span="5" >
          <br/><br/><br/>
          <smalblock ></smalblock>

          <!--<div v-for="(list, listName) in lists" class="v-col&#45;&#45;auto">-->
            <!--<div class="panel">-->
              <!--<div class="panel__heading">-->
                <!--<h3>List {{listName}}</h3>-->
              <!--</div>-->
              <!--<div class="panel__body">-->
                <!--<vddl-list class="panel__body&#45;&#45;list" :list="list" :horizontal="false">-->
                  <!--<vddl-draggable class="panel__body&#45;&#45;item" v-for="(item, index) in list" :key="item.id"-->
                                  <!--:draggable="item"-->
                                  <!--:index="index"-->
                                  <!--:wrapper="list"-->
                                  <!--effect-allowed="move">-->
                    <!--{{item.label}}-->
                  <!--</vddl-draggable>-->
                  <!--<vddl-placeholder class="red">Custom placeholder</vddl-placeholder>-->
                <!--</vddl-list>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </el-col>

      </el-row>

    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import "./ruleColor.css";
  import rules from "./rules"
  import ruleblock from "./ruleblock"
  import smalblock from "./smalblock"
  import ruleTable from "./ruleTable"
  export default{
    data(){
      return{
        ruleTabs:'organize',
        "lists": {
          "A": [
            {
              "id": 1,
              "label": "Item A1",
              "ab":"aaaaa"
            },
            {
              "id": 2,
              "label": "Item A2"
            },
            //...
          ],
          "B": [{
            "id": 3,
            "label": "Item A2"
          },{
            "id": 4,
            "label": "Item A2"
          }
            //...
          ]
        },
        rules:[

        ],
        currentTab:ruleTable
      }},
    mounted:function(){
      this.getData()
    },
    methods:{
      getData:function () {
        this.rules=rules.rules
        this.slots = rules.rules
      },
      toggleTab:function(tab){
        this.currentTab = tab;

      },

    },
    directives: {
      draggable: {
        bind: function (el) {
          el.style.position = 'absolute';
          var startX, startY, initialMouseX, initialMouseY;

          function mousemove(e) {
            var dx = e.clientX - initialMouseX;
            var dy = e.clientY - initialMouseY;
            el.style.top = startY + dy + 'px';
            el.style.left = startX + dx + 'px';
            return false;
          }

          function mouseup() {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
          }

          el.addEventListener('mousedown', function (e) {
            startX = el.offsetLeft;
            startY = el.offsetTop;
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);
            return false;
          });
        }

      }
    },
    components: {
      panelTitle,
      ruleblock,
      ruleTable,
      smalblock



    }
  }
</script>
<style  lang="scss">
    .rule{
        width: 100%;
        height: 558px;
        border: 1px solid lightgray;
        //background-color:	#F5FFFA;
       // border-radius: 8px;
        overflow: auto;
    }
  .tabs{
    overflow: hidden;

    border: 1px solid lightgray;
    background-color: #f1f1f1;
  }
    .tabs .tab {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 15px;
    }
    .tab .tab:hover {
      background-color: #ddd;
    }
    .tab .tab.active {
      background-color: #ccc;
    }
</style>
