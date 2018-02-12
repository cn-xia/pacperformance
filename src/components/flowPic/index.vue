
<template>
  <section>
        <el-row>
            <el-radio-group v-model="radio" @change="changeLevel">
                <el-radio :label="1">一级流程</el-radio>
                <el-radio :label="2">二级流程</el-radio>
            </el-radio-group>
        </el-row>
        <el-row>
            <div id="myDiagramDiv" class="Diagram">
            </div>
        </el-row>
  </section>   
</template>
<script>
import go from "gojs"
import {addRoundedRectangle} from '../../common/tools/RoundedRectangle.js'

var myDiagram; 
var $;
export default {
  name:"flowPic",
  data(){
      return{
          radio:1,
          
      }
  },
  components:{

  },
  methods:{
      changeLevel(label){
          var model = $(go.GraphLinksModel);
          if(label==1){
              model.nodeDataArray=[
                  { key: 1, header: "组织货品", text: "Confirm AccessRules", footer: "商家", role: "t" },
                  { key: 2, header: "促销活动", text: "More", footer: "商家", role: "t" },
                  { key: 3, header: "交易", text: "More", footer: "买家 商家", role: "t" },
                  { key: 4, header: "资金结算", text: "shopCheck", footer: "线下门店", role: "t" },
              ];
              model.linkDataArray= 
              [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 3, to: 4 },      
              ];
          }
          if(label==2){
              model.nodeDataArray=[
                { key: 1, header: "组织货品", text: "Confirm AccessRules", footer: "商家", role: "t" },
                { key: 2, header: "促销活动", isGroup: true, footer: "商家", role: "t" },
                { key: 3, header: "商品发布准备", text: "Rule check", footer: "商家", role: "t", group: 2 },
                { key: 4, header: "商品发布", text: "Commodity release", footer: "商家", role: "t", group: 2 },
                { key: 5, header: "交易", isGroup: true, footer: "买家 商家", role: "t" },
                { key: 6, header: "商品下单", text: "Order", footer: "买家", role: "t", group: 5 },
                { key: 7, header: "发货", text: "human task", footer: "商家", role: "t", group: 5 },
                { key: 8, header: "发码", text: "human task", footer: "码池 码商", role: "t", group: 5 },
                { key: 9, header: "资金结算", text: "shopCheck", footer: "线下门店", role: "t" },
              ];
              model.linkDataArray= [
                { from: 1, to: 2 },
                { from: 3, to: 4 },
                { from: 2, to: 5 },
                { from: 6, to: 7 },
                { from: 7, to: 8 },
                { from: 5, to: 9 },     
              ];
          }
          myDiagram.model = model;
      },
      init(){
            addRoundedRectangle(go);
            $ = go.GraphObject.make;
            myDiagram =
                $(go.Diagram, "myDiagramDiv",
                 {
                  initialContentAlignment: go.Spot.Center,
                  layout: $(go.TreeLayout, { setsPortSpot: false, setsChildPortSpot: false })
                });
            myDiagram.nodeTemplate =
                $(go.Node, "Vertical",
                    { defaultStretch: go.GraphObject.Horizontal },
                    { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
                    $(go.Panel, "Auto",
                        $(go.Shape, "RoundedTopRectangle",
                            { fill: "white" },
                            new go.Binding("fill", "role", function(r) { return r[0] === 't' ? "lightgray" : "white"; })),
                        $(go.TextBlock,
                            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                            new go.Binding("text", "header"))
                    ),
                    $(go.Panel, "Auto",
                        { minSize: new go.Size(NaN, 60) },
                        $(go.Shape, "Rectangle", { fill: "white" }),
                        $(go.TextBlock,
                            { width: 120 },
                            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                            new go.Binding("text", "text"))
                    ),
                    $(go.Panel, "Auto",
                        $(go.Shape, "RoundedBottomRectangle",
                            { fill: "white" },
                            new go.Binding("fill", "role", function(r) { return r[0] === 'b' ? "lightgray" : "white"; })),
                        $(go.TextBlock,
                            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                            new go.Binding("text", "footer"))
                    )
                );
            myDiagram.groupTemplate =
                $(go.Group, "Vertical",
                    { layout: $(go.TreeLayout, { setsPortSpot: false, setsChildPortSpot: false }) },
                    { defaultStretch: go.GraphObject.Horizontal },
                    { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
                    $(go.Panel, "Auto",
                        $(go.Shape, "RoundedTopRectangle",
                            { fill: "white" },
                            new go.Binding("fill", "role", function(r) { return r[0] === 't' ? "lightgray" : "white"; })),
                        $(go.TextBlock,
                            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                            new go.Binding("text", "header"))
                    ),
                    $(go.Panel, "Auto",
                        $(go.Shape, { fill: "white" }),
                        $(go.Placeholder, { padding: 15 }),
        
                    ),
                    $(go.Panel, "Auto",
                        $(go.Shape, "RoundedBottomRectangle",
                            { fill: "white" },
                            new go.Binding("fill", "role", function(r) { return r[0] === 'b' ? "lightgray" : "white"; })),
                        $(go.TextBlock,
                            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
                            new go.Binding("text", "footer"))
                    )
                );
            myDiagram.linkTemplate =
                $(go.Link,
                    { routing: go.Link.Orthogonal, corner: 5 },
                    $(go.Shape),
                    $(go.Shape, { toArrow: "Triangle"})
                );
            //this.load();
            this.changeLevel(1);
      },
      load(){
            myDiagram.model = new go.GraphLinksModel([
                { key: 1, header: "组织货品", text: "Confirm AccessRules", footer: "商家", role: "t" },
                { key: 2, header: "促销活动", isGroup: true, footer: "商家", role: "t" },
                { key: 3, header: "商品发布准备", text: "Rule check", footer: "商家", role: "t", group: 2 },
                { key: 4, header: "商品发布", text: "Commodity release", footer: "商家", role: "t", group: 2 },
                { key: 5, header: "交易", isGroup: true, footer: "商家 买家", role: "t" },
                { key: 6, header: "商品下单", text: "Order", footer: "买家", role: "t", group: 5 },
                { key: 7, header: "发货", text: "human task", footer: "商家", role: "t", group: 5 },
                { key: 8, header: "发码", text: "human task", footer: "码池 码商", role: "t", group: 5 },
                { key: 9, header: "资金结算", text: "shopCheck", footer: "线下门店", role: "t" },

                ], [
                { from: 1, to: 2 },
                { from: 3, to: 4 },
                { from: 2, to: 5 },
                { from: 6, to: 7 },
                { from: 7, to: 8 },
                { from: 5, to: 9 },
                
            ]);
      }
  },
  mounted:function(){
      this.init();
  }
}
</script>
<style scoped lang="scss">
    .Diagram{
        width: 100%;
        height: 280px;
        border: 1px solid lightgray;
        //background-color:	#F5FFFA;
       // border-radius: 8px;
    }
    .el-row{
        margin-bottom: 10px;
    }
</style>