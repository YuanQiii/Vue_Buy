/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 20:59:27
 * @FilePath: \vue_buy\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

const Dashboard = () => import("@/views/dashboard/Dashboard.vue");

const Home = () => import("@/views/home/Home.vue");
const Category = () => import("@/views/category/Category.vue");
const Eat = () => import("@/views/eat/Eat.vue");
const Cart = () => import("@/views/cart/Cart.vue");
const Mine = () => import("@/views/mine/Mine.vue");

const MineInfoDetail = () => import("@/views/mine/info/MineInfoDetail.vue");
const MineOrderStatus = () => import("@/views/mine/order/MineOrderStatus.vue");
const CouponList = () => import("@/views/mine/coupon/CouponList.vue");
const AddressList = () => import("@/views/mine/address/AddressList.vue");
const AddressEdit = () => import("@/views/mine/address/AddressEdit.vue");

const Login = () => import("@/views/login/Login.vue");
const PhoneLogin = () => import('@/views/login/PhoneLogin.vue')
const CaptchaLogin = () => import('@/views/login/CaptchaLogin.vue')
const VipInfo = () => import("@/views/vip/VipInfo.vue");
const VipPay = () => import("@/views/vip/VipPay.vue");
const GoodsDetail = () => import("@/views/goods/GoodsDetail.vue");
const Order = () => import("@/views/order/Order.vue");

const MapContainer = () => import("@/views/map/MapContainer")

Vue.use(VueRouter);

// 二级路由不需要添加'/'
const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    // 数据是否缓存
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    children: [
      {
        path: '',
        redirect: 'PhoneLogin'
      },
      {
        path: 'phoneLogin',
        name: 'PhoneLogin',
        component: PhoneLogin
      },
      {
        path: 'captchaLogin',
        name: 'CaptchaLogin',
        component: CaptchaLogin
      }
    ]
  },
  {
    path: "/mineInfoDetail",
    name: "MineInfoDetail",
    component: MineInfoDetail,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/MineOrderStatus",
    name: "MineOrderStatus",
    component: MineOrderStatus,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/CouponList",
    name: "CouponList",
    component: CouponList,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/AddressList",
    name: "AddressList",
    component: AddressList,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/AddressEdit",
    name: "AddressEdit",
    component: AddressEdit,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/VipInfo",
    name: "VipInfo",
    component: VipInfo,
  },
  {
    path: "/VipPay",
    name: "VipPay",
    component: VipPay,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/goodsDetail",
    name: "goodsDetail",
    component: GoodsDetail,
  },
  {
    path: "/order",
    name: "order",
    component: Order,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      {
        path: "/",
        redirect: "home",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "home",
        name: "home",
        component: Home,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "category",
        name: "category",
        component: Category,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "eat",
        name: "eat",
        component: Eat,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "cart",
        name: "cart",
        component: Cart,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "mine",
        name: "mine",
        component: Mine,
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: '/map',
    name: 'map',
    component: MapContainer,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 更新底部导航栏
  switch (to.name) {
    case "home":
      store.commit("UPDATE_HOME_ACTIVE", 0);
      break;
    case "category":
      store.commit("UPDATE_HOME_ACTIVE", 1);
      break;
    case "eat":
      store.commit("UPDATE_HOME_ACTIVE", 2);
      break;
    case "cart":
      store.commit("UPDATE_HOME_ACTIVE", 3);
      break;
    case "mine":
      store.commit("UPDATE_HOME_ACTIVE", 4);
      break;
    default:
      store.commit("UPDATE_HOME_ACTIVE", 0);
      break;
  }

  //根据属性值判断是否需要登录
  if (to.meta.requireAuth) {
    if (store.state.user.userInfo.token != null) {
      next();
    } else {
      //防止无限循环
      if (to.name === "login") {
        next();
        return;
      }
      next({
        path: "/login",
      });
    }
  } else {
    next(); //若点击的是不需要验证的页面,则进行正常的路由跳转
  }
});

export default router;
