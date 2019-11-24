<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" > 
            <el-breadcrumb-item :to="{ path: '/Home' }" class="ddd">首页</el-breadcrumb-item>
            <el-breadcrumb-item><span class="fff">企业工作台</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="fff">采购报价看板管理</span></el-breadcrumb-item>
            <el-breadcrumb-item><span class="sss">报价看板</span></el-breadcrumb-item>
        </el-breadcrumb>

        <hr style="border:2px solid #eee;margin-top:20px">
        

    </div>
</template>
<style scoped>
    .ddd{
        font-size:16px;
        margin-left: 20px;
    }
    .sss{
        font-size:16px;
    }
     .fff{
        font-size:16px;
        color: orange;
        font-weight: bold;
        
    }
</style>