<template>
  <div class="cates">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <div id="header_info">
          <nav class="header-nav reveal">
            <div class="cate-nav">
              <div>
                <router-link to="/" class="top1 header-logo cate-name" v-html="cate.name"></router-link>
              </div>
              <div>
                <router-link to="/">
                  <b-button
                    variant="primary"
                    :class="includeChinese(cate.name) ? 'cate-back' : 'cate-back-en'"
                  >
                    <i class="ri-arrow-left-line"></i>
                    {{ $t('lang.cate.backHome') }}
                  </b-button>
                </router-link>
              </div>
            </div>
            <p class="top2 lead archive-p" v-html="cate.description"></p>
          </nav>
          <!-- 顶部标题与分类区块 -->
          <template v-if="!loading_stop">
            <topInside :loading="loading_stop" />
          </template>
          <template v-else>
            <topInside :loading="!loading_stop" />
          </template>
          <!-- 顶部标题与分类区块 -->
        </div>
        <ul class="article-list">
          <li
            :class="'article-list-item reveal index-post-list ' + (post.sticky ? 'sticky-one' : '')"
            v-for="(post,index) in posts"
            :style="post.post_categories[0].term_id | link_style"
            :key="index"
          >
            <template
              v-if="post.post_img.url == false || post.post_categories[0].term_id == 2 || post.post_categories[0].term_id == 5"
            >
              <em class="article-list-type1 sticky-one-tag" v-if="post.sticky">
                <i class="czs-arrow-up-l" style="font-size: 14px;font-weight: 600;"></i>
                {{ $t('lang.index.atTop') }}
              </em>
              <em v-if="post.post_categories[0].term_id == 7" class="article-list-type1">
                <b>{{ post.post_categories[0].name }}</b>
                {{ ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : $t('lang.index.noneTag')) }}
              </em>
              <a
                v-else-if="post.post_categories[0].term_id !== 2 && post.post_categories[0].term_id !== 5 && post.sticky"
                :href="post.post_categories[0].link"
                v-html="post.post_categories[0].name"
                class="img-cate"
              ></a>
              <div v-if="post.post_categories[0].term_id == 2" class="link-list-left">
                <img :src="post.post_metas.img[0]" class="link-list-img" />
              </div>
              <div
                class="link-list-right"
                :style="query_style_list(post.post_categories[0].term_id,post.sticky)"
              >
                <a
                  v-if="post.post_categories[0].term_id == 2 || post.post_categories[0].term_id == 5"
                  :href="post.post_metas.link+'?ref=https://www.ouorz.com'"
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <h5 style="margin-top: 10px;" v-html="post.title.rendered"></h5>
                </a>

                <router-link v-else :to="'/post/' + post.id" style="text-decoration: none;">
                  <h5 v-html="post.title.rendered"></h5>
                </router-link>
                <p
                  :class="post.post_categories[0].term_id == 2 ? 'cate-link-item-p' : ''"
                  v-html="post.post_excerpt.nine.substr(0, 80) + '...'"
                ></p>
                <div class="article-list-footer">
                  <span
                    class="article-list-date"
                  >{{ post.post_categories[0].term_id | link_page }}{{ post.post_date }}</span>
                  <span
                    class="article-list-divider"
                    v-if="post.post_categories[0].term_id !== 2 && post.post_categories[0].term_id !== 5"
                  >-</span>
                  <span
                    class="article-list-minutes"
                    v-if="post.post_categories[0].term_id !== 2 && post.post_categories[0].term_id !== 5"
                  >{{ post.post_metas.views }}&nbsp;Views</span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="article-list-img-else">
                <div
                  class="article-list-img"
                  :style="'background-image:url(' + post.post_img.url +')'"
                ></div>
                <div class="article-list-img-right">
                  <em class="article-list-type1 sticky-one-tag" v-if="post.sticky">
                    <i class="czs-arrow-up-l" style="font-size: 14px;font-weight: 600;"></i>
                    {{ $t('lang.index.atTop') }}
                  </em>
                  <em v-if="post.post_categories[0].term_id == 7" class="article-list-type1">
                    <b>{{ post.post_categories[0].name }}</b>
                    {{ ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : $t('lang.index.noneTag')) }}
                  </em>
                  <a
                    v-else
                    :href="post.post_categories[0].link"
                    v-html="post.post_categories[0].name"
                    class="img-cate"
                  ></a>

                  <router-link :to="'/post/' + post.id" style="text-decoration: none;">
                    <h5
                      v-html="post.title.rendered"
                      style="margin: 0px;padding: 0px;margin-top:15px"
                    ></h5>
                  </router-link>
                  <p v-html="post.post_excerpt.nine.substr(0, 80) + '...'" :id="post.id"></p>
                  <div class="article-list-footer">
                    <span class="article-list-date">{{ post.post_date }}</span>
                    <span class="article-list-divider">-</span>
                    <span
                      v-if="post.post_metas.views !== ''"
                      class="article-list-minutes"
                    >{{ post.post_metas.views }}&nbsp;Views</span>
                    <span v-else class="article-list-minutes">0&nbsp;Views</span>
                  </div>
                </div>
              </div>
            </template>
          </li>

          <!-- 无限滚动占位内容 -->
          <mugen-scroll :handler="new_page" :should-handle="loading_first">
            <li class="article-list-item reveal index-post-list bottom" v-if="!loading_end">
              <div class="skeleton">
                <div class="skeleton-head"></div>
                <div class="skeleton-body">
                  <div class="skeleton-title"></div>
                  <div class="skeleton-content"></div>
                </div>
              </div>
            </li>
          </mugen-scroll>
          <!-- 无限滚动占位内容 -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import jquery features
import $ from "jquery";

// import header-top-inside
import topInside from "../../components/topInside";

// import infinite loading feature
import MugenScroll from "vue-mugen-scroll";

export default {
  name: "Cates",
  components: {
    topInside,
    MugenScroll
  },
  data() {
    return {
      posts: null,
      posts_id_sticky: "0",
      cate: {
        name: "分类目录",
        description: "分类目录描述"
      },
      loading: true, //v-if判断显示占位符
      loading_cate: true,
      errored: true,
      loading_stop: false,
      loading_first: false,
      loading_end: false,
      paged: 1,
      pagedLoading: false,
      listLoading: {}
    };
  },
  created() {
    //屏蔽错误
    window.onerror = function() {
      return true;
    };
    this.loadCatePage(this.$route.params.id);
  },
  watch: {
    $route(to) {
      Object.assign(this.$data, this.$options.data());
      if (to.name == "Cate") {
        this.loadCatePage(to.params.id);
      }
    }
  },
  methods: {
    loadCatePage: function(cateId) {
      //获取当前分类信息
      this.axios
        .get("https://blog.ouorz.com/wp-json/wp/v2/categories/" + cateId)
        .then(response => {
          this.cate = response.data;
        })
        .finally(() => {
          this.loading_cate = false;

          // 变更标题
          document.title = "TonyHe - " + this.cate.name;

          //获取文章列表
          this.axios
            .get(
              "https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=1&categories=" +
                cateId
            )
            .then(res_sticky => {
              this.posts = res_sticky.data;

              //获取顶置文章 IDs 以在获取其余文章时排除
              for (var s = 0; s < this.posts.length; ++s) {
                this.posts_id_sticky += "," + this.posts[s].id;
              }

              this.loading_stop = true;

              this.axios
                .get(
                  "https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=0&categories=" +
                    cateId +
                    "&exclude=" +
                    this.posts_id_sticky +
                    "&per_page=10&page=" +
                    this.paged
                )
                .then(res_normal => {
                  //拼接其余文章
                  this.posts = this.posts.concat(res_normal.data);
                });
            })
            .catch(() => {
              this.errored = false;
            })
            .then(() => {
              this.loading = false;
              this.loading_first = true;
              this.paged = 2; //加载完1页后累加页数
            });
        });
    },
    // 判断分类目录名称是否包含中文调整「返回主页」按钮位置
    includeChinese: str => {
      if (escape(str).indexOf("%u") < 0) {
        return false;
      } else {
        return true;
      }
    },
    //定义方法
    query_style_list: function(cate, sticky) {
      if (cate == 5) {
        return "flex-basis: 100%;";
      } else if (cate !== 7 && cate !== 2 && !sticky) {
        return "margin-top: -10px;";
      }
    },
    //加载下一页文章列表
    new_page: function() {
      //语言包匹配
      if (this.$i18n.locale == "zh-CN") {
        this.listLoading = {
          loading: "加载中",
          list: "文章列表",
          all: "全部文章"
        };
      } else {
        this.listLoading = {
          loading: "Loading",
          list: "Posts List",
          all: "All Posts"
        };
      }
      if (!this.pagedLoading) {
        this.pagedLoading = true;
        $("#view-text").html("-&nbsp;" + this.listLoading.loading + "&nbsp;-");
        this.axios
          .get(
            "https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=0&exclude=" +
              this.posts_id_sticky +
              "&per_page=10&page=" +
              this.paged +
              "&categories=" +
              this.$route.params.id
          )
          .then(response => {
            if (response.data.length !== 0) {
              //判断是否最后一页
              $("#view-text").html(
                "-&nbsp;" + this.listLoading.list + "&nbsp;-"
              );
              this.posts = this.posts.concat(response.data); //拼接在上一页之后
              this.paged += 1;
            } else {
              $("#view-text").html(
                "-&nbsp;" + this.listLoading.list + "&nbsp;-"
              );
              this.loading_first = false;
              this.loading_end = true;
            }
            this.pagedLoading = false;
          })
          .catch(() => {
            $("#view-text").html("-&nbsp;" + this.listLoading.all + "&nbsp;-");
            this.paged = 1;
            this.loading_first = false;
            this.loading_end = true;
            this.pagedLoading = true;
          });
      }
    }
  },
  filters: {
    link_page: function(cate_id) {
      if (cate_id == 2) {
        return "添加于 ";
      } else if (cate_id == 5) {
        return "创造于 ";
      } else {
        return "";
      }
    },
    link_style: function(cate_id) {
      if (cate_id == 2 || cate_id == 5) {
        return "display: flex;";
      } else {
        return "";
      }
    }
  }
};
</script>
