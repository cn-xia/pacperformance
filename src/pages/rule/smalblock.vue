<template>
  
  <div style="width:100px;height:150px;border: 1px solid lightgray">


<span contenteditable="true" class="ruleBolck subject">{{obj[0]}}</span>
    <select  class="ruleBolck op">
      <option>
        {{obj[1]}}
      </option>
    </select>
    <span contenteditable="true" class="ruleBolck value">{{obj[2]}}</span>
    <span contenteditable="true" class="ruleBolck value">{{obj[3]}}</span>

   <!--一条规则完-->

  </div>
</template>

<script>
  import "./ruleColor.css"
  export default {
    name: 'smalblock',
    data() {
      return {

            obj:["subject","slector","attribute","other"]

        }
      }
    }
</script>

<style scoped>

</style>
