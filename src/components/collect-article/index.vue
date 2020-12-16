<template>
  <van-icon
    :color="value?'#ffa500':''"
    :name="value?'star':'star-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { deleteCollect, addCollect } from "@/api/article";
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    collectId: {
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
    async onCollect() {
      this.loading = true;
      try {
        if (this.value) {
          await deleteCollect(this.collectId);
        } else {
          await addCollect(this.collectId);
        }
        this.$emit("input", !this.value);
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (err) {
        this.$toast("操作失败，稍后重试");
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>