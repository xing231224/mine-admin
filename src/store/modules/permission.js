/*
 * @Author: your name
 * @Date: 2021-12-24 10:34:53
 * @LastEditTime: 2021-12-27 14:24:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \1688_demo\src\store\modules\permission.js
 */
import { asyncRouterMap, constantRouterMap } from "@/router";
// import { fetchUserTree } from '@/api/menu'
/**
 * 动态权限判断
 * @param menuIds  用户拥有的菜单列表
 * @param route   菜单选择
 * @returns {boolean}
 */
function hasPermission(menuIds, route) {
  console.log(menuIds, route);
  let result = false;
  menuIds.filter(menuId => {
    if (menuId === route.menuId) {
      result = true;
    }
  });
  return result;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menuIds) {
  console.log(asyncRouterMap, menuIds);
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menuIds, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menuIds);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data;
        // let accessedRouters;
        // fetchUserTree().then(response => {
        //   if (roles.indexOf("admin") >= 0) {
        //     accessedRouters = asyncRouterMap;
        //   } else {
        //     accessedRouters = filterAsyncRouter(asyncRouterMap, response.data);
        //   }
        //   commit("SET_ROUTERS", accessedRouters);
        //   resolve();
        // });
        commit("SET_ROUTERS", asyncRouterMap);
        resolve();
      });
    }
  }
};
export default permission;
