<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        class="search-btn"
        type="info"
        round
        size="small"
        icon="search"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- 标签页  active是绑定当前高亮的索引， swipeable手滑动 animated动画-->
    <van-tabs class="home-tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list :channel="item"></article-list>
      </van-tab>
      <!-- 右插槽， 背景边框 -->
      <div slot="nav-right" class="before-right"></div>
      <!-- 右插槽，icon图标 -->
      <div slot="nav-right" class="icon-right">
        <i class="iconshop icongengduo" @click="isChannelShow=true"></i>
      </div>
    </van-tabs>
    <!-- 弹出层Popup -->
    <van-popup
      v-model="isChannelShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 内容组件化 -->
      <channel-edit :my-channel="channels" :active="active" @update-active="onActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from "@/api/user";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
// 导入局部组件
import ArticleList from "./article-list";
import ChannelEdit from "./channel-edit";
export default {
  data() {
    return {
      active: 0,
      // 频道列表数据tab
      channels: [],
      // 弹窗
      isChannelShow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.loadUserChannel();
  },
  methods: {
    // 调用频道列表数据接口,需要判断用户是否登入
    async loadUserChannel() {
      try {
        let channa = [];
        // 用户登录就调用接口，直接赋值数据
        if (this.user) {
          const { data: res } = await getUserChannel();
          channa = res.data.channels;
        } else {
          // 用户未登录状态， 需要获取本地存储的数据，如果没有就需要调用默认数据接口
          if (getItem("toutiao")) {
            channa = getItem("toutiao");
          } else {
            // 没有本地储存调用默认数据接口
            const { data: res } = await getUserChannel();
            channa = res.data.channels;
          }
        }
        this.channels = channa;
      } catch (err) {
        this.$toast("获取频道信息列表数据失败");
      }
    },
    // 子组件监听事件
    onActive(i, boo) {
      // 频道推荐点击跳转到指定页面，让当前的active值改变， 子组件不能直接改变父组件的值
      this.active = i;
      // 关闭弹窗
      this.isChannelShow = boo;
    },
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    border: none;
    font-size: 28px;
    background-color: #5babfb;
    color: #fff;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .home-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      color: #777;
      font-size: 28px;
      min-width: 200px;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
      font-size: 30px;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .icon-right {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 67px;
      height: 82px;
      background-color: #ffffff;
      opacity: 0.9;
      i {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        left: 0;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .before-right {
      width: 67px;
      height: 82px;
      // 不参与flex平分剩余空间
      flex-shrink: 0;
    }
  }
}
</style>