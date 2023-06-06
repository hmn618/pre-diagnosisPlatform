<template>
    <div>
        <el-col :span="12">
            <div class="crumbs" style="margin-left:20px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 配置机器人</el-breadcrumb-item>
                    <el-breadcrumb-item>回答模版</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container" style="margin-left:20px;">
                <div>
                    <img src="static/img/more.png" style="width:23px;height:23px" @click="addForm">
                    <span style="color: #606266;">输入 </span>
                    <!-- 提交template -->
                    <img src="static/img/submit.png" @click="onSubmit" style="float:right;width:20px;height:20px">
                </div>
                <div v-for="(formItem,formIndex) in formArr" :key="formIndex">
                    <div class="form-box" style="width:90%;margin:20px;padding:20px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
                            <el-row style="margin-bottom:10px">
                                <el-col :span="4"> 
                                    <span style="text-align:right;font-size:14px;color:#606266;margin-left:5%">N{{formIndex+1}}<span style="margin-left:20%">名称 </span></span>
                                </el-col>
                                <el-col :span="18">
                                    <el-input v-model="formItem.name" style="width:80%" :key="formIndex" placeholder="如：atter_ask_type"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4"> 
                                    <img src="static/img/plus.png"  style="width:23px;height:23px;" @click="addAnswer(formIndex)">
                                    <span style="text-align:right;font-size:14px;color:#606266;margin-left:10%">模版 </span>
                                </el-col>
                                <el-col :span="18"> 
                                    <div v-for="(answerItem,answerIndex) in formItem.answerList" :key="answerIndex" style="left:100px">
                                        <el-input v-model="answerItem.answerName" style="width:80%;margin-bottom:7px" placeholder="如：您想要听什么类型的？"></el-input>
                                        <img src="static/img/del.png" style="width:23px;height:23px;margin-top:5px;margin-left:5px;" @click="deleteAnswer(formIndex,actionIndex)">
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
        <el-col :span="12">
            <div class="crumbs" style="margin-left:10px;">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-date"></i> 配置机器人</el-breadcrumb-item>
                    <el-breadcrumb-item>动作函数</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container" style="margin-left:10px;">
                <el-tabs type="border-card">
                    <el-tab-pane label="文件样例">
                        <pre class="brush:python;">
    class ActionSearchStation(Action):
        def name(self):
            return 'action_search_station'

        def run(self, dispatcher, tracker, domain):
            # station_api = StationAPI()
            # station = station_api.search(tracker.get_slot("place"))
            # return [SlotSet("matches", station)]

            dispatcher.utter_message("正在为您查找符合条件的电台")
            place = tracker.get_slot("place")
            type = tracker.get_slot("type")
            freq = tracker.get_slot("frequency")

            if freq is None:
                if place is None:
                    if type is None:
                        station = ""
                    else:
                        station = type+"电台"
                else:
                    if type is None:
                        station = place + "电台"
                    else:
                        station = place + type + "电台"
            else:
                station = freq+"电台"
            return [SlotSet("matches", station)]

                        </pre>
                    </el-tab-pane>
                    <el-tab-pane label="文件上传">
                        <!-- <el-form ref="form" :model="form1" label-width="80px" style="width:30%;margin-left:30%">
                            <el-form-item label="函数名称">
                                    <el-input v-model="fucName1"></el-input>
                            </el-form-item>
                        </el-form> -->
                        <div style="width:60%;margin:0 auto">
                            <el-upload
                            class="upload-demo"
                            drag
                            action="http://localhost:3001/users/actionFile"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                            <!-- <el-button type="primary" @click="onSubmit" style="float:right">提交</el-button> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="在线编辑">
                        <el-form ref="form" :model="form2" label-width="80px">
                            <el-form-item label="函数名称">
                                <el-input v-model="fucName2" style="width:40%"></el-input>
                            </el-form-item>
                        </el-form>
                        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                        <el-button class="editor-btn" type="primary" @click="submit" style="float:right">提交</el-button>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'editor',
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                },
                form1: {
                   funcName1: '',
                },
                form2: {
                   funcName2: '',
                },
                formArr:[
                    {
                        name:'',
                        answerList:[{answerName:''}],
                    }
                ],
            }
        },
        components: {
            quillEditor
        },
        methods: {
            addForm() {
                let obj =  {
                    name:'',
                    answerList:[{answerName:''}],
                }
                this.formArr.push(obj)
            },
            deleteForm(index) {
                 this.formArr.splice(index,1)
            },
            addAnswer(index) {
                let obj = {answerName:''}
                this.formArr[index].answerList.push(obj)
            },
            deleteAnswer(index1,index2){
      	        this.formArr[index1].answerList.splice(index2,1)
            },
            //提交template
            onSubmit() {
                this.$http.post('http://111.207.243.71:5558/get_template/', {
                    owner: localStorage.getItem('ms_username'),
                    domain: localStorage.getItem('domain'),
                    template: this.formArr
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
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>