<!--
 * @Description: 登录页面
 * @Author: ZY
 * @Date: 2020-12-28 16:27:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-30 18:35:44
-->

<template>
  <div class="login-container">
    <video
      :poster="require('../../assets/images/login/video-cover.jpeg')"
      loop
      autoplay
      muted
    >
      <source
        :src="require('../../assets/images/login/night.mp4')"
        type="video/mp4"
      />
    </video>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
        <!-- <LangSelect :isWhite="true" class="set-language" /> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          ref="userNameRef"
          v-model="loginForm.username"
          :placeholder="1111"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="22222"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye-off' : 'eye-on'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span> </span>
          <span></span>
        </div>
        <div class="tips">
          <span></span>
          <span></span>
        </div>
        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialogFn"
        >
          第三方登录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import SocialSign from "./components/SocialSignin.vue";
// import { getClientId } from "@/api/login";
export default {
  components: {
    // SocialSign,
  },
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [{ validator: "userNameRef", trigger: "blur" }],
        password: [{ validator: "passwordRef", trigger: "blur" }],
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      capsTooltip: false,
      redirect: "",
      otherQuery: {},
    };
  },
  methods: {
    showDialogFn() {
      
    },
    handleLogin() {

      // localStorage.setItem("info","11111")
      // this.$router.push("/dashboard/home")

      return
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          await store.dispatch(UserActionTypes.ACTION_LOGIN, this.loginForm);
          router
            .push({
              path: this.redirect || "/",
              query: this.otherQuery,
            })
            .catch((err) => {
              console.warn(err);
            });
          // Just to simulate the time of the request
          setTimeout(() => {
            this.loading = false;
          }, 0.5 * 1000);
        } else {
          return false;
        }
      });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip =
        key !== null && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      nextTick(() => {
        this.$refs.passwordRef.focus();
      });
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      caret-color: #fff;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: #2d3a4b;
  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  // @media only screen and (max-width: 470px) {
  //   .thirdparty-button {
  //     display: none;
  //   }
  // }
}
</style>
