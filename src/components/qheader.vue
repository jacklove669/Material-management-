<template>
        <!-- 顶部组件 -->
    <header class="main-header">
        <div class="container">
            <a href="javascript:;" class="logo ">
            </a>   
            <div class="q-nav">                  
                <span class="q-title">
                    {{title}} 
                  
                </span>  
                                 
                <div class="q-entrance">                       
                    <!-- 桌面 -->
                    <span class="entrances">
                        <router-link :to="'/Home'">Home</router-link>
                    </span>
                    <div class="manager">                          
                        <template>
                            <el-button style="color:#b2b2b2;" type="text" @click="open2" icon="el-icon-user-solid">Out</el-button>
                        </template>
                    </div>
                </div> 
            </div>
        </div>             
    </header>
</template>
    
<script>
    export default {
        data(){
            return {
                title: '物料管理系统'
            }
        },
        methods:{     
            open2() {
                let _this = this
                this.$confirm('是否退出登录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // sessionStorage.removeItem("token")
                    _this.$router.push({path:'/login'})

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                });
            }
    
          },
          components:{

          }  
    }
</script>
    
<style>
    *{
        margin: 0;
        padding: 0;
    }
    a{text-decoration:none !important;}
    a:hover{
        color: #A9A9A9;
    }
    .container{
        width: 1200px;
        margin: 0 auto;
    }
    .main-header>.container>a{
        /* width: 12%; */
        height: 90px;
        float: left;
    }
    .q-nav{
        text-align: center;
        height: 90px;
    }
    .q-title{
        margin: 0 auto;     
        color: #b2b2b2;
        display: inline-block;
        font-size: 20px;
    }
    .entrances{
        float: left;
    }
    .entrances>a{
        color:#b2b2b2;
        font-size: 14px;
    }
    .entrances>a:hover{
        color: #fff;
    }
    .q-entrance{
        float: right;
        width: 120px;
    }
    .q-entrance>span>a{
    
        line-height: 50px;
    }
    .manager{
        float: right;
    }
    /* .el-button{
        color: #b2b2b2 !important;
    }
    .el-button:hover{
        color: #fff !important;
    } */
</style>
     