<template>
    <section style="display: flex;justify-content: space-between;">
        <div id="relativeDiagramDiv" class="Diagram">

        </div>
    </section>
</template>
<script>
import go from "gojs"
import treedata from "../../assets/data/treedata2.json"
var relativeDiagram;
export default {
    name:"relativeTree",
    data() {
        return{

        }
    },
    components:{
        
    },
    methods:{
        init(){
            var $ = go.GraphObject.make;
            relativeDiagram =
                $(go.Diagram, "relativeDiagramDiv",
                {
                    allowCopy: false,
                    initialContentAlignment: go.Spot.Center,
                    layout:
                    $(go.LayeredDigraphLayout,
                        {
                        setsPortSpots: false,  // Links already know their fromSpot and toSpot
                        direction: 90,
                        columnSpacing: 5,
                        isInitial: true,
                        isOngoing: true
                        }),
                    validCycle: go.Diagram.CycleNotDirected,
                    "undoManager.isEnabled": true
                });
            /* relativeDiagram.addDiagramListener("Modified", function(e) {
                var button = document.getElementById("SaveButton");
                if (button) button.disabled = !relativeDiagram.isModified;
                var idx = document.title.indexOf("*");
                if (relativeDiagram.isModified) {
                if (idx < 0) document.title += "*";
                } else {
                if (idx >= 0) document.title = document.title.substr(0, idx);
                }
            }); */
            var graygrad = $(go.Brush, "Linear",
                       { 0: "white", 0.1: "whitesmoke", 0.9: "whitesmoke", 1: "lightgray" });
            relativeDiagram.nodeTemplate =  // the default node template
                $(go.Node, "Spot",
                { selectionAdorned: false, textEditable: true, locationObjectName: "BODY" },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                // the main body consists of a Rectangle surrounding the text
                $(go.Panel, "Auto",
                    { name: "BODY" },
                    $(go.Shape, "Rectangle",
                    { fill: graygrad, stroke: "gray", minSize: new go.Size(110, 35) },
                    new go.Binding("fill", "isSelected", function(s) { return s ? "AliceBlue" : graygrad; }).ofObject()),
                    $(go.TextBlock,
                    { stroke: "black", font: "13px sans-serif", editable: true,
                        margin: new go.Margin(3, 3+4, 3, 3+4), alignment: go.Spot.Center },
                    new go.Binding("text").makeTwoWay())
                ),
                // output port
                $(go.Panel, "Auto",
                    { alignment: go.Spot.Bottom, portId: "from", fromLinkable: true, cursor: "pointer", click: addNodeAndLink },
                    /* $(go.Shape, "Circle",
                    { width: 4, height: 4, fill: "white", stroke: "dodgerblue", strokeWidth: 3 }), */
                    /* $(go.Shape, "PlusLine",
                    { width: 11, height: 11, fill: null, stroke: "dodgerblue", strokeWidth: 3 }) */
                ),
                // input port
                $(go.Panel, "Auto",
                    { alignment: go.Spot.Top, portId: "to", toLinkable: true ,cursor: "pointer"},
                    $(go.Shape, "Circle",
                    { width: 8, height: 8, fill: "white", stroke: "gray" }),
                    $(go.Shape, "Circle",
                    { width: 4, height: 4, fill: "dodgerblue", stroke: null })
                )
                );
            relativeDiagram.nodeTemplate.contextMenu =
                $(go.Adornment, "Vertical",
                $("ContextMenuButton",
                    $(go.TextBlock, "Rename"),
                    { click: function(e, obj) { e.diagram.commandHandler.editTextBlock(); } },
                    new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canEditTextBlock(); }).ofObject()),
                // add one for Editing...
                $("ContextMenuButton",
                    $(go.TextBlock, "Delete"),
                    { click: function(e, obj) { e.diagram.commandHandler.deleteSelection(); } },
                    new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canDeleteSelection(); }).ofObject())
                );
            
            relativeDiagram.nodeTemplateMap.add("Loading",
                $(go.Node, "Spot",
                { selectionAdorned: false, textEditable: true, locationObjectName: "BODY" },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                // the main body consists of a Rectangle surrounding the text
                $(go.Panel, "Auto",
                    { name: "BODY" },
                    $(go.Shape, "Rectangle",
                    { fill: graygrad, stroke: "gray", minSize: new go.Size(110, 35) },
                    new go.Binding("fill", "isSelected", function(s) { return s ? "AliceBlue" : graygrad; }).ofObject()),
                    $(go.TextBlock,
                    { stroke: "black", font: "13px sans-serif", editable: true,
                        margin: new go.Margin(3, 3+4, 3, 3+4), alignment: go.Spot.Center },
                    new go.Binding("text", "text"))
                ),
                // output port
                $(go.Panel, "Auto",
                    { alignment: go.Spot.Bottom, portId: "from", fromLinkable: true, click: addNodeAndLink },
                    /* $(go.Shape, "Circle",
                    { width: 18, height: 18, fill: "white", stroke: "dodgerblue", strokeWidth: 3 }),
                    $(go.Shape, "PlusLine",
                    { width: 11, height: 11, fill: null, stroke: "dodgerblue", strokeWidth: 3 }) */
                )
                ));

            relativeDiagram.nodeTemplateMap.add("Recycle",
                $(go.Node, "Auto",
                { portId: "to", toLinkable: true, deletable: false,
                    layerName: "Background", locationSpot: go.Spot.Center },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                { dragComputation: function(node, pt, gridpt) { return pt; } },
                { mouseDrop: function(e, obj) { relativeDiagram.commandHandler.deleteSelection(); } },
                $(go.Shape,
                    { fill: "lightgray", stroke: "gray" ,figure:"Database",width:60}),
                $(go.TextBlock, "回收站",
                    { margin: 5, textAlign: "center"})
                ));
            
            function addNodeAndLink(e, obj) {
                var fromNode = obj.part;
                var diagram = fromNode.diagram;
                diagram.startTransaction("Add State");
                // get the node data for which the user clicked the button
                var fromData = fromNode.data;
                // create a new "State" data object, positioned off to the right of the fromNode
                var p = fromNode.location.copy();
                p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;
                var toData = {
                text: "new",
                loc: go.Point.stringify(p)
                };
                // add the new node data to the model
                var model = diagram.model;
                model.addNodeData(toData);
                // create a link data from the old node data to the new node data
                var linkdata = {
                from: model.getKeyForNodeData(fromData),
                to: model.getKeyForNodeData(toData)
                };
                // and add the link data to the model
                model.addLinkData(linkdata);
                // select the new Node
                var newnode = diagram.findNodeForData(toData);
                diagram.select(newnode);
                // snap the new node to a valid location
                newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);
                // then account for any overlap
                shiftNodesToEmptySpaces();
                diagram.commitTransaction("Add State");
            }

            function changeFeature(e,obj){
                var featText = obj.findObject("FEAT");
                if(featText.text == "B"){
                    featText.text = "C"
                }else{
                    featText.text = "B";
                }
            }

            var OldTarget = null;  // remember the last highlit port
            function highlight(port) {
                if (OldTarget !== port) {
                lowlight();  // remove highlight from any old port
                OldTarget = port;
                port.scale = 1.0;  // highlight by enlarging
                }
            }
            function lowlight() {  // remove any highlight
                if (OldTarget) {
                OldTarget.scale = 1.0;
                OldTarget = null;
                }
            }

            relativeDiagram.addDiagramListener("LinkDrawn", function(e) {
                var link = e.subject;
                if (link.toNode.category === "Recycle") relativeDiagram.remove(link);
                lowlight();
            });

            relativeDiagram.addDiagramListener("LinkRelinked", function(e) {
                var link = e.subject;
                if (link.toNode.category === "Recycle") relativeDiagram.remove(link);
                lowlight();
            });

            relativeDiagram.linkTemplate =
                $(go.Link,
                { selectionAdorned: false, fromPortId: "from", toPortId: "to", relinkableTo: true },
                $(go.Shape,
                    { stroke: "gray", strokeWidth: 2 },
                    { mouseEnter: function(e, obj) { obj.strokeWidth = 3; obj.stroke = "dodgerblue"; },
                    mouseLeave: function(e, obj) { obj.strokeWidth = 2; obj.stroke = "gray"; } }),
                /* $(go.Panel, "Auto",
                    { _isLinkLabel: true,click: changeFeature},  // marks this Panel as being a draggable label
                    $(go.Shape, "RoundedRectangle",{ fill: "lightblue" ,stroke:null,cursor: "pointer",width:20},
                     { mouseEnter: function(e, obj) { obj.strokeWidth = 2; obj.stroke = "white"; },
                        mouseLeave: function(e, obj) { obj.stroke =null; } }),
                    $(go.TextBlock, "B", { margin: 0 ,font: "bold 10pt sans-serif",stroke: "red",name:"FEAT"})) */
                );
            
            function commonLinkingToolInit(tool) {
                // the temporary link drawn during a link drawing operation (LinkingTool) is thick and blue
                tool.temporaryLink =
                    $(go.Link, { layerName: "Tool" },
                    $(go.Shape, { stroke: "dodgerblue", strokeWidth: 4 }));

                // change the standard proposed ports feedback from blue rectangles to transparent circles
                tool.temporaryFromPort.figure = "Circle";
                tool.temporaryFromPort.stroke = null;
                tool.temporaryFromPort.strokeWidth = 0;
                tool.temporaryToPort.figure = "Circle";
                tool.temporaryToPort.stroke = null;
                tool.temporaryToPort.strokeWidth = 0;

                // provide customized visual feedback as ports are targeted or not
                tool.portTargeted = function(realnode, realport, tempnode, tempport, toend) {
                if (realport === null) {  // no valid port nearby
                    lowlight();
                } else if (toend) {
                    highlight(realport);
                }
                };
            }

            var ltool = relativeDiagram.toolManager.linkingTool;
            commonLinkingToolInit(ltool);
            // do not allow links to be drawn starting at the "to" port
            ltool.direction = go.LinkingTool.ForwardsOnly;

            var rtool = relativeDiagram.toolManager.relinkingTool;
            commonLinkingToolInit(rtool);
            // change the standard relink handle to be a shape that takes the shape of the link
            rtool.toHandleArchetype =
                $(go.Shape,
                { isPanelMain: true, fill: null, stroke: "dodgerblue", strokeWidth: 4 });

            // use a special DraggingTool to cause the dragging of a Link to start relinking it
           // relativeDiagram.toolManager.draggingTool = new DragLinkingTool();

            function DragLinkingTool() {
                go.DraggingTool.call(this);
                this.isGridSnapEnabled = true;                         /*=====problem=======*/
                this.isGridSnapRealtime = false;
                this.gridSnapCellSize = new go.Size(182, 1);
                this.gridSnapOrigin = new go.Point(5.5, 0);
            }
            go.Diagram.inherit(DragLinkingTool, go.DraggingTool);
            /** @override */
            DragLinkingTool.prototype.doActivate = function() {
                var diagram = this.diagram;
                if (diagram === null) return;
                this.standardMouseSelect();
                var main = this.currentPart;  // this is set by the standardMouseSelect
                if (main instanceof go.Link) { // maybe start relinking instead of dragging
                    var relinkingtool = diagram.toolManager.relinkingTool;
                    // tell the RelinkingTool to work on this Link, not what is under the mouse
                    relinkingtool.originalLink = main;
                    // start the RelinkingTool
                    diagram.currentTool = relinkingtool;
                    // can activate it right now, because it already has the originalLink to reconnect
                    relinkingtool.doActivate();
                    relinkingtool.doMouseMove();
                } else {
                    go.DraggingTool.prototype.doActivate.call(this);
                }
            };
            // end DragLinkingTool

            // detect when dropped onto an occupied cell
            relativeDiagram.addDiagramListener("SelectionMoved", shiftNodesToEmptySpaces);

            function shiftNodesToEmptySpaces() {
                relativeDiagram.selection.each(function(node) {
                if (!(node instanceof go.Node)) return;
                // look for Parts overlapping the node
                while (true) {
                    var exist = relativeDiagram.findObjectsIn(node.actualBounds,
                    // only consider Parts
                    function(obj) { return obj.part; },
                    // ignore Links and the dropped node itself
                    function(part) { return part instanceof go.Node && part !== node; },
                    // check for any overlap, not complete containment
                    true).first();
                    if (exist === null) break;
                    // try shifting down beyond the existing node to see if there's empty space
                    node.position = new go.Point(node.actualBounds.x, exist.actualBounds.bottom+10);
                }
                });
            }

            

            relativeDiagram.addDiagramListener("LayoutCompleted", function(e) {
                relativeDiagram.nodes.each(function(node) {
                if (node.category === "Recycle") return;
                node.minLocation = new go.Point(node.location.x, -Infinity);
                });
            }); 

            this.load();
            this.layout();
        },
        load(){
            var $ = go.GraphObject.make;
            var model = $(go.GraphLinksModel);
            model.nodeDataArray= treedata.nodeDataArray;
            /* [
                { "key":1, "text":"商家实体特征", "category":"Loading" },
                
                
            ]; */
            model.linkDataArray= treedata.linkDataArray;
            
            relativeDiagram.model = model;
        },
        layout(){
            relativeDiagram.layoutDiagram(true);
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

        flex-grow: 1;
        height: 380px;
        
        border: 1px solid lightgray;
        //background-color:	#F5FFFA;
       // border-radius: 8px;
    }
</style>
