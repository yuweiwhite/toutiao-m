<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count>0?`${comment.reply_count}条回复`:'暂无回复'">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="content-wrap">
      <comment-item :comment="comment" />
      <van-cell title="全部回复" />
      <comment-list :source="comment.com_id" :list="listComment" :type="'c'" />
    </div>
    <div class="post-bottom">
      <van-button class="post-btn" round size="small" @click="isReplyShow = true">写评论</van-button>
    </div>
    <van-popup v-model="isReplyShow" position="bottom" :style="{ height: '30%' }">
      <comment-post :target="comment.com_id" @post-success="onReplySuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
import CommentPost from "./comment-post";
export default {
  components: { CommentItem, CommentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isReplyShow: false,
      listComment: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 子组件发布按钮点击事件
    onReplySuccess(data) {
      // 关闭弹出层
      this.isReplyShow = false;
      // nav导航数据+1
      this.comment.reply_count++;
      // 在回复列表数据最前面插入
      this.listComment.unshift(data.new_obj);
    },
  },
};
</script>

<style lang="less" scoped>
.content-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-bottom {
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  color: #fff;
  .post-btn {
    width: 60%;
  }
}
</style>