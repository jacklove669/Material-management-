<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }" class="ddd">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span class="fff">企业工作台</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="fff">采购报价看板管理</span></el-breadcrumb-item>
      <el-breadcrumb-item><span class="sss">发布物料</span></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-tabs v-model="activeTab" type="border-card" class="__tab">
      <el-tab-pane label="发布物料" name="tab-1">
        <el-form :model="formData" ref="formData" label-width="100px" class="text-left">
          <el-card class="box-card" shadow="never">
            <el-form-item label="应用类" prop="applicationClass" :rules="[ {required: true,message: '请输入应用类',trigger: 'blur' }, { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }]">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model="formData.applicationClass" placeholder="请输入应用类"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="物料类" required>
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-form-item prop="region1">
                    <el-select v-model="formData.region1" disabled placeholder="原材料">
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='3'>
                  <el-form-item prop="selectVal1" :rules="[{ required: true, message: '请选择物料大类', trigger: 'change' }]">
                    <el-select v-model="formData.selectVal1" placeholder="请选择大类">
                      <el-option v-for="(item,idx) in selectData1" :key="idx" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='3'>
                  <el-form-item prop="selectVal2">
                    <el-select v-model="formData.selectVal2" placeholder="请选择子类">
                      <el-option v-for="(item,idx) in selectData2" :key="idx" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='3'>
                  <el-form-item prop="selectVal3" :rules="[{ required: true, message: '请选择小类', trigger: 'change' }]">
                    <el-select v-model="formData.selectVal3" placeholder="请选择小类">
                      <el-option v-for="(item,idx) in selectData3" :key="idx" :label="item.label" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="物料名称" prop="materialName" :rules="[{ required: true, message: '请输入物料名称', trigger: 'blur' }, { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }]">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model="formData.materialName" placeholder="请输入物料名称"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="截止日期" required>
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-form-item prop="endDate" :rules="{ type: 'date', required: true, message: '请选择截止日期', trigger: 'change'}">
                    <el-date-picker type="date" placeholder="请选择截止日期" v-model="formData.endDate" style="width: 100%;">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            
          </el-card>

          <el-card class="box-card" v-if="!!formData.selectVal3" shadow="never">
            <el-row>
              <el-col :span='6'>
                <el-form-item label="产地" required prop="originAddress" :rules="{required: true,message: '请输入产地',trigger: 'blur' }">
                  <el-row :gutter="10">
                    <el-col :span='15'>
                      <el-input v-model="formData.originAddress" placeholder="请输入产地"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="牌号" required prop="numberPlate" :rules="{required: true,message: '请输入牌号',trigger: 'blur' }">
                  <el-row :gutter="10">
                    <el-col :span='6'>
                      <el-input v-model="formData.numberPlate" placeholder="请输入牌号"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='6'>
                <el-form-item label="厚度" required prop="thickness" :rules="{required: true,message: '请输入厚度',trigger: 'blur' }">
                  <el-row :gutter="10">
                    <el-col :span='15'>
                      <el-input v-model="formData.thickness" placeholder="请输入厚度"></el-input>
                    </el-col>
                    <el-col :span='5'>
                      <span style="color:#C0C4CC">mm</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="长度" required prop="extent" :rules="{required: true,message: '请输入长度',trigger: 'blur' }">
                  <el-row :gutter="10">
                    <el-col :span='6'>
                      <el-input v-model="formData.extent" placeholder="请输入长度"></el-input>
                    </el-col>
                    <el-col :span='5'>
                      <span style="color:#C0C4CC">mm</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='6'>
                <el-form-item label="宽度" required prop="width" :rules="{required: true,message: '请输入宽度',trigger: 'blur' }">
                  <el-row :gutter="10">
                    <el-col :span='15'>
                      <el-input v-model="formData.width" placeholder="请输入宽度"></el-input>
                    </el-col>
                    <el-col :span='5'>
                      <span style="color:#C0C4CC">mm</span>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col :span='12'>
                <el-form-item label="厚度公差" prop="thicknessTolerance">
                  <el-row :gutter="10">
                    <el-col :span='6'>
                      <el-input v-model="formData.thicknessTolerance" placeholder="请输入厚度公差"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="formData.selectVal3==10101">
              <el-row>
                <el-col :span='6'>
                  <el-form-item label="硬度" required prop="hardness" :rules="{required: true,message: '请输入硬度',trigger: 'blur' }">
                    <el-row :gutter="10">
                      <el-col :span='15'>
                        <el-input v-model="formData.hardness" placeholder="请输入硬度"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="表面相隔度" prop="spacing">
                    <el-row :gutter="10">
                      <el-col :span='6'>
                        <el-input v-model="formData.spacing" placeholder="请输入表面相隔度"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='6'>
                  <el-form-item label="切边/毛边" prop="TrimmingBurring">
                    <el-row :gutter="10">
                      <el-col :span='15'>
                        <el-input v-model="formData.TrimmingBurring" placeholder="请输入切边/毛边"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div v-if="formData.selectVal3==10102">
              <el-row>
                <el-col :span='6'>
                  <el-form-item label="屈服强度" required prop="yieldStrength" >
                    <el-row :gutter="10">
                      <el-col :span='15'>
                        <el-input v-model="formData.yieldStrength" placeholder="请输入屈服强度"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="拉伸强度" prop="tensileStrength">
                    <el-row :gutter="10">
                      <el-col :span='6'>
                        <el-input v-model="formData.tensileStrength" placeholder="请输入拉伸强度"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span='6'>
                  <el-form-item label="伸长率" prop="elongation">
                    <el-row :gutter="10">
                      <el-col :span='15'>
                        <el-input v-model="formData.elongation" placeholder="请输入伸长率"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card" v-if="!!formData.selectVal1" shadow="never">
            <el-form-item label="需求量" required prop="demand" :rules="[{required: true,   message: '请输入需求总量',   trigger: 'blur' }, { type: 'number', message: '需求总量必须为数字值', trigger: 'blur'}]">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model.number="formData.demand" placeholder="请输入月度总需求量"></el-input>
                </el-col>
                <el-col :span='3'>
                  <span style="color:#C0C4CC">吨</span>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="交货地点" required prop="deliveryAddress" :rules="[ { required: true, message: '请输入交货地点', trigger: 'blur'}, { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }]">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model="formData.deliveryAddress" placeholder="请输入交货地点"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="交货日期" required>
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-form-item prop="deliveryDate" :rules="{ type: 'date', required: true, message: '请选择交货日期', trigger: 'change' }" >
                    <el-date-picker type="date" placeholder="请选择交货日期" v-model="formData.deliveryDate"
                      style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="质量等级" prop="qualityGrade">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model="formData.qualityGrade" placeholder="请输入质量等级"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="包装方式" prop="packagingMethod">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model="formData.packagingMethod" placeholder="请输入包装方式"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="技术标准" prop="technicalStandard">
              <el-row :gutter="10">
                <el-col :span='3'>
                  <el-input v-model="formData.technicalStandard" placeholder="请输入技术标准"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

          <div style="width:1500px;height:200px;background:white;margin-top:20px">
            <el-form-item label="结算方式" prop="name" style="float:left; margin-top:10px;">
              <el-radio-group v-model="radio2">
              <el-radio :label="3" style="margin:10px;">现金汇款</el-radio>
              <br>
              <el-radio :label="6" style="margin:10px;">承兑汇票
              </el-radio>
              <br>
              <el-radio :label="9" style="margin:10px;">预付定金</el-radio>
              <br>
              <el-radio :label="12" style="margin:10px;">预付账单</el-radio>
          </el-radio-group>
            </el-form-item>
          </div>
          </el-card>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formData')">发布</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="批量添加" name="second">暂无添加的数据......</el-tab-pane>
    </el-tabs>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        radio2:3,
        activeTab: 'tab-1',
        formData: {
          applicationClass: '',
          materialName: '',
          endDate: '',
          selectVal1: '',
          selectVal2: '',
          selectVal3: '',

          originAddress: '', // 产地 *
          numberPlate: '', // 牌号 *
          thickness: '', // 厚度 *
          extent: '', // 长度 *
          width: '', // 宽度 *
          hardness: '', // 硬度 *
          thicknessTolerance: '', // 厚度公差
          spacing: '', // 表面相隔度
          TrimmingBurring: '', // 切边/毛边

          yieldStrength:'',   // 屈服强度
          tensileStrength:'', // 拉伸强度
          elongation:'', // 伸长率

          demand: '',
          deliveryAddress: '',
          deliveryDate: '',
          qualityGrade: '',
          packagingMethod: '',
          technicalStandard: '',
        },
        selectData1: [],
        selectData2: [],
        selectData3: [],
      };
    },
    mounted() {
      let vm = this
      // vm.$http.getLinkage({id:0},false).then(ret=>{
      //   vm.selectData1 = ret.options || []
      // });

      // 模拟数据
      vm.selectData1 = [{
        "id": 1,
        "label": "钢材",
        "children": [{
            "id": 101,
            "label": "板材",
            "children": [
              {
                "id": 10101,
                "label": "冷轧不锈钢板"
              },{
                "id": 10102,
                "label": "冷轧钢板"
              },
              {
                "id": 10103,
                "label": "热轧钢板"
              }
            ]
          },
          {
            "id": 102,
            "label": "型材",
            "children": [{
                "id": 10201,
                "label": "型材Gfjix"
              },
              {
                "id": 10202,
                "label": "型材Xdfdstovuv Vmu"
              },
              {
                "id": 10203,
                "label": "型材Sespg Nhkuknhmt"
              }
            ]
          },
          {
            "id": 103,
            "label": "管材",
            "children": [{
                "id": 10301,
                "label": "管材Gfjix"
              },
              {
                "id": 10302,
                "label": "管材Xdfdstovuv Vmu"
              },
              {
                "id": 10303,
                "label": "管材Sespg Nhkuknhmt"
              }
            ]
          },
          {
            "id": 104,
            "label": "金属制品",
            "children": [{
                "id": 10401,
                "label": "金属制品Gfjix"
              },
              {
                "id": 10402,
                "label": "金属制品Xdfdstovuv Vmu"
              },
              {
                "id": 10403,
                "label": "金属制品Sespg Nhkuknhmt"
              }
            ]
          }
        ]
      }]
    },
    methods: {
      submitForm(formName) {
        let vm = this
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.$message({
              message: '恭喜你，发布成功!',
              type: 'success'
            }); 
            let localData = localStorage.getItem('tableData');
            if(localData) localData = JSON.parse(localData);
            else localData = []
            localData.push(vm.formData)
            localStorage.setItem('tableData',JSON.stringify(localData));
            vm.$router.push('material')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch: {
      'formData.selectVal1': function (id, oldId) {
        let vm = this
        if (id != oldId) {
          vm.selectData2 = []
          vm.formData.selectVal2 = ''
          vm.formData.selectVal3 = ''
        }
        vm.selectData1.map(v => {
          if (v.id == id) vm.selectData2 = v.children;
        })
      },
      'formData.selectVal2': function (id, oldId) {
        let vm = this
        if (id != oldId) {
          vm.selectData3 = []
          vm.formData.selectVal3 = ''
        }
        vm.selectData2.map(v => {
          if (v.id == id) vm.selectData3 = v.children;
        })
      },
    }
  }
</script>
<style scoped>
  .__tab {
    line-height: initial;
    margin-top: 30px;
  }

  .text-left {
    text-align: left;
  }

  .el-form-item__label {
    text-align: justify;
  }

  .el-card {
    margin: 20px 0;
  }

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

  /* .demo-formData{
        margin-top:100px;
    } */
  .hhh {
    margin-top: 50px;
  }
</style>