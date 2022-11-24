<template>
  <div class="users">
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd" >+ 新增</el-button>
      <el-form :model="userData" :inline="true" class="search">
        <el-form-item>
          <el-input v-model="userData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
      <el-dialog
        :title="modelType?'更新用户':'新增用户'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <el-form ref="form" :inline="true" :rules="rules" :model="form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
                v-model="form.birth"
                type="date"
                placeholder="选择日期"
                value-format='yyyy-MM-dd'>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="reset">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
       <div class="common-tabel">
          <el-table
          stripe
          height="70%"
          :data="list"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
            <template slot-scope="scope">
              <span>{{scope.row.sex === 1?'男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="birth"
            label="出生日期">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="地址">
          </el-table-column>
          <el-table-column
            label="编辑">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change='handlePage'>
          </el-pagination>
       </div>
      
  </div>
</template>

<script>
import {getUser,addUser,editUser,delUser} from '../api'
export default {
    name:'User',
    data() {
      return {
        dialogVisible: false,
        form:{
          name:'',
          age:'',
          sex:'',
          birth:'',
          addr:''
        },
        rules:{
          name:{required: true, message: '姓名不能为空'},
          age:{required: true, message: '年龄不能为空'},
          sex:{required: true, message: '性别不能为空'},
          birth:{required: true, message: '出生日期不能为空'},
          addr:{required: true, message: '地址不能为空'},
        },
        list:[],
        modelType:0,  // 0表示新增  1表示编辑
        total:0, // 当前总页数
        pageData:{
          page:1,  //当前页
          limit:10  // 当前页的个数
        },
        userData:{
          name:''
        }

      };
    },
    methods:{
      handleClose(){
        this.$refs.form.resetFields()
        this.dialogVisible = false
      },
      reset(){
        this.handleClose()
      },
      submit(){
        const a = this.$refs.form.validate(res=>{
          if(res){
            if(this.modelType === 0){
              addUser(this.form).then(()=>{
                this.getlist()
              })
            }
            else{
              editUser(this.form).then(()=>{
                this.getlist()
              })
            }
            this.$refs.form.resetFields()
            this.dialogVisible = false
          }
        })
      },
      handleAdd(){
        this.modelType = 0
        this.dialogVisible = true
      },
      handleEdit(row){
        this.modelType = 1
        this.dialogVisible = true 
        this.form = {...row}
        console.log(this.form)
      },
      handleDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id:row.id}).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getlist()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handlePage(val){
        this.pageData.page = val
        this.getlist()
      },
      getlist(){
        getUser({params:{...this.pageData,...this.userData}}).then(({data})=>{
          this.list = data.list
          this.total = data.count || 0
        })
      },
      onSubmit(){
        this.getlist()
      }
    },
    mounted(){
      this.getlist()
    }
    }
</script>

<style lang='less' scoped>
.el-form{
  padding:20px;
}
.users{
  height: 90%;
  .common-tabel{
      position: relative;
      height: calc(100% - 62px);
      .el-pagination{
        position: absolute;
        right: 0;
      }
  }
  .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .search{
          padding: 0;
          .el-form-item{
            margin-bottom: 0;
          }
        }
    }
}
</style>