<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShow = false"
      />
    </form>
    <!-- 判断3个组件显示  data中的数据为空也可以在v-if中做判断，空的话就是false -->
    <search-result v-if="isShow" :search-text="searchText"></search-result>

    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>

    <search-history v-else :historys="historys" @remove-all="historys=[]" @search="onSearch"></search-history>
  </div>
</template>

<script>
import searchHistory from "./search-history";
import searchSuggestion from "./search-suggestion";
import searchResult from "./search-result";
import { setItem, getItem } from "@/utils/storage";
export default {
  data() {
    return {
      searchText: "",
      // 控制子组件的显示
      isShow: false,
      // 把历史记录去本地储存获取，为空的话就使用空数组
      historys: getItem("toutiao_history") || [],
    };
  },
  created() {},
  computed: {},
  components: {
    searchHistory,
    searchSuggestion,
    searchResult,
  },
  watch: {
    // 监听方法有一个默认值， 就是改变的数据，只要里面内容发生改变就会被监听到
    historys(value) {
      setItem("toutiao_history", value);
    },
  },
  methods: {
    // 点击手机搜索按钮或者回车触发事件，显示搜索结果组件
    onSearch(val) {
      // 搜索框的值等于点击过好的值
      this.searchText = val;
      // 判断历史记录是否有这个值，有的话删除，然后在最前面添加
      const i = this.historys.indexOf(val);
      if (i !== -1) {
        this.historys.splice(i, 1);
      }
      this.historys.unshift(val);
      // 显示结果
      this.isShow = true;
    },
    // 点击取消事件， 哪里来回那去
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>