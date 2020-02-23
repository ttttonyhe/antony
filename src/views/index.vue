<template>
  <div id="index">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <!-- 顶部标题与分类区块 -->
        <template v-if="!loading_tages">
          <headerTop :loading_tages="loading_tages" :loading_cates="loading_cates" :tages="tages" />
        </template>
        <template v-else>
          <headerTop :loading_tages="loading_tages" :loading_cates="loading_cates" />
        </template>
        <!-- 顶部标题与分类区块 -->

        <ul class="article-list">
          <!-- cookies 使用提示 -->
          <li
            class="article-list-item reveal index-post-list notice-list"
            v-if="notice.visible"
            v-b-tooltip.hover
            :title="$t('lang.index.cookieText')"
          >
            <div>{{ $t('lang.index.cookieText') }}</div>
            <a @click="discard_notice()" href="#">{{ $t('lang.index.cookie') }}</a>
          </li>
          <!-- cookies 使用提示 -->

          <li
            :class="'article-list-item reveal index-post-list ' + (post.sticky ? 'sticky-one' : '')"
            v-for="(post,index) in posts"
            :key="index"
            :id="'div' + post.id"
          >
            <!-- 不包含特色图像文章 -->
            <template
              v-if="post.post_img.url == false && post.post_categories[0].term_id !== 58 && !post.post_metas.status"
            >
              <div class="list-show-div">
                <!-- 置顶文章提示 -->
                <em class="article-list-type1 sticky-one-tag" v-if="post.sticky">
                  <i class="ri-arrow-up-circle-line"></i>
                  {{ $t('lang.index.atTop') }}
                </em>
                <!-- 置顶文章提示 -->
                <em
                  v-if="post.post_categories[0].term_id === 7"
                  class="article-list-type1"
                  v-html="'<b>' + post.post_categories[0].name + '</b>' +  ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : '技术')"
                ></em>
                <div v-else class="article-list-tags">
                  <a
                    class="list-normal-tag"
                    style="color: rgba(255, 152, 0, 0.83) !important;"
                    :href="post.post_categories[0].link"
                    v-html="post.post_categories[0].name"
                  ></a>
                  <template v-if="!post.post_tags.length">
                    <a style="margin-left: 5px;">{{ $t('lang.index.noneTag') }}</a>
                  </template>
                  <template>
                    <a
                      v-for="(tag,index) in post.post_tags.slice(0,2)"
                      :href="tag.url"
                      v-html="tag.name"
                      :key="index"
                      style="margin-left: 5px;"
                    ></a>
                  </template>
                </div>
                <button
                  type="button"
                  class="list-show-btn"
                  @click="post.id == previewPostOpened ? closePreview(post.id) : preview(post.id)"
                  :id="'btn'+post.id"
                >{{ $t('lang.index.quickView') }}</button>
              </div>

              <a :href="'/post/' + post.id" style="text-decoration: none;">
                <h5 v-html="post.title.rendered"></h5>
              </a>

              <!-- 文章速览 -->
              <!-- previewClose 已关闭的速览显示描述内容,previewPost 准备开始速览显示加载圆圈,previewPostOpened 开启的速览显示全文内容 -->
              <template v-if="previewClose !== post.id">
                <p
                  v-if="previewPost == post.id && previewPostOpened !== post.id"
                  class="article-list-content"
                  :id="post.id"
                >
                  <b-spinner variant="secondary" type="grow"></b-spinner>
                </p>
                <p
                  v-else-if="previewPostOpened == post.id && previewPost == post.id"
                  :id="post.id"
                  :class="'article-list-content ' + previewClass"
                  v-html="previewContent"
                ></p>
                <p
                  v-else
                  class="article-list-content"
                  :id="post.id"
                  v-html="post.post_excerpt.nine.substr(0, 80) + '...'"
                ></p>
              </template>
              <template v-else>
                <p
                  class="article-list-content"
                  :id="post.id"
                  v-html="post.post_excerpt.nine.substr(0, 80) + '...'"
                ></p>
              </template>
              <!-- 文章速览 -->

              <div class="article-list-footer">
                <span class="article-list-date">{{ post.post_date }}</span>
                <span class="article-list-divider">-</span>
                <span
                  v-if="post.post_metas.views !== ''"
                  class="article-list-minutes"
                >{{ post.post_metas.views }}&nbsp;Views</span>
                <span v-else class="article-list-minutes">0&nbsp;Views</span>
              </div>
            </template>
            <!-- 不包含特色图像文章 -->

            <!-- 包含特色图像文章 -->
            <template
              v-else-if="post.post_img.url && post.post_categories[0].term_id !== 58 && !post.post_metas.status"
            >
              <div class="article-list-img-else">
                <div
                  class="article-list-img"
                  :style="'background-image:url(' + post.post_img.url +')'"
                ></div>
                <div class="article-list-img-right">
                  <!-- 置顶文章提示 -->
                  <em class="article-list-type1 sticky-one-tag" v-if="post.sticky">
                    <i class="czs-arrow-up-l" style="font-size: 14px;font-weight: 600;"></i>
                    {{ $t('lang.index.atTop') }}
                  </em>
                  <!-- 置顶文章提示 -->
                  <em v-if="post.post_categories[0].term_id === 7" class="article-list-type1">
                    <b>{{ post.post_categories[0].name }}</b>
                    {{ ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : $t('lang.index.noneTag')) }}
                  </em>
                  <a v-else :href="post.post_categories[0].link" class="img-cate list-normal-tag" style="color: rgba(255, 152, 0, 0.83) !important;">
                    <b>{{ post.post_categories[0].name }}</b>
                    {{ ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : $t('lang.index.noneTag')) }}
                  </a>
                  <a :href="'/post/' + post.id" style="text-decoration: none;">
                    <h5
                      v-html="post.title.rendered"
                      style="margin: 0px;padding: 0px;margin-top:15px"
                    ></h5>
                  </a>
                  <p v-html="post.post_excerpt.four.substr(0, 65) + '...'" :id="post.id"></p>
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
            <!-- 包含特色图像文章 -->

            <!-- 状态类型文章 -->
            <template
              v-else-if="post.post_categories[0].term_id === 58 || !!post.post_metas.status"
            >
              <p class="article-list-content article-status" v-html="post.title.rendered"></p>
              <div class="article-list-footer">
                <span class="article-list-date">{{ post.post_date }}</span>
                <span class="article-list-divider">-</span>
                <span class="article-list-minutes">
                  <i class="ri-contrast-2-line"></i>
                  {{ $t('lang.index.mood') }} | {{ post.post_metas.status ? post.post_metas.status : $t('lang.index.noneMood') }}
                </span>
              </div>
            </template>
            <!-- 状态类型文章 -->
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
// import header-top
import headerTop from "../components/top";

// import infinite loading feature
import MugenScroll from "vue-mugen-scroll";

// import jQuery feature
import $ from "jquery";

// imort hightlight.js feature and stylesheet
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";

// highlightjs 初始化函数
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

export default {
  name: "Index",
  components: {
    headerTop,
    MugenScroll
  },
  data() {
    return {
      posts: null,
      posts_id_sticky: "0",
      cates: null,
      tages: null,
      loading: true, //v-if判断显示占位符
      loading_cates: true,
      loading_tages: true,
      errored: true,
      loading_css: "",
      version: "&categories_exclude=5,2,74",
      previewPost: 0,
      previewPostOpened: 0,
      previewContent: "",
      previewClass: "",
      previewClose: 0,
      loading_first: false,
      loading_end: false,
      notice: {
        visible: false
      },
      lang: "zh-CN",
      listLoading: {},
      paged: 1,
      pageLoading: false
    };
  },
  mounted() {
    highlightCode();
    //获取分类
    this.axios
      .get("https://blog.ouorz.com/wp-json/wp/v2/categories?exclude=1,58")
      .then(response => {
        this.cates = response.data;
      })
      .then(() => {
        this.loading_cates = false;

        //获取标签
        this.axios
          .get(
            "https://blog.ouorz.com/wp-json/wp/v2/tags?orderby=count&order=desc&per_page=15"
          )
          .then(response => {
            this.tages = response.data;
          })
          .then(() => {
            this.loading_tages = false;
          });
      });

    //判断 cookie 说明阅读
    if (parseInt(this.cookie.get("ouorz_read_cookie")) !== 1) {
      this.notice.visible = true;
    }

    //获取文章列表
    this.axios
      .get(
        "https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=1&per_page=10" +
          this.version
      )
      .then(res_sticky => {
        this.posts = res_sticky.data;

        //获取顶置文章 IDs 以在获取其余文章时排除
        for (var s = 0; s < this.posts.length; ++s) {
          this.posts_id_sticky += "," + this.posts[s].id;
        }

        this.axios
          .get(
            "https://blog.ouorz.com/wp-json/wp/v2/posts?sticky=0&per_page=10&exclude=" +
              this.posts_id_sticky +
              this.version
          )
          .then(res_normal => {
            //拼接其余文章
            this.posts = this.posts.concat(res_normal.data);
          });
      })
      .catch(() => {
        this.errored = false;
      })
      .finally(() => {
        this.loading = false;
        this.loading_first = true;
        this.paged = 2; //加载完1页后累加页数
      });
  },
  methods: {
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
              this.version
          )
          .then(response => {
            if (response.data.length !== 0) {
              //判断是否最后一页
              $("#view-text").html(
                "-&nbsp;" + this.listLoading.list + "&nbsp;-"
              );
              this.posts.push.apply(this.posts, response.data); //拼接在上一页之后
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
          });
      }
    },
    // 文章内容快速预览
    preview: function(postId) {
      $("#btn" + this.previewPost).html("全文速览"); //以防未收起上个预览，更改上个预览按钮
      this.previewPost = postId; //准备预览文章 ID
      this.axios
        .get("https://blog.ouorz.com/wp-json/wp/v2/posts/" + postId)
        .then(response => {
          this.previewPostOpened = postId; //正在预览文章 ID
          if (response.data.length !== 0) {
            //判断是否最后一页
            $("#btn" + postId).html("收起预览"); //开始预览，更改按钮
            this.previewContent = response.data.content.rendered; //加载文章内容
            this.previewClass = "preview-p"; //更改预览内容块 class
            window.location.hash = "#div" + postId;
          } else {
            this.previewContent = "这里什么都没有..."; //无内容默认展示
            this.previewClass = "preview-p"; //更改预览内容区块 class
          }
        });
    },
    // 关闭文章内容快速预览
    closePreview: function(postId) {
      $("#btn" + postId).html("全文速览"); //收起预览，更改按钮
      this.previewClose = postId; //收起预览的文章 ID
      this.previewContent = ""; //初始化预览内容
      this.previewPost = 0; //初始化准备预览文章 ID
      this.previewPostOpened = 0; //初始化正在预览文章 ID
      this.previewClass = ""; //初始化预览内容块 class
      this.previewClose = 0; //初始化已收起预览的文章 ID
    },
    // 关闭 cookies 使用提示
    discard_notice() {
      this.cookie.set("ouorz_read_cookie", 1);
      this.notice.visible = false;
    }
  },
  // 监听页面变化
  updated() {
    // 页面内容变化时执行代码渲染
    highlightCode();
  }
};
</script>