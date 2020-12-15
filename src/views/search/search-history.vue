<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="deleteShow">
        <span @click="$emit('remove-all')">全部删除</span> &nbsp;&nbsp;&nbsp;
        <span @click="deleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="deleteShow = true" />
    </van-cell>
    <van-cell :title="item" v-for="(item,i) in historys" :key="i" @click="deleteHistory(item,i)">
      <van-icon name="close" v-show="deleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteShow: false,
    };
  },
  props: {
    historys: {
      type: Array,
      required: true,
    },
  },

  methods: {
    //点击每个cell单元格事件，判断是删除状态还是跳转，删除状态直接删除数组中的某一项。
    //复杂类型可以改里面属性，简单类型不能直接改，需要传递给父组件改变值
    deleteHistory(item, index) {
      if (this.deleteShow) {
        // 删除历史记录
        this.historys.splice(index, 1);
      } else {
        // 跳转
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style>
</style>