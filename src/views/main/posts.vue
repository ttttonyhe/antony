<template>
  <div id="posts">
    <div class="grid grid-centered">
      <div class="grid-cell" id="grid-cell">
        <!-- 左侧区块 -->
        <div class="single-left" :style="(exist_index ? '' : 'margin-top:-15px')" v-if="!loading">
          <div class="index-div">
            <div class="single-index">
              <h4>
                <i class="ri-list-check-2"></i>
                {{ $t('lang.post.index') }}
              </h4>
            </div>
            <ul id="article-index" class="index-ul"></ul>
          </div>
          <div>
            <div
              class="index-div-next"
              v-if="(!!post_prenext.prev && post_prenext.prev[0] !== null && post_prenext.prev[2] !== 2 && post_prenext.prev[2] !== 5 && post_prenext.prev[2] !== 58)"
            >
              <h4>
                <i class="czs-hande-vertical"></i>
                {{ $t('lang.post.prev') }}
              </h4>
              <p>
                <a :href="'/post/' + post_prenext.prev[0]" v-html="post_prenext.prev[1]"></a>
              </p>
            </div>
            <div
              class="index-div-next"
              v-if="(!!post_prenext.next && post_prenext.next[0] !== null && post_prenext.next[2] !== 2 && post_prenext.next[2] !== 5 && post_prenext.next[2] !== 58)"
            >
              <h4>
                <i class="czs-hand-horizontal"></i>
                {{ $t('lang.post.next') }}
              </h4>
              <p>
                <a :href="'/post/' + post_prenext.next[0]" v-html="post_prenext.next[1]"></a>
              </p>
            </div>
            <div
              class="index-div-next single-donate"
              v-else-if="!!post_prenext.next && post_prenext.next[0] !== null && post_prenext.next[2] !== 74"
            >
              <router-link class="single-donate-a" to="/donation">
                {{ $t('lang.post.donation') }}
                <i class="ri-hand-heart-line"></i>
              </router-link>
            </div>
          </div>
        </div>
        <!-- 左侧区块 -->

        <!-- 文章主体 -->

        <!-- 阅读进度条 -->
        <div class="reading-bar"></div>
        <!-- 阅读进度条 -->

        <article class="article reveal">
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
              <!-- 文章顶部 -->
              <div class="article-header">
                <span class="badge badge-pill badge-danger single-badge">
                  <router-link to="/" style="text-decoration:none">
                    <i class="ri-article-line"></i>
                    {{ $t('lang.post.des') }}
                  </router-link>
                </span>
                <span class="badge badge-pill badge-danger single-badge" style="margin-left: 10px;">
                  <a :href="cate_url" class="post-header" v-html="cate">{{ $t('lang.post.cate') }}</a>
                </span>
                <span
                  class="badge badge-pill badge-danger single-badge"
                  style="margin-left: 10px;"
                  v-b-tooltip.hover
                  :title="$t('lang.post.estimate')"
                >
                  <a
                    :href="cate_url"
                    class="post-header"
                    v-html="posts.post_metas.reading.time_required + ' mins'"
                  >{{ $t('lang.post.readingTime') }}</a>
                </span>
                <!-- 文章标题 -->
                <h2 class="single-h2" v-html="posts.post_metas.title"></h2>
                <!-- 文章标题 -->

                <!-- 底部信息 -->
                <div class="article-list-footer">
                  <span class="article-list-date">{{ posts.post_date }}</span>
                  <span class="article-list-divider">/</span>
                  <span class="article-list-minutes">{{ posts.post_metas.views }}&nbsp;Views</span>
                  <span class="article-list-divider">/</span>
                  <span
                    class="article-list-minutes"
                  >{{ posts.post_metas.reading.word_count}} &nbsp;Words</span>
                </div>
                <!-- 底部信息 -->

                <div class="single-line"></div>
              </div>
              <!-- 文章顶部 -->

              <!-- 文章内容 -->
              <div class="article-content" v-html="posts.content.rendered"></div>
              <!-- 文章内容 -->

              <!-- 文章标签 -->
              <div
                style="text-align: left;margin: 60px 0px 40px 8px;border-radius: 6px;"
                v-if="post_tags.length"
              >
                <ul
                  class="post_tags"
                  style="margin: 0;padding: 0px;width: 100%;padding-bottom: 15px;"
                >
                  <li
                    class="cat-real"
                    style="display: inline-block;color: rgb(102, 102, 102);font-size: 1.1rem;font-weight: 600;margin: 0px;letter-spacing: 1px;"
                  >
                    <a
                      style="background-color: #e7f3ff;color: #2f94fe;padding: 1px 12px 1px;border-radius: 4px;font-size: .9rem;"
                    >{{ $t('lang.post.tag') }}</a>
                  </li>
                  <li
                    class="cat-real"
                    style="display: inline-block;"
                    v-for="(tag,index) in post_tags"
                    :key="index"
                  >
                    <router-link
                      :to="'/tag/' + tag.id"
                      target="_blank"
                      v-html="tag.name"
                      style="font-size: .9rem;border-radius: 4px;padding: 1px 12px 1px;"
                    ></router-link>
                  </li>
                </ul>
              </div>
              <!-- 文章标签 -->

              <!-- 文章评论 -->
              <div class="article-comments" id="article-comments" style="margin-top:50px">
                <iframe
                  :src="'https://blog.ouorz.com/wp-content/themes/peg/comm/index.html?id=' + this.$route.params.id"
                  style="width: 100%;height: -webkit-fill-available;"
                  frameborder="0"
                ></iframe>
              </div>
              <!-- 文章评论 -->
            </div>
          </template>
        </article>
        <!-- 文章主体 -->
      </div>
    </div>
  </div>
</template>

<script>
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
  name: "Posts",
  data() {
    return {
      posts: null,
      loading: true, //v-if判断显示占位符
      errored: true,
      cate: "分类目录",
      cate_url: "",
      post_tags: [],
      post_prenext: [],
      exist_index: true,
      post_title: "Loading..."
    };
  },
  created() {
    //获取文章
    this.axios
      .get(
        "https://blog.ouorz.com/wp-json/wp/v2/posts/" + this.$route.params.id
      )
      .then(response => {
        this.posts = response.data;
      })
      .catch(() => {
        this.errored = false;
      })
      .then(() => {
        this.loading = false;
        this.post_title = this.posts.post_metas.title;
        this.cate = this.posts.post_categories[0].name;
        this.cate_url = this.posts.post_categories[0].link;
        this.post_tags = this.posts.post_tags;
        this.post_prenext = this.posts.post_prenext;

        $(".real").css("display", "block");
        highlightCode();

        document.title = "TonyHe - " + this.posts.title.rendered;

        // 手动访问一遍以增加访问量 2333
        this.axios.get("https://blog.ouorz.com/post/" + this.$route.params.id);
      });
  },
  methods: {
    createReadingBar: () => {
      //文章阅读进度条
      var content_offtop = $(".article-content").offset().top;
      var content_height = $(".article-content").innerHeight();
      $(window).scroll(function() {
        if ($(this).scrollTop() > content_offtop) {
          //滑动到内容部分
          if ($(this).scrollTop() - content_offtop <= content_height) {
            //在内容部分内滑动
            this.reading_p = Math.round(
              (($(this).scrollTop() - content_offtop) / content_height) * 100
            );
          } else {
            //滑出内容部分
            this.reading_p = 100;
          }
        } else {
          //未滑到内容部分
          this.reading_p = 0;
        }
        $(".reading-bar").css("width", this.reading_p + "%");
      });
    },
    createIndex: () => {
      /* 文章目录 */
      var h = 0;
      var pf = 23;
      var i = 0;
      $("#article-index").html("");
      var count_in, count_ar, count_sc, count_e;
      var count_ti = (count_in = count_ar = count_sc = count_e = 1);
      var offset = new Array();
      var min = 0;
      var c = 0;
      var icon = "";

      //获取最高级别h标签
      $(".article-content>:header").each(function() {
        h = $(this)
          .eq(0)
          .prop("tagName")
          .replace("H", "");
        if (c == 0) {
          min = h;
          c++;
        } else {
          if (h <= min) {
            min = h;
          }
        }
      });

      //获取h标签内容
      $(".article-content>:header").each(function() {
        h = $(this)
          .eq(0)
          .prop("tagName")
          .replace("H", ""); //标签级别
        for (i = 0; i < Math.abs(h - min); ++i) {
          //偏移程度
          pf += 10;
        }
        if (pf !== 23) {
          //图标
          icon = "ri-stop-line";
        } else {
          icon = "ri-checkbox-blank-circle-line";
        }

        $("#article-index").html(
          $("#article-index").html() +
            '<li id="ti' +
            count_ti++ +
            '" style="padding-left:' +
            pf +
            'px"><a><i class="' +
            icon +
            '"></i>&nbsp;&nbsp;' +
            $(this)
              .eq(0)
              .text()
              .replace(/[ ]/g, "") +
            "</a></li>"
        ); //创建目录
        $(this)
          .eq(0)
          .attr("id", "in" + count_in++); //添加id
        offset[0] = 0;
        offset[count_ar++] = $(this)
          .eq(0)
          .offset().top; //位置存入数组
        count_e++;
        pf = 23; //设置初始偏移值
        i = 0; //设置循环开始
      });

      //跳转对应位置事件
      $("#article-index li").click(function() {
        $("html,body").animate(
          {
            scrollTop:
              $(
                "#in" +
                  $(this)
                    .eq(0)
                    .attr("id")
                    .replace("ti", "")
              ).offset().top - 100
          },
          500
        );
      });

      if (count_e !== 1) {
        //若存在h3标签

        $(window).scroll(function() {
          //滑动窗口时
          var scroH = $(this).scrollTop() + 130;
          var navH = offset[count_sc]; //从1开始获取当前h3位置
          var navH_prev = offset[count_sc - 1]; //获取上一个h3位置(以备回滑)
          if (scroH >= navH) {
            //滑过当前h3位置
            $("#ti" + (count_sc - 1)).attr("class", "");
            $("#ti" + count_sc).attr("class", "active");
            $("#article-index").animate(
              {
                scrollTop: $("#article-index>#ti" + count_sc)[0].offsetTop
              },
              100
            );
            count_sc++; //调至下一个h3位置
          }
          if (scroH <= navH_prev && count_sc - 2 !== 0) {
            //滑回上一个h3位置,调至上一个h3位置
            $("#ti" + (count_sc - 2)).attr("class", "active");
            $("#article-index").animate(
              {
                scrollTop:
                  $("#article-index>#ti" + (count_sc - 2))[0].offsetTop - 50
              },
              100
            );
            count_sc--;
            $("#ti" + count_sc).attr("class", "");
          }
          if (scroH <= navH_prev && count_sc - 2 == 0) {
            //首个标题直接滑动至顶部
            $("#ti1").attr("class", "active");
            $("#article-index").scrollTop(0);
          }
        });
      } else {
        $(".index-div").css("display", "none");
        this.exist_index = false;
      }
      /* 文章目录 */
    }
  },
  // 监听页面变化
  updated() {
    // 页面内容变化时生成目录
    this.createIndex();
    // 页面变化时监听阅读进度条
    this.createReadingBar();
    // 页面内容变化时执行代码渲染
    highlightCode();
    // 加载完毕改变 title
    if (this.posts.length) {
      document.title = "TonyHe - " + this.posts.title.rendered;
    }
  },
  watch: {
    $route() {
      Object.assign(this.$data, this.$options.data());
      $(window).unbind("scroll");
    }
  }
};
</script>