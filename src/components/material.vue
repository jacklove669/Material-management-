<template>
    <div style="text-align:left;line-height:initial">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }" class="ddd">首页</el-breadcrumb-item>
            <el-breadcrumb-item><span class="fff">企业工作台</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="fff">采购报价看板管理</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="sss">物料管理</span></el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <el-row :gutter="3" style="padding-bottom:10px;">
            <el-col :span="17">
                <el-select size="mini" v-model="tempSelect" placeholder="请选择大类" style="width:120px;"></el-select>
                <el-select size="mini" v-model="tempSelect" placeholder="请选择子类" style="width:120px;margin-left:5px"></el-select>
                <el-select size="mini" v-model="tempSelect" placeholder="请选择小类" style="width:120px;margin-left:5px"></el-select>
                <el-select size="mini" v-model="filterForm.state" placeholder="请选择状态" style="width:120px;margin-left:5px">
                    <el-option v-for="item in filterOptions"
                        :key="item.id"
                        :label="item.val"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-date-picker size="mini" style="width:180px;margin-left:5px"
                    v-model="filterForm.dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span='7' style="text-align:right">
                <el-input size="mini" v-model.trim="filterForm.keyword" placeholder="应用类/物料类/物料名称/牌号" style="width:220px;"></el-input>
                <el-button type="warning" @click.native.prevent="searchEvt" size="mini" style="margin-left:5px;">搜索</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="3" style="padding-bottom:10px;">
            <el-col style="font-size:12px;" :span=24>筛选结果: 共<span style="color:#F18D00"> {{tableData.length}} </span>相关数据</el-col>
        </el-row>
        <el-table :data="tableData" border
            :header-cell-style="{'width':'100%','background':'#f5f7fa','text-align':'center','color':'#606266'}"
            :cell-style="{'text-align':'center'}">
            <el-table-column prop="applicationClass" label="应用类" width="180"></el-table-column>
            <el-table-column prop="selectVal3" label="物料类" width="180"></el-table-column>
            <el-table-column label="物料名" width="180">
                <template slot-scope="scope">
                    <el-button style="color:#F18D00" @click.native.prevent="ctrl(scope.$index,scope.row,'detail')"
                        type="text" size="small">{{ scope.row.materialName }}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="numberPlate" label="牌号"></el-table-column>
            <el-table-column label="规格">
                <template slot-scope="scope">
                    {{scope.row.thickness}}*
                    {{scope.row.extent}}*
                    {{scope.row.width}}
                    ({{scope.row.thicknessTolerance}})
                </template>
            </el-table-column>
            <el-table-column prop="originAddress" label="产地"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.isPublished ? '已上架' :'已下架'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button style="color:#F18D00" @click.native.prevent="ctrl(scope.$index,scope.row,'shelves')"
                        type="text" size="small">{{scope.row.isPublished ? '下架' :'上架'}}</el-button>
                    <el-button style="color:#F18D00" @click.native.prevent="ctrl(scope.$index,scope.row,'edit')"
                        type="text" size="small">编辑</el-button>
                    <el-button style="color:#F18D00"  type="text" size="small">复制</el-button>
                    <el-button style="color:#F18D00" @click.native.prevent="ctrl(scope.$index,scope.row, 'delete')"
                        type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding:20px;">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
        </div>

        <el-dialog title="查看" :visible.sync="detailDialogVisible">
            <el-form label-width="100px" class="text-left" size="mini">
                <el-card class="box-card" shadow="never">
                    <el-form-item label="应用类" >
                        {{formData.applicationClass}}
                    </el-form-item>
                    <el-form-item label="物料类" >
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                {{formData.selectVal1}}
                            </el-col>
                            <el-col :span='5'>
                                {{formData.selectVal2}}
                            </el-col>
                            <el-col :span='5'>
                                {{formData.selectVal3}}
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="物料名称">
                        {{formData.materialName}}
                    </el-form-item>
                    <el-form-item label="截止日期" >
                        {{formData.endDate}}
                    </el-form-item>
                </el-card>
                
                <el-card class="box-card" shadow="never">
                    <el-row>
                        <el-col :span='10'>
                            <el-form-item label="产地" >
                                {{formData.originAddress}}
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="牌号" >
                                {{formData.numberPlate}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='10'>
                            <el-form-item label="厚度" >
                                {{formData.thickness}} <span style="color:#C0C4CC">mm</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="长度">
                                {{formData.extent}} <span style="color:#C0C4CC">mm</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='10'>
                            <el-form-item label="宽度">
                                {{formData.width}} <span style="color:#C0C4CC">mm</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="厚度公差">
                                {{formData.thicknessTolerance}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="formData.selectVal3==10101">
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="硬度">
                                    {{formData.hardness}}
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="表面相隔度">
                                    {{formData.spacing}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="切边/毛边" >
                                    {{formData.TrimmingBurring}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="屈服强度">
                                    {{formData.yieldStrength}}
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="拉伸强度" >
                                    {{formData.tensileStrength}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="伸长率">
                                    {{formData.elongation}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="box-card" shadow="never">
                    <el-form-item label="需求量"  >
                        {{formData.demand}} <span style="color:#C0C4CC">吨</span>
                    </el-form-item>
                    <el-form-item label="交货地点" >
                        {{formData.deliveryAddress}}
                    </el-form-item>
                    <el-form-item label="交货日期">
                        {{formData.deliveryDate}}
                    </el-form-item>
                    <el-form-item label="质量等级">
                        {{formData.qualityGrade}}
                    </el-form-item>
                    <el-form-item label="包装方式">
                        {{formData.packagingMethod}}
                    </el-form-item>
                    <el-form-item label="技术标准">
                        {{formData.technicalStandard}}
                    </el-form-item>
                </el-card>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="editDialogVisible">
            <el-form :model="formData" ref="formData" label-width="100px" class="text-left">
                <el-card class="box-card" shadow="never">
                    <el-form-item label="应用类" prop="applicationClass"
                        :rules="[ {required: true,message: '请输入应用类',trigger: 'blur' }, { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }]">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model="formData.applicationClass" placeholder="请输入应用类"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="物料类" required>
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-form-item prop="region1">
                                    <el-select v-model="formData.region1" disabled placeholder="原材料">
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span='5'>
                                <el-form-item prop="selectVal1"
                                    :rules="[{ required: true, message: '请选择物料大类', trigger: 'change' }]">
                                    <el-select v-model="formData.selectVal1" placeholder="请选择大类">
                                        <el-option v-for="(item,idx) in selectData1" :key="idx" :label="item.label"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span='5'>
                                <el-form-item prop="selectVal2">
                                    <el-select v-model="formData.selectVal2" placeholder="请选择子类">
                                        <el-option v-for="(item,idx) in selectData2" :key="idx" :label="item.label"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span='5'>
                                <el-form-item prop="selectVal3"
                                    :rules="[{ required: true, message: '请选择小类', trigger: 'change' }]">
                                    <el-select v-model="formData.selectVal3" placeholder="请选择小类">
                                        <el-option v-for="(item,idx) in selectData3" :key="idx" :label="item.label"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="materialName"
                        :rules="[{ required: true, message: '请输入物料名称', trigger: 'blur' }, { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }]">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model="formData.materialName" placeholder="请输入物料名称"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="截止日期" required>
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-form-item prop="endDate"
                                    :rules="{ type: 'date', required: true, message: '请选择截止日期', trigger: 'change'}">
                                    <el-date-picker type="date" placeholder="请选择截止日期" v-model="formData.endDate"
                                        style="width: 100%;">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-card>

                <el-card class="box-card" v-show="!!formData.selectVal3" shadow="never">
                    <el-row>
                        <el-col :span='10'>
                            <el-form-item label="产地" required prop="originAddress"
                                :rules="{required: true,message: '请输入产地',trigger: 'blur' }">
                                <el-row :gutter="5">
                                    <el-col :span='15'>
                                        <el-input v-model="formData.originAddress" placeholder="请输入产地"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="牌号" required prop="numberPlate"
                                :rules="{required: true,message: '请输入牌号',trigger: 'blur' }">
                                <el-row :gutter="5">
                                    <el-col :span='10'>
                                        <el-input v-model="formData.numberPlate" placeholder="请输入牌号"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='10'>
                            <el-form-item label="厚度" required prop="thickness"
                                :rules="{required: true,message: '请输入厚度',trigger: 'blur' }">
                                <el-row :gutter="5">
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
                            <el-form-item label="长度" required prop="extent"
                                :rules="{required: true,message: '请输入长度',trigger: 'blur' }">
                                <el-row :gutter="5">
                                    <el-col :span='10'>
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
                        <el-col :span='10'>
                            <el-form-item label="宽度" required prop="width"
                                :rules="{required: true,message: '请输入宽度',trigger: 'blur' }">
                                <el-row :gutter="5">
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
                                <el-row :gutter="5">
                                    <el-col :span='10'>
                                        <el-input v-model="formData.thicknessTolerance" placeholder="请输入厚度公差">
                                        </el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="formData.selectVal3==10101">
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="硬度" required prop="hardness"
                                    :rules="{required: true,message: '请输入硬度',trigger: 'blur' }">
                                    <el-row :gutter="5">
                                        <el-col :span='15'>
                                            <el-input v-model="formData.hardness" placeholder="请输入硬度"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="表面相隔度" prop="spacing">
                                    <el-row :gutter="5">
                                        <el-col :span='10'>
                                            <el-input v-model="formData.spacing" placeholder="请输入表面相隔度"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="切边/毛边" prop="TrimmingBurring">
                                    <el-row :gutter="5">
                                        <el-col :span='15'>
                                            <el-input v-model="formData.TrimmingBurring" placeholder="请输入切边/毛边">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="屈服强度" required prop="yieldStrength">
                                    <el-row :gutter="5">
                                        <el-col :span='15'>
                                            <el-input v-model="formData.yieldStrength" placeholder="请输入屈服强度"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="拉伸强度" prop="tensileStrength">
                                    <el-row :gutter="5">
                                        <el-col :span='10'>
                                            <el-input v-model="formData.tensileStrength" placeholder="请输入拉伸强度">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='10'>
                                <el-form-item label="伸长率" prop="elongation">
                                    <el-row :gutter="5">
                                        <el-col :span='15'>
                                            <el-input v-model="formData.elongation" placeholder="请输入伸长率"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

                <el-card class="box-card" shadow="never">
                    <el-form-item label="需求量" required prop="demand"
                        :rules="[{required: true,   message: '请输入需求总量',   trigger: 'blur' }, { type: 'number', message: '需求总量必须为数字值', trigger: 'blur'}]">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model.number="formData.demand" placeholder="请输入月度总需求量"></el-input>
                            </el-col>
                            <el-col :span='1'>
                                <span style="color:#C0C4CC">吨</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="交货地点" required prop="deliveryAddress"
                        :rules="[ { required: true, message: '请输入交货地点', trigger: 'blur'}, { min: 3, message: '长度不能少于3个字符', trigger: 'blur' }]">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model="formData.deliveryAddress" placeholder="请输入交货地点"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="交货日期" required>
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-form-item prop="deliveryDate"
                                    :rules="{ type: 'date', required: true, message: '请选择交货日期', trigger: 'change' }">
                                    <el-date-picker type="date" placeholder="请选择交货日期" v-model="formData.deliveryDate"
                                        style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="质量等级" prop="qualityGrade">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model="formData.qualityGrade" placeholder="请输入质量等级"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="包装方式" prop="packagingMethod">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model="formData.packagingMethod" placeholder="请输入包装方式"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="技术标准" prop="technicalStandard">
                        <el-row :gutter="5">
                            <el-col :span='5'>
                                <el-input v-model="formData.technicalStandard" placeholder="请输入技术标准"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-card>
                <el-form-item label-width="0">
                    <el-button type="primary" @click.native.prevent="submitForm('formData')">保存</el-button>
                    <el-button @click.native.prevent="closeDialog">取消</el-button>
                    <!-- 给vue组件绑定事件时候，必须加上native ，否则会认为监听的是来自Item组件自定义的事件， -->
                    <!-- 父组件通过prop传递数据给子组件，子组件触发事件给父组件。但父组件想在子组件上监听自己的click的话，需要加上native修饰符 -->
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                tempSelect:'',
                filterOptions:[
                    {id:0,val:'全部'},
                    {id:1,val:'已上架'},
                    {id:-1,val:'未上架'},
                ],
                filterForm:{
                    state:'',
                    dateRange:'',
                    keyword:''
                },
                tableData:[],
                detailDialogVisible:false,
                editDialogVisible: false,
                formData: {},
                editDataIdx: -1,
                rawData: [{
                    applicationClass: '钢板', // 应用类
                    materialName: '轧路板', // 物料名
                    endDate: '2018-09-09', // 截止日期
                    selectVal1: '1', // 大类
                    selectVal2: '101', // 子类
                    selectVal3: '10101', // 小类

                    originAddress: 'GD', // 产地 *
                    numberPlate: 'QS1000001', // 牌号 *
                    thickness: '12', // 厚度 *
                    extent: '23', // 长度 *
                    width: '1500', // 宽度 *
                    hardness: '123', // 硬度 *
                    thicknessTolerance: '±0.05', // 厚度公差
                    spacing: '', // 表面相隔度
                    TrimmingBurring: '', // 切边/毛边

                    yieldStrength: '123', // 屈服强度
                    tensileStrength: 'vd12', // 拉伸强度
                    elongation: '5%', // 伸长率

                    demand: '1000', // 需求量
                    deliveryAddress: 'SC', // 交货地点
                    deliveryDate: '2018-09-09', // 交货日期
                    qualityGrade: '优', // 质量等级
                    packagingMethod: '未知', // 包装方式
                    technicalStandard: 'QS', // 技术标准

                    isPublished: false // 是否已上架
                }, {
                    applicationClass: '木板', // 应用类
                    materialName: '轧路板', // 物料名
                    endDate: '2018-09-09', // 截止日期
                    selectVal1: '1', // 大类
                    selectVal2: '101', // 子类
                    selectVal3: '10101', // 小类

                    originAddress: 'GD', // 产地 *
                    numberPlate: 'QS1000001', // 牌号 *
                    thickness: '12', // 厚度 *
                    extent: '23', // 长度 *
                    width: '1500', // 宽度 *
                    hardness: '123', // 硬度 *
                    thicknessTolerance: '±0.05', // 厚度公差
                    spacing: '', // 表面相隔度
                    TrimmingBurring: '', // 切边/毛边

                    yieldStrength: '123', // 屈服强度
                    tensileStrength: 'vd12', // 拉伸强度
                    elongation: '5%', // 伸长率

                    demand: '1000', // 需求量
                    deliveryAddress: 'SC', // 交货地点
                    deliveryDate: '2018-09-09', // 交货日期
                    qualityGrade: '优', // 质量等级
                    packagingMethod: '未知', // 包装方式
                    technicalStandard: 'QS', // 技术标准

                    isPublished: false // 是否已上架
                }, {
                    applicationClass: '天花板', // 应用类
                    materialName: '轧路板', // 物料名
                    endDate: '2018-09-09', // 截止日期
                    selectVal1: '1', // 大类
                    selectVal2: '101', // 子类
                    selectVal3: '10101', // 小类

                    originAddress: 'GD', // 产地 *
                    numberPlate: 'QS1000001', // 牌号 *
                    thickness: '12', // 厚度 *
                    extent: '23', // 长度 *
                    width: '1500', // 宽度 *
                    hardness: '123', // 硬度 *
                    thicknessTolerance: '±0.05', // 厚度公差
                    spacing: '', // 表面相隔度
                    TrimmingBurring: '', // 切边/毛边

                    yieldStrength: '123', // 屈服强度
                    tensileStrength: 'vd12', // 拉伸强度
                    elongation: '5%', // 伸长率

                    demand: '1000', // 需求量
                    deliveryAddress: 'SC', // 交货地点
                    deliveryDate: '2018-09-09', // 交货日期
                    qualityGrade: '优', // 质量等级
                    packagingMethod: '未知', // 包装方式
                    technicalStandard: 'QS', // 技术标准

                    isPublished: false // 是否已上架
                }, {
                    applicationClass: '地板', // 应用类
                    materialName: '轧路板', // 物料名
                    endDate: '2018-09-09', // 截止日期
                    selectVal1: '1', // 大类
                    selectVal2: '101', // 子类
                    selectVal3: '10101', // 小类

                    originAddress: 'GD', // 产地 *
                    numberPlate: 'QS1000001', // 牌号 *
                    thickness: '12', // 厚度 *
                    extent: '23', // 长度 *
                    width: '1500', // 宽度 *
                    hardness: '123', // 硬度 *
                    thicknessTolerance: '±0.05', // 厚度公差
                    spacing: '', // 表面相隔度
                    TrimmingBurring: '', // 切边/毛边

                    yieldStrength: '123', // 屈服强度
                    tensileStrength: 'vd12', // 拉伸强度
                    elongation: '5%', // 伸长率

                    demand: '1000', // 需求量
                    deliveryAddress: 'SC', // 交货地点
                    deliveryDate: '2018-09-09', // 交货日期
                    qualityGrade: '优', // 质量等级
                    packagingMethod: '未知', // 包装方式
                    technicalStandard: 'QS', // 技术标准

                    isPublished: false // 是否已上架
                }, {
                    applicationClass: '隔离板', // 应用类
                    materialName: '轧路板', // 物料名
                    endDate: '2018-09-09', // 截止日期
                    selectVal1: '1', // 大类
                    selectVal2: '101', // 子类
                    selectVal3: '10101', // 小类

                    originAddress: 'GD', // 产地 *
                    numberPlate: 'QS1000001', // 牌号 *
                    thickness: '12', // 厚度 *
                    extent: '23', // 长度 *
                    width: '1500', // 宽度 *
                    hardness: '123', // 硬度 *
                    thicknessTolerance: '±0.05', // 厚度公差
                    spacing: '', // 表面相隔度
                    TrimmingBurring: '', // 切边/毛边

                    yieldStrength: '123', // 屈服强度
                    tensileStrength: 'vd12', // 拉伸强度
                    elongation: '5%', // 伸长率

                    demand: '1000', // 需求量
                    deliveryAddress: 'SC', // 交货地点
                    deliveryDate: '2018-09-09', // 交货日期
                    qualityGrade: '优', // 质量等级
                    packagingMethod: '未知', // 包装方式
                    technicalStandard: 'QS', // 技术标准

                    isPublished: false // 是否已上架
                }, {
                    applicationClass: '轧路板', // 应用类
                    materialName: '轧路板', // 物料名
                    endDate: '2018-09-09', // 截止日期
                    selectVal1: '1', // 大类
                    selectVal2: '101', // 子类
                    selectVal3: '10101', // 小类

                    originAddress: 'GD', // 产地 *
                    numberPlate: 'QS1000001', // 牌号 *
                    thickness: '12', // 厚度 *
                    extent: '23', // 长度 *
                    width: '1500', // 宽度 *
                    hardness: '123', // 硬度 *
                    thicknessTolerance: '±0.05', // 厚度公差
                    spacing: '', // 表面相隔度
                    TrimmingBurring: '', // 切边/毛边

                    yieldStrength: '123', // 屈服强度
                    tensileStrength: 'vd12', // 拉伸强度
                    elongation: '5%', // 伸长率

                    demand: '1000', // 需求量
                    deliveryAddress: 'SC', // 交货地点
                    deliveryDate: '2018-09-09', // 交货日期
                    qualityGrade: '优', // 质量等级
                    packagingMethod: '未知', // 包装方式
                    technicalStandard: 'QS', // 技术标准

                    isPublished: false // 是否已上架
                }],

                selectData1: [],
                selectData2: [],
                selectData3: [],
            }
        },
        mounted() {
            let vm = this
            // 本地模拟数据
            vm.selectData1 = [{
                "id": 1,
                "label": "钢材",
                "children": [{
                        "id": 101,
                        "label": "板材",
                        "children": [{
                                "id": 10101,
                                "label": "冷轧不锈钢板"
                            }, {
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
            }];
            // 获取localStorage存的数据
            let localData = localStorage.getItem('tableData');
            // son对象类型的数据转成字符串类型
            if(localData) localData = JSON.parse(localData);
            else localData = []
            
            if(localData.length) vm.rawData = localData.map(item=>{item['isPublished'] = false;return item})
            vm.tableData = vm.rawData;
        },
        methods: {
            submitForm(formName) {
                let vm = this
                vm.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.$message({
                        message: '恭喜你，保存成功!',
                        type: 'success'
                    });
                    vm.rawData.splice(vm.editDataIdx,1,vm.formData)
                    vm.closeDialog()
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            closeDialog(){
                let vm = this
                vm.detailDialogVisible = false
                vm.editDialogVisible = false
                
                setTimeout(()=>{vm.editDataIdx = -1;vm.formData = {}},200)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            ctrl(idx, row, op) {
                let vm = this
                switch (op) {
                    case 'shelves':
                        vm.$confirm(row.isPublished ? '是否下架该物料?' : '是否上架该物料?', '友情提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            row.isPublished = !row.isPublished
                            vm.$message({
                                type: 'success',
                                message: row.isPublished ? '上架成功!' : '下架成功!'
                            });
                        }).catch(() => {});
                        break;
                    case 'edit':
                        vm.formData = JSON.parse(JSON.stringify(row))
                        vm.editDialogVisible = true
                        vm.editDataIdx = idx
                        break;
                    case 'delete':
                        vm.$confirm('是否删除该物料?', '友情提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.tableData.splice(idx, 1);
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {});
                        break;
                    default:
                        vm.formData = JSON.parse(JSON.stringify(row))
                        vm.detailDialogVisible = true
                        break;
                }
            },
            searchEvt(){
                let vm = this
                if(vm.filterForm.keyword){
                    let list = vm.rawData.filter(item=>{
                        return item.applicationClass.indexOf(vm.filterForm.keyword) > -1
                    })
                    if (vm.filterForm.state == 0) vm.tableData = list
                    else vm.tableData = list.filter(row => {
                        if (vm.filterForm.state == 1) return row.isPublished
                        else return !row.isPublished
                    })
                }else {
                    if (vm.filterForm.state == 0) vm.tableData = vm.rawData
                    else vm.tableData = vm.rawData.filter(row => {
                        if (vm.filterForm.state == 1) return row.isPublished
                        else return !row.isPublished
                    })
                }
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
    .el-table,
    .el-dialog,
    .el-dialog__wrapper {
        line-height: initial;
    }

    .el-form-item__content {
        text-align: left;
    }

    .el-table__header {
        background: #F2F6FC;
    }

    .el-table thead th {
        background: #F2F6FC;
    }

    .el-card {
        margin-bottom: 20px;
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
</style>