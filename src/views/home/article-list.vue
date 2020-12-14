<template>
  <div class="home-article">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-duration="1500"
      :success-text="scsText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item v-for="(item,index) in list" :key="index" :article="item"></article-item>
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article";
import ArticleItem from "./article-item";
export default {
  data() {
    return {
      list: [],
      loading: false, // 数据每次加载10条，就会出现一次loading，自动会设置成true
      finished: false, //  控制显示没有数据到底部了。
      time: null, // 获取后端返回的时间戳
      error: false, // 加载失败显示文字提示
      isLoading: false, // 下拉刷新控制
      scsText: "更新成功", // 下拉更新成功显示文本
    };
  },
  created() {
    console.log(this.list);
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据,调用获取新闻列表信息
      try {
        const { data: res } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.time || +new Date(),
          with_top: 1,
        });
        // 结构得到的results，这个必须是返回的对象名一样
        const { results } = res.data;
        // 展开向list的数组合并
        this.list.push(...results);
        // 加载状态结束
        this.loading = false;
        // 判断是否还有数据， 如果没数据就显示到底部了， 有数据就把获取的时间戳赋值给接口数据对象
        if (results.length) {
          this.time = res.data.pre_timestamp;
        } else {
          // 显示到底部了
          this.finished = true;
        }
      } catch (err) {
        // 错误原因提示重新加载
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data: res } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: +new Date(),
          with_top: 1,
        });
        // 结构得到的results，这个必须是返回的对象名一样
        const { results } = res.data;
        // 展开向list的数组合并， 在数组最前面插入最新数据
        this.list.unshift(...results);
        // 关闭下拉更新显示
        this.isLoading = false;
        // 刷新成功显示文字提示
        this.scsText = `更新成功，更新了${results.length}信息`;
      } catch (err) {
        // 如果下拉刷新失败了也要关闭下拉更新，之后再文本提示失败了
        this.isLoading = false;
        this.scsText = "更新失败，稍后再试";
      }
    },
  },

  components: {
    ArticleItem,
  },
};
</script>

<style lang="less" scoped>
.home-article {
  // 游览器可视区高度， 按屏幕中高度/100来算 1vh就是总高度的百分之一
  height: 79vh;
  overflow-y: auto; // 溢出滚动
}
</style>