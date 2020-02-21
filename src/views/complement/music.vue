<template>
  <div id="music">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <div id="header_info">
          <!-- 顶部标题与分类区块 -->
          <nav class="header-nav reveal">
            <div class="cate-nav">
              <div>
                <router-link to="/" class="top1 header-logo cate-name">{{ $t('lang.music.title') }}</router-link>
              </div>
              <div>
                <router-link to="/">
                  <b-button variant="primary" class="cate-back">
                    <i class="ri-arrow-left-line"></i>
                    {{ $t('lang.cate.backHome') }}
                  </b-button>
                </router-link>
              </div>
            </div>
            <p class="top2 lead archive-p">{{ $t('lang.music.des') }}</p>
          </nav>
          <topInside :loading="false" />
          <!-- 顶部标题与分类区块 -->
        </div>

        <ul class="article-list">
          <!-- 加载骨架图 -->
          <template v-if="loading">
            <li class="article-list-item reveal index-post-list bottom">
              <div class="skeleton">
                <div class="skeleton-head"></div>
                <div class="skeleton-body">
                  <div class="skeleton-title"></div>
                  <div class="skeleton-content"></div>
                </div>
              </div>
            </li>
          </template>
          <!-- 加载骨架图 -->
          <template v-else>
            <li
              class="article-list-item reveal index-post-list music-view-list"
              v-for="(post,index) in posts"
              :key="index"
              style="display: flex;"
            >
              <div class="link-list-left">
                <img :src="post.al.picUrl" class="link-list-img music-view-img" />
              </div>
              <div class="link-list-right music-view-right" style="flex-basis: 70%">
                <a
                  :href="'https://music.163.com/#/song?id='+post.id"
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <h5 class="music-view-h5" v-html="post.name"></h5>
                </a>
                <p v-html="post.al.name" class="music-view-p"></p>
                <div class="article-list-footer">
                  <span class="article-list-date" style="color: #ada8a8;">From {{post.ar[0].name}}</span>
                </div>
              </div>
            </li>
          </template>

          <div class="music-view-more">
            <a href="https://music.163.com/#/my/m/music/playlist?id=88891196">View More</a>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import header-top-inside
import topInside from "../../components/topInside";

export default {
  name: "Archive",
  components: {
    topInside
  },
  data() {
    return {
      posts: null,
      cates: null,
      des: null,
      loading: true, //v-if判断显示占位符
      loading_des: true,
      errored: true
    };
  },
  mounted() {
    //获取文章列表
    this.axios
      .get("https://api.imjad.cn/cloudmusic/?type=playlist&id=88891196")
      .then(response => {
        this.posts = response.data.playlist.tracks;
      })
      .catch(() => {
        this.errored = false;
      })
      .then(() => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }
};
</script>