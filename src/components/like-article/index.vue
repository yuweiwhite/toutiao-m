<template>
  <van-icon
    :color="value===1?'#f46d60':'#777'"
    :loading="loading"
    :name="value===1?'good-job':'good-job-o'"
    @click="onLike"
  />
</template>

<script>
import { deleteLike, addLike } from "@/api/article";
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    likeId: {
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
    async onLike() {
      this.loading = true;
      let status = -1;
      try {
        if (this.value === 1) {
          await deleteLike(this.likeId);
        } else {
          await addLike(this.likeId);
          status = 1;
        }
        this.$emit("input", status);
        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (err) {
        this.$toast.fail("操作失败");
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>