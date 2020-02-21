<template>
  <div id="comments">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <div id="header_info">
          <!-- 顶部标题与分类区块 -->
          <nav class="header-nav reveal">
            <div class="cate-nav">
              <div>
                <router-link to="/" class="top1 header-logo cate-name">{{ $t('lang.comments.title') }}</router-link>
              </div>
              <div>
                <router-link to="/">
                  <b-button variant="primary" class="cate-back">
                    <i class="ri-arrow-left-line"></i> {{ $t('lang.cate.backHome') }}
                  </b-button>
                </router-link>
              </div>
            </div>
            <p class="top2 lead archive-p">{{ $t('lang.comments.des') }}</p>
          </nav>
          <topInside :loading="false" />
          <!-- 顶部标题与分类区块 -->
        </div>

        <ul class="article-list">
          <!-- 加载骨架图 -->
          <li class="article-list-item reveal index-post-list bottom" v-if="loading">
            <div class="skeleton">
              <div class="skeleton-head"></div>
              <div class="skeleton-body">
                <div class="skeleton-title"></div>
                <div class="skeleton-content"></div>
              </div>
            </div>
          </li>
          <!-- 加载骨架图 -->
          <li
            v-for="(post,index) in posts"
            class="article-list-item reveal index-post-list"
            :key="index"
          >
            <div>
              <em
                style="color: rgb(153, 153, 153);font-style: normal;padding: 3px 7px;border-radius: 4px;background: #f1f2f3;"
              >{{ post.nick }}</em>
              <em
                style="color: rgb(153, 153, 153);font-style: normal;padding: 3px 7px;border-radius: 4px;background: #f1f2f3;margin-left: 5px;"
              >{{ post.email }}</em>
            </div>
            <a :href="'https://www.ouorz.com/'+post.page_key" style="text-decoration:none">
              <markdown-it-vue class="md-body content-c" :content="post.content" />
            </a>
            <div class="archive-footer">
              <em>{{ post.date }}</em>
              <em>
                <a :href="post.link">{{ $t('lang.comments.viewLink') }}</a>
              </em>
            </div>
          </li>
          <div class="music-view-more" v-if="!loading">
            <a href="#">{{ $t('lang.comments.total') }} {{ posts.length }} {{ $t('lang.comments.line') }}</a>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import header-top-inside
import topInside from "../../components/topInside";

// import markdown features
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  name: "Comments",
  components: {
    topInside,
    MarkdownItVue
  },
  data() {
    return {
      flag: false,
      posts: null,
      loading: true, //v-if判断显示占位符
      errored: true
    };
  },
  mounted() {
    //获取文章列表
    this.axios
      .get(
        "https://www.ouorz.com/wp-content/themes/peg/com/data/comments.data.json"
      )
      .then(response => {
        this.posts = response.data.reverse();
      })
      .catch(() => {
        this.errored = false;
      })
      .then(() => {
        this.loading = false;
      });
  }
};
</script>