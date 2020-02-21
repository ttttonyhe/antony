<template>
  <div id="page">
    <div class="grid grid-centered">
      <div class="grid-cell" id="grid-cell">
        <article class="article reveal comment-article">
          <template v-if="loading">
            <div class="skeleton">
              <div class="skeleton-body" style="margin: 0px;">
                <div class="skeleton-title" style="width: 100%;"></div>
                <div class="skeleton-content" style="width: 70%;margin-top: 30px;"></div>
              </div>
            </div>
            <div class="skeleton" style="padding: 5px 10px;width: 80%;">
              <div class="skeleton-body" style="margin: 0px;">
                <div class="skeleton-content" style="width: 70%;margin: 0px;"></div>
              </div>
            </div>
            <div class="skeleton">
              <div class="skeleton-body" style="margin: 0px;">
                <div class="skeleton-content" style="width: 60%;margin: 0px;"></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div id="load">
              <header class="article-header comment-header">
                <h2 class="single-h2 page-title" v-html="page.title"></h2>
                <div class="article-list-footer page-footer">
                  <span class="article-list-date">{{ page.date }}</span>
                  <span class="article-list-divider">/</span>
                  <span class="article-list-minutes">{{ page.views }}&nbsp;Views</span>
                </div>
                <div class="single-line"></div>
              </header>
              <div class="article-content" v-html="page.content"></div>
              <div class="article-comments" id="article-comments">
                <iframe
                  :src="'https://www.ouorz.com/wp-content/themes/peg/comm/index.html?id=' + $route.params.id"
                  style="width: 100%;min-height: 100vh;"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </template>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page",
  data() {
    return {
      posts: null,
      loading: true, //v-if判断显示占位符
      errored: true,
      page: {
        title: "",
        content: "",
        views: "",
        date: ""
      }
    };
  },
  mounted() {
    //获取文章
    this.axios
      .get("https://www.ouorz.com/wp-json/wp/v2/pages/" + this.$route.params.id)
      .then(response => {
        this.posts = response.data;
      })
      .catch(() => {
        this.errored = false;
      })
      .finally(() => {
        this.page.title = this.posts.title.rendered;
        this.page.content = this.posts.content.rendered;
        this.page.views = this.posts.post_metas.views;
        this.page.date = this.posts.post_date;
        this.loading = false;
        // 手动访问一遍以增加访问量 2333
        this.axios.get("https://www.ouorz.com/comment.html");
      });
  }
};
</script>