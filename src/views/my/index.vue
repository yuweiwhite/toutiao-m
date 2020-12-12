<template>
  <div class="my-container">
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="my-img" round fit="cover" :src="userInfo.photo" />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="data-top">{{userInfo.art_count}}</span>
          <span class="data-bom">头条</span>
        </div>
        <div class="data-item">
          <span class="data-top">{{userInfo.fans_count}}</span>
          <span class="data-bom">关注</span>
        </div>
        <div class="data-item">
          <span class="data-top">{{userInfo.follow_count}}</span>
          <span class="data-bom">粉丝</span>
        </div>
        <div class="data-item">
          <span class="data-top">{{userInfo.like_count}}</span>
          <span class="data-bom">获赞</span>
        </div>
      </div>
    </div>
    <!-- ~@是src路径 -->
    <div v-else class="header not-header">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" />
        <span class="text">登录 \ 注册</span>
      </div>
    </div>
    <!-- grid 宫格 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-row">
        <i slot="icon" class="iconshop iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-row">
        <i slot="icon" class="iconshop iconlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell class="cell-row" title="退出登录" v-if="user" @click="onLogout" clickable />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user.js";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    // 点击退出按钮事件，刚开始定义的token传递1个参数，如果state中的user是空，等于清空了token
    onLogout() {
      this.$dialog
        .confirm({
          title: "确定要退出吗",
        })
        .then(() => {
          // on confirm
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取个人信息接口，每个接口需要一个成功和失败的函数
    async loadUserInfo() {
      try {
        const { data: res } = await getUserInfo();
        this.userInfo = res.data;
      } catch (err) {
        this.$toast("获取个人信息失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .not-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    height: 361px;
    // width: 100%;
    background: url("~@/assets/banner.png");
    background-size: cover;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .my-img {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        span {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      color: #fff;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .data-top {
          font-size: 36px;
        }
        .data-bom {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 8px;
    .grid-row {
      height: 141px;
      .iconshoucang {
        color: #eb5253;
        font-size: 45px;
      }
      .iconlishi {
        font-size: 45px;
        color: #ffb553;
      }
      .text {
        font-size: 28px;
      }
    }
  }

  .cell-row {
    text-align: center;
    color: #d86262;
    margin-top: 8px;
  }
}
</style>