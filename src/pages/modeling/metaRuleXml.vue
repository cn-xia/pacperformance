<template>

<el-input
  type="textarea"
  :rows="14"
  placeholder="this is an xml text"
  v-model="textarea">
</el-input>
</template>
<script>
  export default {
    name:"metaRuleXml",
    data() {
      return {
        textarea: ''
      }
    }
  }
</script>
