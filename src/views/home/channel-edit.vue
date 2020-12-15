<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        round
        size="mini"
        plain
        class="edit-btn"
        @click="isEdit = !isEdit"
      >{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item v-for="(item,i) in myChannel" :key="i" class="grid-item">
        <!-- 这里第一个不能被删除，就是删除按钮不显示，加个判断当等于id第一个的时候不显示，查找条件需要取反 -->
        <van-icon name="clear" slot="icon" v-show="isEdit && !currentIndex.includes(item.id)" />
        <!-- :class=一个对象 里面键就是类名， 值是表达式代表true或者false来判断添加还是不添加 -->
        <span
          slot="text"
          class="text"
          :class="{active:i === active}"
          @click="onUpdate(item,i)"
        >{{item.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="all-grid" :gutter="10">
      <van-grid-item
        v-for="val in aarr"
        :key="val.id"
        :text="val.name"
        icon="plus"
        class="grid-item"
        @click="onAddChannel(val)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel.js";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  props: {
    myChannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // 所有频道数据
      allChannels: [],
      // 控制x按钮显示
      isEdit: false,
      // 给第一个不能显示删除
      currentIndex: [0],
    };
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      // filter过滤遍历数组符合条件的方法，会自己定义一个空数组，满足条件得都会Push进去
      // find是遍历数组，返回查询满足第一条数据返回， 这里如果满足就是都有，需要取反
      return this.allChannels.filter((item) => {
        return !this.myChannel.find((val) => {
          return item.id === val.id;
        });
      });
    },
    aarr() {
      const arr = [];
      this.allChannels.forEach((item) => {
        const ret = this.myChannel.find((val) => {
          return item.id === val.id;
        });
        if (!ret) {
          arr.push(item);
        }
      });
      return arr;
    },
  },

  methods: {
    // 获取所有频道数据接口
    async loadAllChannels() {
      try {
        const { data: res } = await getAllChannels();
        this.allChannels = res.data.channels;
      } catch (err) {
        this.$toast("获取新闻全部数据失败");
      }
    },
    // 点击下面按钮把当前数据给我的频道中添加，计算属性自己会重新计算页面
    async onAddChannel(val) {
      this.myChannel.push(val);
      // 判断用户是否登录
      if (this.user) {
        try {
          await addUserChannel({
            id: val.id,
            seq: this.myChannel.length,
          });
        } catch (err) {
          this.$toast("获取我的频道接口失败");
        }
      } else {
        // 没有登录的话也可以使用功能，把用户添加的数据保存到本地储存
        setItem("toutiao", this.myChannel);
      }
    },
    // 点击X我的频道事件，如果是编辑状态就跳转页面， 不是就删除当前的。
    onUpdate(item, i) {
      if (this.isEdit) {
        //  当前索引是第一个的是否不允许做以下操作
        if (this.currentIndex.includes(i)) {
          return;
        }
        if (i <= this.active) {
          // 根据索引删除当前，当删除之前的高亮会变，因为所有数据的索引值改变了
          // 当点击删除之前就让active值-1就可，同一个事件弹窗又会关闭，所有要多传一个参数进去
          this.$emit("update-active", this.active - 1, true);
        }
        this.myChannel.splice(i, 1);
        this.deleteChannel(item);
      } else {
        // 当前是未点击编辑状态，让页面跳转到点击的那个页面，就是让active改变
        this.$emit("update-active", i, false);
      }
    },

    // 封装一个删除我的频道数据接口
    async deleteChannel(val) {
      try {
        if (this.user) {
          await deleteUserChannel(val.id);
        } else {
          setItem("toutiao", this.myChannel);
        }
      } catch (err) {
        this.$toast("操作失败，稍后再试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    color: #333;
    font-size: 32px;
  }
  .edit-btn {
    width: 105px;
    height: 48px;
    border: 1px solid #f86262;
    color: #f86262;
    font-size: 26px;
  }
  /deep/ .my-grid {
    .grid-item {
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .all-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
      }
      i {
        font-size: 26px;
        margin-right: 6px;
      }
    }
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>