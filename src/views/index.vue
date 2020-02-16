<template>
  <div id="index">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <div id="header_info" class="index-top">
          <nav class="header-nav reveal">
            <img class="header-avatar-top" src="https://static.ouorz.com/t.jpg" />
            <a
              style="text-decoration:none;"
              href="https://www.ouorz.com"
              class="header-logo"
              title="TonyHe"
            >TonyHe</a>

            <p class="lead" style="margin-top: 0px;margin-left:5px">Just A Poor Lifesinger</p>
          </nav>
          <div class="index-cates">
            <li
              class="cat-item cat-item-4 loading-line"
              style="display: inline-block;width: 98%;height: 35px;box-shadow: none;border-radius: 0px;background: rgb(236, 237, 239);"
              v-if="loading_cates"
            ></li>
            <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
              <a href="https://www.ouorz.com/category/friends" title="和伙伴们交换网站链接，再高兴不过的事!">
                <div class="header-item-icon-div">
                  <i class="ri-user-5-line"></i>
                </div>伙伴
              </a>
            </li>
            <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
              <a href="https://www.ouorz.com/category/resources" title="一些...小玩意儿">
                <div class="header-item-icon-div">
                  <i class="ri-dvd-line"></i>
                </div>推荐
              </a>
            </li>
            <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
              <a href="https://www.ouorz.com/category/projects" title="我所做过的每一个项目，都将在地球上留下独特的痕迹">
                <div class="header-item-icon-div">
                  <i class="ri-product-hunt-line"></i>
                </div>项目
              </a>
            </li>
            <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
              <a
                href="https://www.ouorz.com/category/lifetime"
                title="Talk about some shit in my life..."
              >
                <div class="header-item-icon-div">
                  <i class="ri-hand-heart-line"></i>
                </div>琐碎
              </a>
            </li>
            <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
              <a
                href="https://www.ouorz.com/category/research"
                title="To make the world a better place"
              >
                <div class="header-item-icon-div">
                  <i class="ri-code-box-line"></i>
                </div>折腾
              </a>
            </li>
            <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
              <a href="https://www.ouorz.com/music.html" title="音乐收藏与推荐">
                <div class="header-item-icon-div">
                  <i class="ri-netease-cloud-music-line"></i>
                </div>音乐
              </a>
            </li>
          </div>
          <div>
            <ul class="post_tags">
              <li class="cat-real" v-for="(tag,index) in tages" :key="index">
                <a :href="tag.link">#{{ tag.name }}</a>
              </li>
              <li
                class="loading-line"
                style="background: rgb(236, 237, 238);height: 25px;width: 100%;"
                v-if="loading_tages"
              ></li>
            </ul>
          </div>
        </div>

        <ul class="article-list">
          <li
            class="article-list-item reveal index-post-list notice-list"
            v-if="notice.visible"
            uk-tooltip="title:By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.; pos: left"
          >
            <div>By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.</div>
            <a @click="discard_notice()">Discard</a>
          </li>

          <li
            :class="'article-list-item reveal index-post-list ' + (post.sticky ? 'sticky-one' : '')"
            v-for="(post,index) in posts"
            :key="index"
            :id="'div' + post.id"
          >
            <template
              v-if="post.post_img.url == false && post.post_categories[0].term_id !== 58 && !post.post_metas.status"
            >
              <div class="list-show-div">
                <!-- 置顶文章提示 -->
                <em class="article-list-type1 sticky-one-tag" v-if="post.sticky">
                  <i class="czs-arrow-up-l" style="font-size: 14px;font-weight: 600;"></i> 置顶
                </em>
                <!-- 置顶文章提示 -->
                <em
                  v-if="post.post_categories[0].term_id === 7"
                  class="article-list-type1"
                  v-html="post.post_categories[0].name + ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : '技术')"
                ></em>
                <div v-else class="article-list-tags">
                  <a :href="post.post_categories[0].link" v-html="post.post_categories[0].name"></a>
                  <template v-if="!post.post_tags.length">
                    <a style="margin-left: 5px;">无标签</a>
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
                >全文速览</button>
              </div>

              <a :href="post.link" style="text-decoration: none;">
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
                    <i class="czs-arrow-up-l" style="font-size: 14px;font-weight: 600;"></i> 置顶
                  </em>
                  <!-- 置顶文章提示 -->
                  <em
                    v-if="post.post_categories[0].term_id === 7"
                    class="article-list-type1"
                  >{{ post.post_categories[0].name + ' | ' + (post.post_metas.tag_name ? post.post_metas.tag_name.toUpperCase() : '无标签') }}</em>
                  <a
                    v-else
                    :href="post.post_categories[0].link"
                    v-html="post.post_categories[0].name"
                    class="img-cate"
                  ></a>
                  <a :href="post.link" style="text-decoration: none;">
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

            <template
              v-else-if="post.post_categories[0].term_id === 58 || !!post.post_metas.status"
            >
              <p class="article-list-content article-status" v-html="post.title.rendered"></p>
              <div class="article-list-footer">
                <span class="article-list-date">{{ post.post_date }}</span>
                <span class="article-list-divider">-</span>
                <span class="article-list-minutes">
                  <i class="czs-chemistry"></i>
                  状态 | {{ post.post_metas.status ? post.post_metas.status : '无状态' }}
                </span>
              </div>
            </template>
          </li>

          <!-- 加载占位DIV -->
          <li
            class="article-list-item reveal index-post-list bottom"
            :style="'display:'+loading_css"
          >
            <div class="skeleton">
              <div class="skeleton-head"></div>
              <div class="skeleton-body">
                <div class="skeleton-title"></div>
                <div class="skeleton-content"></div>
              </div>
            </div>
          </li>
          <!-- 加载占位DIV -->

          <!-- 加载按钮 -->
          <button @click="new_page" id="scoll_new_list" style="opacity:0"></button>
          <!-- 加载按钮 -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import hljs from "highlight.js";
import "highlight.js/styles/rainbow.css";

// highlightjs 初始化函数
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

var click = 0; //初始化加载次数
var paged = 1; //获取当前页数

/* 展现内容(避免爆代码) */
$(".article-list").css("opacity", "1");
$("#header-div").css("opacity", "1");
$(".cat-real").attr("style", "display:inline-block");
/* 展现内容(避免爆代码) */

export default {
  name: "Index",
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
      notice: {
        visible: false
      }
    };
  },
  mounted() {
    highlightCode();
    //获取分类
    this.axios
      .get("https://www.ouorz.com/wp-json/wp/v2/categories?exclude=1,58")
      .then(response => {
        this.cates = response.data;
      })
      .then(() => {
        this.loading_cates = false;

        //获取标签
        this.axios
          .get(
            "https://www.ouorz.com/wp-json/wp/v2/tags?orderby=count&order=desc&per_page=15"
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
        "https://www.ouorz.com/wp-json/wp/v2/posts?sticky=1&" +
          paged +
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
            "https://www.ouorz.com/wp-json/wp/v2/posts?sticky=0&exclude=" +
              this.posts_id_sticky +
              paged +
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
      .then(() => {
        this.loading = false;
        paged++; //加载完1页后累加页数
        //加载完文章列表后监听滑动事件
        $(window).scroll(function() {
          var scrollTop = $(window).scrollTop();
          var scrollHeight = $(".bottom").offset().top - 800;
          if (scrollTop >= scrollHeight) {
            if (click == 0) {
              //接近底部加载一次新文章
              $("#scoll_new_list").click();
              click++; //加载次数计次
            }
          }
        });
      });
  },
  methods: {
    //定义方法
    new_page: function() {
      //加载下一页文章列表
      $("#view-text").html("-&nbsp;Loading&nbsp;-");
      this.axios
        .get(
          "https://www.ouorz.com/wp-json/wp/v2/posts?sticky=0&exclude=" +
            this.posts_id_sticky +
            "&per_page=10&page=" +
            paged +
            this.version
        )
        .then(response => {
          if (response.data.length !== 0) {
            //判断是否最后一页
            $("#view-text").html("-&nbsp;Posts List&nbsp;-");
            this.posts.push.apply(this.posts, response.data); //拼接在上一页之后
            click = 0;
            paged++;
          } else {
            $("#view-text").html("-&nbsp;All Posts&nbsp;-");
            $(".bottom h5")
              .html('No more posts O__O "…')
              .css({
                background: "#fff",
                color: "#999"
              });
            this.loading_css = "none";
          }
        })
        .catch(() => {
          $("#view-text").html("-&nbsp;All Posts&nbsp;-");
          $(".bottom h5")
            .html('No more posts O__O "…')
            .css({
              background: "#fff",
              color: "#999"
            });
          this.loading_css = "none";
        });
    },
    preview: function(postId) {
      $("#btn" + this.previewPost).html("全文速览"); //以防未收起上个预览，更改上个预览按钮
      this.previewPost = postId; //准备预览文章 ID
      this.axios
        .get("https://www.ouorz.com/wp-json/wp/v2/posts/" + postId)
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
    closePreview: function(postId) {
      $("#btn" + postId).html("全文速览"); //收起预览，更改按钮
      this.previewClose = postId; //收起预览的文章 ID
      this.previewContent = ""; //初始化预览内容
      this.previewPost = 0; //初始化准备预览文章 ID
      this.previewPostOpened = 0; //初始化正在预览文章 ID
      this.previewClass = ""; //初始化预览内容块 class
      this.previewClose = 0; //初始化已收起预览的文章 ID
    },
    discard_notice() {
      this.cookie.set("ouorz_read_cookie", 1);
      this.notice.visible = false;
    }
  },
  updated() {
    // 页面内容变化时执行代码渲染
    highlightCode();
  }
};
</script>