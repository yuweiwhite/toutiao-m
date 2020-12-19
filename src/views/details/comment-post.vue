<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="inputComment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button type="primary" size="small" @click="onPost" :disabled="!inputComment">发布</van-button>
  </div>
</template>

<script>
import { addPostComment } from "@/api/comment";
export default {
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
  },
  inject: {
    id: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      inputComment: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 0代表不会关闭，如果后续又有调用者就会直接覆盖
      });
      try {
        const { data: res } = await addPostComment({
          target: this.target.toString(),
          content: this.inputComment,
          art_id: this.id ? this.id.toString() : null,
        });
        console.log(res);
        // 清空文本框
        this.inputComment = "";
        //显示评论和关闭弹出框让父组件去操作
        this.$emit("post-success", res.data);
        this.$toast.success("发布成功");
      } catch (err) {
        this.$toast("评论失败", err);
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>