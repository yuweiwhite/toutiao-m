<template>
  <div class="updata-photo">
    <img :src="img" ref="imgs" />
    <footer>
      <div class="close" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </footer>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user";
export default {
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  mounted() {
    const image = this.$refs.imgs;
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
      movable: true, // 背景可以移动
    });
  },
  methods: {
    onConfirm() {
      // this.cropper.getData()  客户端处理图片直接传
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updatePhoto(blob);
      });
    },
    async updatePhoto(blob) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      try {
        const formData = new FormData();
        formData.append("photo", blob);
        const { data: res } = await updateUserPhoto(formData);
        // 关闭弹层，更新视图
        this.$emit("close");
        this.$emit("update-photo", res.data.photo);
        this.$toast("更新成功");
      } catch (err) {
        this.$toast("更新失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.updata-photo {
  background-color: pink;
  height: 100%;
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 30px;
    .close,
    .confirm {
      width: 90px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    display: block;
    max-width: 100%;
  }
}
</style>