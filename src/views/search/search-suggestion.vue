<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(item,i) in suggestions" :key="i" @click="$emit('search',item)">
      <div slot="title" v-html="htmlSearch(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from "@/api/search";
// 懒加载第三方lodash插件
import { debounce } from "lodash";
export default {
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    // 监听父组件传过来的数据变化
    searchText: {
      // handler是固定的函数名，调用lodash防抖函数
      handler: debounce(function (val) {
        this.loadSuggestions(val);
      }, 300),
      // 调用获取联想建议的接口，传入文本输入内容

      // 该回调将会在侦听开始之后被立即调用，不然第一次监听不到
      immediate: true,
    },
  },
  methods: {
    // 获取联想建议接口
    async loadSuggestions(q) {
      try {
        const { data: res } = await getSuggestions(q);
        this.suggestions = res.data.options;
      } catch (err) {
        this.$toast("获取数据失败，稍后再试");
      }
    },
    // 处理数据高亮的方法 需要return  不能使用//中间加入变量，需要用new 来创建一个正则表达式
    // replace 只能替换第一个， 使用正则可以全局替换， 在正则后面加g就是全局，i不区分大小写
    htmlSearch(item) {
      const str = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(reg, str);
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #09f;
  }
}
</style>