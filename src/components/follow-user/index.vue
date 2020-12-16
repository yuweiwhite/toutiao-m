<template>
  <!-- 封装成组件，如果外面用个div包起来的话样式每次都要重新调，这里v-if等于一个标签，不需要外成盒子包起来 -->
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollowed"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollowed"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    followId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // 点击关注按钮事件
    async onFollowed() {
      // 注意一个小细节，如果网速慢用户点击关注后或很慢才会显示，可以使用禁用按钮或者使用loading来处理
      this.loading = true;
      try {
        // 判断是关注还是取消关注， 调用不同的接口， 页面绑定的数据不能调那个接口成功后都要取反
        if (this.value) {
          await deleteFollow(this.followId);
        } else {
          await addFollow(this.followId);
        }
        //  让父组件的值改变
        this.$emit("input", !this.value);
      } catch (err) {
        // 这里需要知道不能关注自己这个细节， 文本提示
        let message = "操作失败，稍后再试";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast(message);
      }
      // 不管成功与否都要关闭loading
      this.loading = false;
    },
  },
};
</script>

<style>
</style>