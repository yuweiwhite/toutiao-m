<template>
  <div class="details-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="details.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{details.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="details.aut_photo" />
          <div slot="title" class="user-name">{{details.aut_name}}</div>
          <div slot="label" class="publish-date">{{details.pubdate | relativeTime}}</div>
          <!-- 关注按钮多次使用，封装成组件 -->
          <!-- 这里可以使用v-model绑定数据，默认子组件用value接收，监听是input事件传过来,需要修改名字的话需要配置个medel对象 -->
          <follow-user class="follow-btn" v-model="details.is_followed" :follow-id="details.aut_id"></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="detailsContent" v-html="details.content"></div>
        <van-divider>正文结束</van-divider>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
          <van-icon name="comment-o" badge="123" color="#777" />
          <!-- 收藏按钮拆分组件 -->
          <collect-article v-model="details.is_collected" :collect-id="details.art_id"></collect-article>
          <!-- 点赞组件拆分 -->
          <like-article v-model="details.attitude" :like-id="details.art_id"></like-article>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadDetails">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/api/article";
// 图片预览
import { ImagePreview } from "vant";
import followUser from "@/components/follow-user";
import collectArticle from "@/components/collect-article";
import likeArticle from "@/components/like-article";
export default {
  data() {
    return {
      details: {},
      loading: true,
      errStatus: 0,
    };
  },
  components: { followUser, collectArticle, likeArticle },
  props: {
    id: {
      type: [Number, String, Object],
      required: true,
    },
  },
  created() {
    this.loadDetails();
  },

  methods: {
    async loadDetails() {
      // 点击重新加载需要显示loading
      this.loading = true;
      try {
        const { data: res } = await getDetails(this.id);
        this.details = res.data;
        console.log(res.data);
        // 一开始拿不到dom元素，直接调用是undefind 这里需要异步才能拿到dom节点
        setTimeout(() => {
          this.previewImg();
        }, 0);
      } catch (err) {
        // 如果状态是404需要显示文章不存在那条信息。
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
        this.$toast("获取文章详情失败");
      }
      // 不管成功失败都需要关闭loading
      this.loading = false;
    },
    previewImg() {
      // 拿到标签中所有的IMG， 遍历拿到所有的src，给每个图片绑定点击事件，显示图片预览对象
      const imgs = this.$refs.detailsContent.querySelectorAll("img");
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.onclick = () => {
          // 图片预览对象
          ImagePreview({
            images,
            // 显示第几张
            startPosition: index,
          });
        };
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.details-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>