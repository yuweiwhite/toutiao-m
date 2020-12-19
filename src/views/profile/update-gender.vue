<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="genderIndex"
      @cancel="$emit('close')"
      @confirm="onGender"
      @change="changeGender"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
export default {
  data() {
    return {
      columns: ["男", "女"],
      genderIndex: this.value,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async onGender() {
      this.$toast.loading({
        message: "修改中",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 0代表不会关闭，如果后续又有调用者就会直接覆盖
      });
      try {
        // 调用接口更新性别数据
        await editUserProfile({ gender: this.genderIndex });
        // 关闭弹框
        this.$emit("close");
        //让父组件更新页面数据
        this.$emit("input", this.genderIndex);
        this.$toast.success("修改成功");
      } catch (err) {
        this.$toast.fail("修改性别失败");
      }
    },
    // change事件有三个参数，对象，选择值，索引
    changeGender(picker, val, index) {
      this.genderIndex = index;
    },
  },
};
</script>

<style>
</style>