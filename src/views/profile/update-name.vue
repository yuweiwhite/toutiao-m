<template>
  <div class="update-name">
    <van-nav-bar
      title="个人信息"
      left-text="取消"
      right-text="完成"
      @click-right="editUserName"
      @click-left="$emit('close')"
    />
    <van-field
      class="field-wrap"
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  data() {
    return {
      localName: this.value,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async editUserName() {
      // toast弹出提示
      this.$toast.loading({
        message: "修改中",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 0代表不会关闭，如果后续又有调用者就会直接覆盖
      });
      try {
        // 判断用户有没有填写昵称
        if (this.localName.length === 0) {
          this.$toast("请输入内容");
          return;
        }
        // 调用接口更新昵称数据
        await editUserProfile({ name: this.localName });
        // 关闭弹框
        this.$emit("close");
        // 更新父组件数据
        this.$emit("input", this.localName);
        this.$toast.success("修改成功");
      } catch (err) {
        this.$toast.fail("修改用户昵称失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.update-name {
  .field-wrap {
    margin: 20px !important;
  }
}
</style>