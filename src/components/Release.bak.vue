<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }" class="ddd">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span class="fff">企业工作台</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="fff">采购报价看板管理</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="sss">发布物料</span></el-breadcrumb-item>
    </el-breadcrumb>

    <hr style="border:2px solid #eee;margin-top:20px">
    <el-tabs v-model="activeTab" type="border-card" class="hhh">
      <el-tab-pane label="发布物料" name="tab-1">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="应用类" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入物料用途,使用场景" style="width:400px; margin-left:-720px">
            </el-input>
          </el-form-item>
          <el-form-item label="物料类" prop="region">
            <el-select v-model="ruleForm.region" placeholder="原材料" style="width:200px; margin-left:-320px"
              disabled="true">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
              <el-option label="区域三" value="shanghai"></el-option>
              <el-option label="区域四" value="beijing"></el-option>
              <el-option label="区域五" value="shanghai"></el-option>
              <el-option label="区域六" value="beijing"></el-option>
            </el-select>
            <el-select v-model="ruleForm.region1" placeholder="请选择大类" style="width:200px;">
              <el-option label="11" value="shanghai"></el-option>
              <el-option label="11" value="beijing"></el-option>
              <el-option label="11" value="shanghai"></el-option>
              <el-option label="11" value="beijing"></el-option>
              <el-option label="11" value="shanghai"></el-option>
              <el-option label="11" value="beijing"></el-option>
            </el-select>
            <el-select v-model="ruleForm.region2" placeholder="请选择子类" style="width:200px;">
              <el-option label="22" value="shanghai"></el-option>
              <el-option label="22" value="beijing"></el-option>
              <el-option label="22" value="shanghai"></el-option>
              <el-option label="22" value="beijing"></el-option>
              <el-option label="22" value="shanghai"></el-option>
              <el-option label="22" value="beijing"></el-option>
            </el-select>
            <el-select v-model="ruleForm.region3" placeholder="请选择子小类" style="width:200px;">
              <el-option label="33" value="shanghai"></el-option>
              <el-option label="33" value="beijing"></el-option>
              <el-option label="33" value="shanghai"></el-option>
              <el-option label="33" value="beijing"></el-option>
              <el-option label="33" value="shanghai"></el-option>
              <el-option label="33" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物料名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入物料名称" style="width:400px; margin-left:-720px"></el-input>
          </el-form-item>
          <el-form-item label="截止日期" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="请选择截止日期" v-model="ruleForm.date1"
                  style="width:400px; margin-left:-115px"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="批量添加" name="second">批量添加</el-tab-pane>
    </el-tabs>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeTab: 'tab-1',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm1: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm2: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm3: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          region: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .ddd {
    font-size: 16px;
    margin-left: 20px;
  }

  .sss {
    font-size: 16px;
  }

  .fff {
    font-size: 16px;
    color: orange;
    font-weight: bold;

  }

  /* .demo-ruleForm{
        margin-top:100px;
    } */
  .hhh {
    margin-top: 50px;
  }
</style>