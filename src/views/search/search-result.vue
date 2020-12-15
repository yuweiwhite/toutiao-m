<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，稍后再试"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResult } from "@/api/search";
export default {
  data() {
    return {
      list: [],
      // 显示文本加载中的loading
      loading: false,
      // 控制没有数据显示文本提示没有了
      finished: false,
      page: 1, // 页面
      perPage: 15, // 当前页的条数
      // 加载失败重新load事件
      error: false,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        const { data: res } = await getResult({
          page: this.page, // 页码
          per_page: this.perPage, // 一页多少条数据
          q: this.searchText, // 搜索文本内容
        });
        // 这里不能直接赋值，应该后面还需要加载数据，只能push
        this.list.push(...res.data.results);

        // 加载状态结束
        this.loading = false;

        // 判断是否还有数据
        if (res.data.results.length) {
          // 还有数据就让页码值+1
          this.page++;
        } else {
          // 没数据了显示没有更多数据了
          this.finished = true;
        }
      } catch (err) {
        // 发生错误就设置可以重新加载load事件
        this.error = true;
        // 错误关闭加载的loading
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>