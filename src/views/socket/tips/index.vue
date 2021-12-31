<template>
    <div v-dialogDrag class="webscoketTips" v-show="tipsHide">
      <div v-show="!showTips">
        <div class="dialogDrag" style="border-top-left-radius: 6px;border-top-right-radius: 6px;height: 50px;background-color: rgb(108, 149, 245);position: relative;color: white">
          <span>预约提醒</span>
          <span class="el-icon-close close" @click="cancel"></span>
        </div>
        <div class="tips" v-show="tipsHide">
          <div class="tips-content">
            <div v-if="item.companyName" v-for="(item,index) in getTips" class="tips-item" @click="tipsContent(item)">
              <div class="index">{{index+1}}</div>
              <div>
                <div class="companyName">{{item.companyName}}</div>
                <div class="remindTime">{{item.remindTime| parseTime('{y}-{m}-{d}')}}</div>
              </div>
              <div class="open">
                <span class="el-icon-arrow-right"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  v-show="showTips" class="SmallTips">
        <el-badge :value=val class="item" style="padding: 3px">
          <span class="el-icon-message "></span>
        </el-badge>
        <span @click="open" style="cursor: pointer">我的消息</span>
      </div>
    </div>
</template>

<script>
  /* import {  getTips } from '@/utils/auth'*/
  export default {
    name: 'tips',
    computed: {
      /* ...mapGetters([
          'getWiFiList'
        ])*/
      getTips() {
        if (this.$store.state.user.tips.length != 0) {
          return this.$store.state.user.tips
        } else {
          this.val = ''
          this.tipsHide = true
        }
      }
    },
    data() {
      return {
        dialogFormVisible: true,
        showTips: true,
        tipsHide: true,
        list: null,
        positionX: 0,
        positionY: 0,
        val: 0
      }
    },
    methods: {
      tipsContent(val) {
        // this.$store.commit('SET_IS', 1)
        // this.$store.commit('SET_ITEM', val)
      },
      cancel() {
        this.showTips = true
        var el = document.querySelector('.webscoketTips')
        el.style.width = '200px'
        el.style.height = '50px'
        el.style.left = 'auto'
        el.style.top = 'auto'
        el.style.right = 0 + 'px'
        el.style.bottom = 0 + 'px'
      },
      open() {
        this.showTips = false
        var el = document.querySelector('.webscoketTips')

        el.style.width = '300px'
        el.style.height = '550px'
      }
    },
    watch: {
      getTips: function(val) {
        this.tipsHide = true
      },
      $route(to, from) {
        if (to.path == '/login/' || to.path == '/login') {
          this.tipsHide = false
        } else {
          this.tipsHide = true
        }
      }
    },
    created() {
      if (this.$route.path == '/login/' || this.$route.path == '/login') {
        this.tipsHide = false
      } else {
        this.tipsHide = true
      }
    }
  }
</script>
<style scoped>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar
  {
    width: 6px;
    height: 6px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #FFF;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #AAA;
  }

  .close{
    position: absolute;
    right: 15px;
    cursor: pointer
  }
  .SmallTips{
    width: 200px;
    padding: 15px;
  }
  .SmallTips span:nth-child(2){
    padding-left: 50px;
  }
  .notselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .tips{
  /*position: fixed;
  right: 10px;
  bottom: 0px;*/
  width: 300px;
  height: 450px;
  padding: 15px;
}
.dialogDrag{
  padding: 15px;
}
.tips-content{
  height: 430px;
  overflow: auto;
}
.index{
  position: absolute;
  left: 6px;
  top: 10px;
  width: 24px;
  height: 24px;
  text-align: center;
  background: #e4e4e4;
  border-radius: 50%;
  line-height: 25px;
}
.open{
  position: absolute;
  right: 6px;
  top: 15px;
}
.tips-item{
  padding: 5px 15px 5px 40px;
  font-size: 14px;
  position: relative;
  margin-top: 10px;
  border-bottom: 1px solid white;
  cursor: pointer
}
.remindTime{
  font-size: 14px;
  color: #999;
  margin-top: 5px;
}
.webscoketTips{
  width: 200px;
  height: 50px;
  position: fixed;
  right: 0px;
  bottom: 0px;
  background: #eee;
  /*color: white;*/
  z-index: 99999;
  border-radius: 15px;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3)
}
</style>
