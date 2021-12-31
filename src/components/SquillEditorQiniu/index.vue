<!--
基于quill-editor的整合七牛云上传的自定义组件
elemntUI文档地址 http://element.eleme.io/#/zh-CN/component/tag
quill-editor 文档地址 https://surmon-china.github.io/vue-quill-editor/
quill-editor整合七牛云上传https://github.com/NextBoy/skill/issues/2
-->

<template>
  <div id='quillEditorQiniu'>
    <!-- 基于elementUi的上传组件 el-upload begin-->
    <el-upload
      class="avatar-uploader"
      action="http://upload.qiniup.com/"
      :accept="'image/*'"
      :data="qiniu"
      :show-file-list="false"
      :drag="false"
      :on-success="uploadEditorSuccess"
      :on-error="uploadEditorError"
      :before-upload="beforeEditorUpload">
    </el-upload>
    <!-- 基于elementUi的上传组件 el-upload end-->
    <quill-editor  class="editor" height="300"  v-model="contents" ref="customQuillEditor" :options="editorOption" >
    </quill-editor>
  </div>
</template>

<script>
  // import { quillEditor } from 'vue-quill-editor'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend,QuillWatch} from 'quill-image-extend-module'
  import { ImageDrop } from 'quill-image-drop-module'// 引用，粘贴图片
  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/ImageExtend', ImageExtend)
  import { domain, getToken,randomWord } from '@/api/qiniu'
  import { formatLongTime, parseTime } from '@/utils/index'
  //自定义编辑器的工作条
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ];

  export default {
    computed: {
      editor () {
        return this.$refs.customQuillEditor.quill
      }
    },
    data(){
      return {
        contents:'',
        index:'',
        quillUpdateImg:false,
        editorOption:{
          placeholder:'请输入正文...',
          modules: {
            // imageDrop: false,
            // ImageExtend: {
            //   loading: true,
            //   name: 'file',
            //   action: 'http://upload.qiniup.com/',
            //   headers: (xhr) => {
            //   },
            //   start: () => {
            //   },
            //   success: (e) => {
            //   },
            //   change: (xhr, formData) => {
            //     formData.append('key', parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '/' +randomWord(false, 10))
            //     formData.append('token', this.qiniu.token)
            //     this.index=this.editor.getSelection().index
            //   },
            //   response: (res) => {
            //     console.log(res)
            //     var imgUrl = domain+res.key
            //     // 获取富文本组件实例
            //     let quill = this.$refs.customQuillEditor.quill;
            //     // console.log(quill.getSelection())
            //     console.log(this.editor.getSelection())
            //     // 获取光标所在位置
            //     // let length = quill.getSelection().index;
            //
            //     // 插入图片  res.info为服务器返回的图片地址
            //     quill.insertEmbed(this.index, 'image', imgUrl)
            //
            //     // 调整光标到最后
            //     quill.setSelection(this.index + 1)
            //     // return res.info
            //   }
            // },
            // toolbar: {
            //   container: container,
            //   handlers: {
            //     'image': function () {
            //       QuillWatch.emit(this.quill.id)
            //     }
            //   }
            // }
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('#quillEditorQiniu .avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
        qiniuDomain:'',
        qiniu:{
          'key': '',
          'token': '',
        },
      }
    },
    props:{
      eidtId:{
        type:Number,
        default:0,
      },
      content:{
        type:String,
        default:'',
      },
    },
    methods:{
      // uploadToServer(file, callback) {
      //   var xhr = new XMLHttpRequest()
      //   var formData = new FormData()
      //   formData.append('file', file)
      //   xhr.open('post', 'http://upload.qiniup.com/')
      //   xhr.withCredentials = true
      //   xhr.responseType = 'json'
      //   xhr.send(formData)
      //   xhr.onreadystatechange = () => {
      //     if (xhr.readyState === 4 && xhr.status === 200) {
      //       callback(xhr.response)
      //     }
      //   }
      // },
      // handleExceed(files, fileList) {
      //   this.$message.warning(`当前限制一次性上传最多 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      // },
      // handleError(err, file, fileList) {
      //   this.$message.warning(`文件上传失败，请尝试重新上传，文件失败原因为： ${err}`)
      // },
      // uploadAttachment(response, file, fileList) {
      //   // 保存文件信息
      //   console.log(response)
      //   if (response.status.code === 0) {
      //     // 获取富文本组件实例
      //     let quill = this.$refs.myQuillEditor.quill
      //     // 获取光标所在位置
      //     let length = quill.getSelection().index
      //     // 插入图片  res.info为服务器返回的图片地址
      //     quill.insertEmbed(length, 'image', response.url)
      //     quill.setSelection(length + 1)
      //     let fileType = null
      //     if (file.raw && file.raw.type) {
      //       fileType = file.raw.type
      //     } else {
      //       fileType = file.type
      //     }
      //     let params = {}
      //     params = {
      //       // 保存文件上传的参数
      //     }
      //     // workService.create(params).then((res) => {
      //     //   this.$message.success('上传成功')
      //     // }).catch((err) => {
      //     //   this.$message.error(err)
      //     // })
      //   } else {
      //     this.$message.error(response.status.message)
      //   }
      //   // 清空文件列表
      //   // this.uploadList = []
      // },
      // onEditorChange(e) {
      //   this.$emit('change', e.html)
      // },





      //上传图片之前
      beforeEditorUpload(res, file){
        console.log(res)
        this.qiniu.key = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}') + '/' +randomWord(false, 10)
        //显示上传动画
        this.quillUpdateImg = true;
      },

      // 上传图片成功
      uploadEditorSuccess(res, file) {
        console.log(res)
        //拼接出上传的图片在服务器的完整地址
        var imgUrl = domain+res.key

        // //重置上传文件key，为下次上传做好准备
        // this.qiniu.key =  new Date().getTime()+""+Math.floor(Math.random()*1000);

        // 获取富文本组件实例
        let quill = this.$refs.customQuillEditor.quill;

        // 获取光标所在位置
        let length = quill.getSelection().index;
        console.log(quill.getSelection())
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', imgUrl)

        // 调整光标到最后
        quill.setSelection(length + 1)

        //取消上传动画
        this.quillUpdateImg = false;

      },

      // 上传图片失败
      uploadEditorError(res, file) {
        //页面提示
        Notification.error({
          message: '上传图片失败'
        });
        console.log(res)
        //取消上传动画
        this.quillUpdateImg = false;
      },
      getQiniuToken() {
        getToken().then(response => {
          this.qiniu.token = response.data
        })
      },
    },
    mounted () {
      this.getQiniuToken()
      this.contents=this.content
      //  自定义粘贴图片功能
      // let quill = this.$refs.customQuillEditor.quill
      // // if (!this.disableFlag) {
      // //   toolbarOptions[0] = ['image']
      // // }
      // toolbarOptions[0] = ['image']
      // this.$forceUpdate()
      // quill.root.addEventListener('paste', evt => {
      //   console.log(evt)
      //   if (evt.clipboardData && evt.clipboardData.files && evt.clipboardData.files.length) {
      //     evt.preventDefault();
      //     console.log(evt.clipboardData.files);
      //     [].forEach.call(evt.clipboardData.files, file => {
      //       if (!file.type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
      //         return
      //       }
      //       this.uploadToServer(file, (res) => {
      //         // 获取光标内容
      //         var range = quill.getSelection()
      //         if (range) {
      //           this.uploadAttachment(res, file, null)
      //           //  将光标移动到图片后面
      //           this.$refs.myQuillEditor.quill.setSelection(range.index + 1)
      //         }
      //       })
      //     })
      //   }
      // }, false)
    },
    watch:{
      contents(newVal, oldVal) {
        this.$emit('input', newVal);
      },
      content(newVal, oldVal) {
        this.contents=newVal;
      },
      eidtId(newVal, oldVal) {
        this.contents='';
      }
    }
  }
</script>

<style >
  .editor{
    min-height: 200px;
    margin-bottom: 60px;
  }
  #quillEditorQiniu .ql-editor{
    height:300px;
  }
</style>
