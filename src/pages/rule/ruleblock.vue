<template id="tpl-tree-node">
  <div
  draggable="true"
  @dragstart.stop="start">
    aaa
  </div>
</template>

<script>
    export default {
        name: "ruleblock",
        methods:{
          start:function () {
            
          }
        }
      
    }
</script>

<style scoped>
  .tree-node {
    display: list-item;
    padding-left: 2px;
    list-style: none;
    line-height: 20px;
    border-left: 1px dashed #ddd;
    transition: height .5s ease;
  }
  .empty-node {
    height: 10px;
  }
  .tree-node-children {
    margin-left: 30px; /* indention */
  }
  .dragging-node {
    color: orange;
    opacity: 0.7;
  }
  .drop-allowed {
    height: 30px;
    border: 1px dashed #ddd;
    border-radius: 5px;
    background-color: yellow;
  }
  .drop-not-allowed {
    opacity: 0.7;
  }
</style>
