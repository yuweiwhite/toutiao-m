<template>
  <van-cell class="article-cell" :to="`/details/${article.art_id}`">
    <!-- van-multi-ellipsis--l2  最多显示2行文字，之后...代替， Vant内置模块 -->
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label">
      <!-- v-if判断图片有几张来显示隐藏  遍历图片数组渲染页面 -->
      <div v-if="article.cover.type===3" class="cover-item">
        <div v-for="(img,i) in article.cover.images" :key="i" class="cover-row">
          <van-image :src="img" fit="cover" class="cover-img" />
        </div>
      </div>
      <div class="cover-name">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- fit 是图片显示方式，拉伸还是...  v-if判断图片有几张来显示隐藏 -->
    <van-image
      class="img-default"
      fit="cover"
      v-if="article.cover.type===1"
      slot="default"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: { type: Object, required: true },
  },
};
</script>

<style lang="less" scoped>
.article-cell {
  .title {
    font-size: 32px;
    color: #333;
  }
  .cover-name span {
    font-size: 22px;
    margin-right: 25px;
    color: #b4b4b4;
  }
  .van-cell__value {
    // 取消flex分配，
    flex: unset;
    width: 234px;
    height: 145px;
    padding-left: 25px;
  }
  .img-default {
    width: 234px;
    height: 145px;
  }
  .cover-item {
    display: flex;
    margin: 30px 0;
  }
  .cover-row {
    flex: 1;
    height: 145px;
    // 选取子元素，不包括最后一个元素
    &:not(:last-child) {
      padding-right: 4px;
    }
    .cover-img {
      width: 100%;
      height: 145px;
    }
  }
}
</style>