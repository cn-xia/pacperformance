<template>

<el-input
  type="textarea"
  :rows="18"
  placeholder="this is an xml text"
  v-model="textarea">
</el-input>
</template>
<script>
  export default {
    name:"ruleXml",
    data() {
      return {
        textarea: ''
      }
    }
  }
</script>
