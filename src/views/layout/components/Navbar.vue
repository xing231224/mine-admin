<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="top-context">
      <p>
        <el-button size="mini" type="primary" icon="el-icon-share"
          >联系客服</el-button
        >
      </p>
      <p>
        <el-button size="mini" type="primary" icon="el-icon-message"
          >意见反馈</el-button
        >
      </p>
      <p>
        <el-button size="mini" type="primary" icon="el-icon-sold-out"
          >续费</el-button
        >
      </p>
      <p>
        <el-tooltip effect="dark" content="桌面快捷" placement="bottom">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-download"
          ></el-button>
        </el-tooltip>
      </p>
    </div>
    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <el-tooltip effect="dark" content="点击查看更多功能" placement="bottom">
          <div class="avatar-wrapper">
            <img
              class="user-avatar"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              alt=""
            />
          </div>
        </el-tooltip>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item> 主页 </el-dropdown-item>
          </router-link>

          <router-link class="inlineBlock" to="/upload">
            <el-dropdown-item> 修改信息 </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided>
            <span @click="logout" style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
//   import { getInfo } from '@/api/leave/askLeave'
//   import img from '@/assets/img.png'
import { getJurisdiction } from "@/utils/jsonp";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  computed: {
    ...mapGetters(["name", "sidebar", "avatar", "permissions"]),
  },
  data() {
    return {
      //   img,
    //   jw_other: true,
    //   jw_executive: true,
    //   jw_hr: true,
    //   to_hr: true,
      hostName: "",
    };
  },
  methods: {
    setgetInfo() {
      getInfo().then((response) => {
        if (response.data) {
          this.to_hr = true;
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        getJurisdiction("", "out");
        // 为了重新实例化vue-router对象 避免bug
      });
    },
  },
  mounted() {
    //   this.jw_other = this.permissions['jw_other']
    //   this.jw_executive = this.permissions['jw_executive']
    //   this.jw_hr = this.permissions['jw_hr']
      this.hostName=window.location.hostname
    //   this.setgetInfo()
  },
};
</script>

<style lang="scss" scoped>
.juz {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.top-context {
  position: absolute;
  display: flex;
  justify-content: space-around;
  right: 150px;
  top: 0;
  i {
    font-size: 20px;
  }
  p {
    margin: 0 5px;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
  }
}
</style>

