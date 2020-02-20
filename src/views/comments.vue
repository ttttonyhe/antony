<template>
  <div id="comments">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <div id="header_info">
          <!-- 顶部标题与分类区块 -->
          <nav class="header-nav reveal">
            <div class="cate-nav">
              <div>
                <router-link to="/" class="top1 header-logo cate-name">全站留言集</router-link>
              </div>
              <div>
                <router-link to="/">
                  <b-button variant="primary" class="cate-back">
                    <i class="ri-arrow-left-line"></i> 回到主页
                  </b-button>
                </router-link>
              </div>
            </div>
            <p class="top2 lead archive-p">全站文章内页评论条段</p>
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
            class="article-list-item reveal index-post-list uk-scrollspy-inview"
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
                <a :href="post.link">查看链接</a>
              </em>
            </div>
          </li>
          <div class="music-view-more" v-if="!loading">
            <a href="#">共 {{ posts.length }} 条</a>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import header-top-inside
import topInside from "../components/topInside";

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
        "https://www.ouorz.com/explorer/index.php?user/publicLink&fid=03dcRw0N3q1HCSMX7rfVuID1s6fGezpITuhaoBPWCvvckkqIrKRV2V16_3n3SIk0CK5WuG5M3iuIMXGOddSx6xcqRkEnYOCaCiikgqAX49QBryh4QlTAj8Y8A3TRFfJ4aHTJc-j8E0ooEw&file_name=/comments.data.json"
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