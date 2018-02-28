<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button type="primary" icon="plus" size="small" @click="dialogFormVisible = true">新建</el-button>
    </panel-title>
    <div class="panel-body">
      <el-row :gutter="25">
        <component :is="projectComp" :key="project.key" v-for="project in projects" :msg="project.name"></component>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="新建项目" style="width:800px;margin:0 auto;">
      <el-form :model="addProjectForm" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="addProjectForm.name"></el-input>
        </el-form-item> 
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProject()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {panelTitle,projectFigure} from 'components'
  export default {
    data(){
      return{
        projects:[],
        projectComp:projectFigure,
        dialogFormVisible:false,
        addProjectForm:{
          name:"",
        }
      }
    },
    components:{
      panelTitle,
      projectFigure
    },
    
    methods:{
      addProject(){
        this.dialogFormVisible = false;
        var name = this.addProjectForm.name;
        this.projects.push({
          name:name,
          //key:new Date().getTime(),
          key:name,
        }) 
        this.addProjectForm.name="";
      }
    }
  }
</script>

<style>
  .el-row{
  }
</style>
