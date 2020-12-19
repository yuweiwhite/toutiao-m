<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :error.sync="error"
    error-text="加载失败，请点击重试"
    :immediate-check="false"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- 把评论内容封装成一个组件，直接遍历组件 -->
    <comment-item
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
    />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import commentItem from "./comment-item";
export default {
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    // default不是必传的数据，没有的话就使用自己的
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      validator(val) {
        return ["a", "c"].includes(val);
      },
      default: "a",
    },
  },
  components: { commentItem },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,  // 
      limit: 10, // 一次加载多少条数据
      error: false, // 加载失败文不提示
    };
  },
  created() {
    this.loading = true;
    // 可视窗口不到不会触发函数，一开始就要获取评论数据，所有渲染页面前就要拿到数据
    this.onLoad();
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        // 调用获取评论接口，
        const { data: res } = await getComments({
          type: this.type, // 获取评论还是回复
          source: this.source.toString(), // 文章id，大数字需要自己改成字符串
          offset: this.offset, // 后续数据会返回一个id，需要传id才能拿到后续数据
          limit: this.limit, // 一次获取多少条数据
        });
        console.log(res, 11);
        // 这里是list列表，可能有很多数据，不能直接赋值，只能push追加
        this.list.push(...res.data.results);
        // 父组件需要显示有多少条评论，在这里传过去，让父组件监听来改变值
        this.$emit("load-tatol", res.data);
        // 加载状态结束，关闭loading
        this.loading = false;
        //判断数据全部加载完成，如果有数据就让offset等于返回的lastid，就会获取后面的数据
        if (res.data.results.length) {
          this.offset = res.data.last_id;
        } else {
          // 没有数据了就关闭，显示没有更多了
          this.finished = true;
        }
      } catch (err) {
        // 加载失败可以点击load事件，让error等于true就行， 加载失败HTML中也绑定了提示
        this.error = true;
        // 关闭Loading
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>