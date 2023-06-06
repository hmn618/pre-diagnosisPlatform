<template>
    <div>
        <el-col :span="14">
            <div class="crumbs" style="margin-left:20px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 配置机器人</el-breadcrumb-item>
                    <el-breadcrumb-item>对话流程</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container" style="margin-left:20px;">
                <div>
                    <img src="static/img/more.png" style="width:23px;height:23px" @click="addForm">
                    <span style="color: #606266;">输入 </span>
                    <!-- 一次提交一个流程一个story -->
                    <img src="static/img/submit.png" @click="onSubmit" style="float:right;width:20px;height:20px">
                </div>
                <div v-for="(formItem,formIndex) in formArr" :key="formIndex">
                    <div class="form-box" style="margin:20px;padding:20px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
                            <el-row style="margin-bottom:10px">
                                <el-col :span="4"> 
                                    <span style="text-align:right;font-size:14px;color:#606266;margin-left:5%">S{{formIndex+1}}<span style="margin-left:20%">意图 </span></span>
                                </el-col>
                                <el-col :span="18">
                                    <el-radio-group v-model="formItem.intent">
                                        <el-radio  v-for="(intentItem,intentIndex) in formItem.intentList" :key="intentIndex" :label= "intentItem" style="margin-left: 5px;"></el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4"> 
                                    <img src="static/img/plus.png"  style="width:23px;height:23px;" @click="addSlot(formIndex)">
                                    <span style="text-align:right;font-size:14px;color:#606266;">槽值对 </span>
                                </el-col>
                                <el-col :span="18">
                                    <div v-for="(arrItem,arrIndex) in formItem.arr" :key="arrIndex">
                                        <el-row style="margin-bottom:7px">
                                            <el-col :span="8">
                                                    <el-select v-model="arrItem.slot" placeholder="请选择槽">
                                                        <el-option v-for="(slotItem,slotIndex) in formItem.slotList" :value="slotItem" :key="slotIndex"></el-option>
                                                    </el-select>
                                            </el-col>
                                            <el-col class="line" :span="4">
                                                --
                                            </el-col>
                                            <el-col :span="8">
                                                <el-input v-model="arrItem.slotData" style="width:90%"></el-input>
                                            </el-col>
                                            <el-col :span="4">
                                                <img src="static/img/del.png" style="width:23px;height:23px;margin-top:5px;margin-left:5px;" @click="deleteSlot(formIndex,arrIndex)">
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4"> 
                                    <img src="static/img/plus.png"  style="width:23px;height:23px;" @click="addAction(formIndex)">
                                    <span style="text-align:right;font-size:14px;color:#606266;">动作函数 </span>
                                </el-col>
                                <el-col :span="18"> 
                                    <div v-for="(actionItem,actionIndex) in formItem.actionList" :key="actionIndex" style="left:100px">
                                        <el-input v-model="actionItem.actionName" style="width:60%;margin-bottom:7px" placeholder="如：action_search_channel"></el-input>
                                        <img src="static/img/del.png" style="width:23px;height:23px;margin-top:5px;margin-left:5px;" @click="deleteAction(formIndex,actionIndex)">
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row> 
                                <el-button style="float:right; margin-right:10%" type="default" @click="deleteForm(formIndex)">删除</el-button>                    
                            </el-row>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="10">
            <div class="crumbs" style="margin-left:20px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 配置机器人</el-breadcrumb-item>
                    <el-breadcrumb-item>上传json文件</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div  style="margin-left:20px;">
                <el-tabs type="border-card" style="padding-bottom:30px">
                    <el-tab-pane label="查看story样例"> 
                        <pre class="brush:javascript;">
                    ## story_00914563
                    * greet
                    - utter_greet
                    * play_station{"type": "\u4ea4\u901a"}
                    - slot{"type": "\u4ea4\u901a"}
                    - utter_ask_place
                    * play_station{"place": "\u5317\u4eac"}
                    - slot{"place": "\u5317\u4eac"}
                    - utter_ask_moreupdates
                    * reject
                    - action_search_station
                    - action_suggest
                    * affirm
                    - action_play
                        </pre>
                    </el-tab-pane>
                    <el-tab-pane label="上传md文件">
                        <!-- <div style="margin-left:15%">
                            <el-upload
                            class="upload-demo"
                            drag
                            action="http://111.207.243.71:3001/users/file"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                        </div> -->
                         <div style="margin-left:15%">
                            <el-upload
                            class="upload-demo"
                            drag
                            action="http://localhost:3001/users/storyFile"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>  
    </div>
</template>


<script>
    import botInfo from './BaseForm.vue'
    export default {
        name: 'baseform',
        data: function(){
            return {
                slotList:[''],  //槽列表
                intentList:['','',],//意图列表
                formArr:[
                    {
                        intent:'',
                        arr:[{slot:'',slotData:''}],
                        actionList:[{actionName:''}],
                        slotList:[''],  //槽列表
                        intentList:[''],//意图列表
                    }
                ]
            }
        },
        mounted(){
            //加载intent
                this.$http.post(this.HOST+'/getIntentInfo/', {
                    owner: localStorage.getItem('ms_username')
                }, {
                    emulateJSON: true
                })
                .then((response) => {
                    console.log(response.body)
                    if(response.body.retCode== 200) {
                        var i=0;
                        for(i=0;i<response.body.intent.length;i++){
                            this.intentList[i]=response.body.intent[i].name;
                        }
                        this.formArr[0].intentList=this.intentList;
                    } else {
                        this.$message.error("登陆失败，请重试."+"原因:"+response.body.reason);
                    }
                }, (response) => {
                    alert("响应失败！");
                    this.$message({
                        type: 'error',
                        message: response.message
                    });
                });
                 //加载slot
                this.$http.post(this.HOST+'/getSlotInfo/', {
                    owner: localStorage.getItem('ms_username')
                }, {
                    emulateJSON: true
                })
                .then((response) => {
                    console.log(response.body)
                    if(response.body.retCode== 200) {
                        var i=0;
                        for(i=0;i<response.body.slot.length;i++){
                                this.slotList[i]=response.body.slot[i].name;
                        }
                        this.formArr[0].slotList=this.slotList;
                    } else {
                        this.$message.error("登陆失败，请重试."+"原因:"+response.body.reason);
                    }
                }, (response) => {
                    alert("响应失败！");
                    this.$message({
                        type: 'error',
                        message: response.message
                    });
                });
        },
        methods: {
            addForm() {
                let obj =  {
                        intent:'',
                        arr:[{slot:'',slotData:''}],
                        actionList:[{actionName:''}],
                        intentList:this.intentList,
                        slotList:this.slotList
                }
                this.formArr.push(obj)
            },
            deleteForm(index) {
                 this.formArr.splice(index,1)
            },
            addSlot(index) {
                let obj = {slot:'',slotData:''}
                this.formArr[index].arr.push(obj)
            },
            deleteSlot(index1,index2){
      	        this.formArr[index1].arr.splice(index2,1)
            },
            addAction(index) {
                let obj = {actionName:''}
                this.formArr[index].actionList.push(obj)
            },
            deleteAction(index1,index2) {
                this.formArr[index1].actionList.splice(index2,1)
            },
            onSubmit() {
                // console.log(this.formArr)
                this.$http.post("http://111.207.243.71:5558/get_dm/", {
                    owner: localStorage.getItem('ms_username'),
                    domain: localStorage.getItem('domain'),
                    story: this.formArr
                    // story: [{
                    //     intent:'ww',
                    //     arr:[{slot:'qq',slotData:'ee'}],
                    //     actionList:[{actionName:'rr'}],
                    //     slotList:['tt'],  //槽列表
                    //     intentList:['yy'],//意图列表
                    // }]
                }, {
                    emulateJSON: true
                })
                .then((response) => {
                    console.log(response.body)
                    if(response.body.status == '1') {
                        this.$message.success('提交成功！');
                    } else {
                        this.$message.error("登陆失败，请重试."+"原因:"+response.body.reason);
                    }
                }, (response) => {
                    alert("响应失败！");
                    this.$message({
                        type: 'error',
                        message: response.message
                    });
                });
            },
        }
    }
</script>