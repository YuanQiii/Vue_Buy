/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 16:32:12
 * @FilePath: \mall-vue\src\api\index.js
 */
import request from "./request";

// 主页请求
export function HomeApi() {
  return request({
    url: "homeApi",
    method: "get",
  });
}

// 分类请求
export function CategoriesApi() {
  return request({
    url: "categories",
    method: "get",
  });
}

// 分类详情请求
export function CategoriesDetailApi(index) {
  return request({
    url: "categoriesdetail",
    method: "get",
    params: {
      index,
    },
  });
}

// 密码登录
export function passwordLoginApi(phone, password) {
  return request({
    url: "login_pwd",
    method: "post",
    data: {
      phone,
      password,
    },
  });
}

// 发送验证码
export function captchaApi() {
  return request({
    url: "send_code",
    method: "get",
  });
}

// 验证码登录
export function captchaLoginApi(phone, captcha) {
  return request({
    url: "login_code",
    method: "post",
    data: {
      phone,
      captcha,
    },
  });
}

// 注册
export function registerApi(phone, password, captcha) {
  return request({
    url: "login_code",
    method: "post",
    data: {
      phone,
      password,
      captcha,
    },
  });
}

// 菜单分类
export function recipeAllSceneApi() {
  return request({
    url: "recipe/allScene",
    method: "get",
  });
}

// 菜单详情
export function recipeMenuListApi(index) {
  return request({
    url: "recipe/menulist",
    method: "get",
    params: {
      index,
    },
  });
}

// 猜你喜欢
export function cartYouLikeApi() {
  return request({
    url: "cart/youlike",
    method: "get",
  });
}

// VIP
export function vipApi() {
  return request({
    url: "vip",
    method: "get",
  });
}
