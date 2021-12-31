/*
 * @Author: your name
 * @Date: 2021-12-30 18:04:43
 * @LastEditTime: 2021-12-30 18:31:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mine-admin\src\permission.js
 */
import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { Message } from "element-ui";
import { getToken, removeToken } from "@/utils/auth"; // 验权

// permissiom judge
function hasPermission(roles, permissionRoles) {
  return true;
  if (roles.indexOf("admin") >= 0) return true; // admin权限 直接通过
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}
// 不重定向白名单
const whiteList = "/login";
router.beforeEach((to, from, next) => {
  
  // 开启Progress
  var params = to.query;
  var ticket = params.ticket;
  var code = params.code;
  store.dispatch("GenerateRoutes").then(() => {
    // 生成可访问的路由表
    router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
    // next({ ...to }); // hack方法 确保addRoutes已完成
  });
  next();
  return;
  if (null != ticket && null != code) {
    next();
  } else {
    NProgress.start();
    if (localStorage.getItem("info")) {
      // 判断是否有token
      if (to.path === "/login") {
        next({ path: "/" });
        NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      } else if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
      } else {
        store.dispatch("GenerateRoutes").then(() => {
          // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          // next({ ...to }); // hack方法 确保addRoutes已完成
        });
        next();
        return;
        if (store.getters.roles.length === 0) {
          // 判断当前用户是否已拉取完user_info信息
          store
            .dispatch("GetInfo")
            .then(res => {
              // 拉取用户信息
              const roles = res.data.data.roles;
              store.dispatch("GenerateRoutes", { roles }).then(() => {
                // 生成可访问的路由表
                router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                next({ ...to }); // hack方法 确保addRoutes已完成
              });
            })
            .catch(e => {
              store.dispatch("FedLogOut").then(() => {
                Message.error("验证失败,请重新登录");
                next({ path: "/login" });
              });
            });
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          if (hasPermission(store.getters.roles, to.meta.role)) {
            next(); //
          } else {
            next({ path: "/401", query: { noGoBack: true } });
            NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
          }
          // 可删 ↑
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        removeToken();
        next();
      } else {
        next("/login"); // 否则全部重定向到登录页
        NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
