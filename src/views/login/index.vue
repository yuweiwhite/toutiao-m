<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit" ref="loginFormRef">
      <!-- number只能输入数字，maxlength是最大输入长度 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconshop iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconshop iconyanzhengma"></i>
        <template #button>
          <!-- 倒计时  配置看文档 -->
          <van-count-down
            :time="1000*60"
            format="ss s"
            v-if="daojishishow"
            @finish="daojishishow=false"
          />
          <van-button
            size="small"
            v-else
            round
            class="fasong-btn"
            native-type="button"
            type="default"
            @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入login 接口axios请求
import { login, sendSms } from "@/api/user.js";
export default {
  data() {
    return {
      user: {
        mobile: "17090086870",
        code: "246810",
      },
      // 表单验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
          },
          {
            pattern: /^1\d{10}$/,
            message: "请输入正确格式手机号",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确验证码",
          },
        ],
      },
      // 倒计时show
      daojishishow: false,
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      // toast弹出提示
      this.$toast.loading({
        message: "登录中",
        forbidClick: true, // 禁用背景点击
        duration: 0, // 0代表不会关闭，如果后续又有调用者就会直接覆盖
      });
      // try 是成功的Promise   catch 是失败的Promise
      try {
        const { data: res } = await login(user);
        this.$store.commit("setUser", res.data);
        console.log("登录成功", res);
        this.$toast.success("登录成功");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          this.$toast.fail("登录失败,请稍后重试");
        }
      }
    },
    // 发送验证码事件
    async onSendSms() {
      try {
        // 验证手机号是否通过
        await this.$refs.loginFormRef.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 打开倒计时
      this.daojishishow = true;
      try {
        // 调用获取手机验证码的接口
        await sendSms(this.user.mobile);
      } catch (err) {
        this.daojishishow = false;
        if (err.response.status === 429) {
          this.$toast("发送太频繁，请稍后再试");
        } else {
          this.$toast("发送失败，请稍后再试");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .iconshop {
    font-size: 37px;
  }
  .fasong-btn {
    height: 46px;
    width: 160px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
    }
  }
}
</style>