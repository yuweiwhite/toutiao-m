<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="birthdayConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async birthdayConfirm() {
      this.$toast.loading({
        message: "修改中",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 0代表不会关闭，如果后续又有调用者就会直接覆盖
      });
      try {
        // 处理时间格式
        const birth = dayjs(this.currentDate).format("YYYY-MM-DD");
        await editUserProfile({
          birthday: birth,
        });
        // 点击确定关闭弹框
        this.$emit("close");
        // 让父组件更新页面数据
        this.$emit("input", birth);
        this.$toast.success("修改成功");
      } catch (err) {
        this.$toast.fail("修改用户生日失败");
      }
    },
  },
};
</script>

<style>
</style>