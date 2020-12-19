<template>
  <div class="user-profile">
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <input type="file" hidden ref="fileRef" @change="fileChange" />
    <van-cell title="头像" is-link @click="$refs.fileRef.click()">
      <van-image class="image" :src="profile.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="profile.name" @click="isNameShow = true" />
    <van-cell title="性别" is-link :value="profile.gender===0?'男':'女'" @click="isGenderShow=true" />
    <van-cell title="生日" is-link :value="profile.birthday" @click="isBirthdayShow=true" />
    <!-- 昵称弹出层 -->
    <van-popup v-model="isNameShow" position="bottom" :style="{ height: '100%' }">
      <update-name v-if="isNameShow" @close="isNameShow = false" v-model="profile.name" />
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup v-model="isGenderShow" position="bottom" :style="{ height: '30%' }">
      <update-gender v-if="isGenderShow" @close="isGenderShow = false" v-model="profile.gender" />
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="isBirthdayShow" position="bottom" :style="{ height: '30%' }">
      <update-birthday
        v-if="isBirthdayShow"
        @close="isBirthdayShow = false"
        v-model="profile.birthday"
      />
    </van-popup>
    <!-- 头像弹出层 -->
    <van-popup v-model="isPhotoShow" position="bottom" :style="{ height: '100%' }">
      <update-photo
        v-if="isPhotoShow"
        @close="isPhotoShow = false"
        :img="img"
        @update-photo="profile.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { userProfile } from "@/api/user";
import UpdateName from "./update-name";
import UpdateGender from "./update-gender";
import UpdateBirthday from "./update-birthday";
import UpdatePhoto from "./update-photo";
export default {
  data() {
    return {
      profile: {},
      isNameShow: false, // 修改昵称控制弹框
      isGenderShow: false, // 修改性别控制弹框
      isBirthdayShow: false, // 修改生日控制弹框
      isPhotoShow: false,
      img: null,
    };
  },
  components: {
    UpdateName, // 修改昵称页面组件
    UpdateGender, // 修改性别页面组件
    UpdateBirthday, // 修改生日页面组件
    UpdatePhoto,
  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const { data: res } = await userProfile();
        console.log(res);
        this.profile = res.data;
      } catch (err) {
        this.$toast("获取用户信息失败");
      }
    },
    fileChange() {
      // 拿到图片路径
      const file = this.$refs.fileRef.files[0];
      // 获取到图片的完整路径
      this.img = window.URL.createObjectURL(file);
      // 打开头像弹出层
      this.isPhotoShow = true;
      // 当点击同一张图片的时候不会触发change事件，需要把上次图片的值清空
      this.$refs.fileRef.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .image {
    width: 60px;
    height: 60px;
  }
  /deep/.van-popup {
    background-color: #f5f7f9;
  }
}
</style>