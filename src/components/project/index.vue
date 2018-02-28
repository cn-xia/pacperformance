<template>
  <section>
    <!-- <el-row :gutter="25"> -->
      <el-col :span="4">
        {{msg}}
      </el-col>
    <!-- </el-row> -->
  </section>
</template>

<script>
export default {
    name:"projectFigure",
    data(){
        return{
        }
    },
    props:{
      msg:{
        type:String,
        required:true
      }
    },
}
</script>

<style>

</style>
