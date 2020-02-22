<template>
  <div id="archive">
    <div class="grid grid-centered" style="max-width: 660px;padding: 0px 20px;margin-top: 80px">
      <div class="grid-cell" id="grid-cell">
        <div id="header_info">
          <!-- 顶部标题与分类区块 -->
          <nav class="header-nav reveal">
            <div class="cate-nav">
              <div>
                <router-link to="/" class="top1 header-logo cate-name">{{ $t('lang.cate.archive') }}</router-link>
              </div>
              <div>
                <router-link to="/">
                  <b-button variant="primary" class="cate-back">
                    <i class="ri-arrow-left-line"></i> {{ $t('lang.cate.backHome') }}
                  </b-button>
                </router-link>
              </div>
            </div>
            <p class="top2 lead archive-p">{{ $t('lang.cate.archiveDes') }}</p>
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
            class="article-list-item reveal index-post-list archive"
            v-for="(array,index_array) in posts_array"
            :key="index_array"
          >
            <h2>{{ array.year }}</h2>
            <h3>{{ array.year }} / {{ parseInt(((array.posts[0].date.split('T'))[0].split('-'))[1]) }}</h3>

            <div v-for="(post,index) in array.posts" :key="index">
              <template
                v-if="articleDisplay(post.post_categories[0].term_id,post.post_metas.status,true)"
              >
                <div
                  v-if="(index !== 0) && (parseInt(((post.date.split('T'))[0].split('-'))[1]) !== parseInt(((array.posts[index - 1].date.split('T'))[0].split('-'))[1]))"
                >
                  <h3>{{ array.year }} / {{ parseInt(((post.date.split('T'))[0].split('-'))[1]) }}</h3>
                </div>
                <a class="post-a" :href="'/post/'+post.id">
                  <p
                    v-html="'<em class=\'post-date\'>' + (post.date.split('T'))[0] + '</em>' + post.title.rendered"
                  ></p>
                </a>
              </template>
              <template v-else>
                <div>
                  <div
                    v-if="(index !== 0) && (parseInt(((post.date.split('T'))[0].split('-'))[1]) !== parseInt(((array.posts[index - 1].date.split('T'))[0].split('-'))[1]))"
                  >
                    <h3>{{ array.year }} / {{ parseInt(((post.date.split('T'))[0].split('-'))[1]) }}</h3>
                  </div>
                  <a class="post-a" style="display:none">
                    <p
                      v-html="'<em class=\'post-date\'>' + (post.date.split('T'))[0] + '</em>' + 'Tony 发布了一篇不想在这里展示的文章'"
                    ></p>
                  </a>
                </div>
              </template>
            </div>
          </li>
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
      loading: true, //v-if判断显示占位符
      loading_des: false,
      post_count: 0,
      last_year: 0,
      posts_array: []
    };
  },
  mounted() {
    //屏蔽错误
    window.onerror = function() {
      return true;
    };
    // 获取文章总数
    this.axios("https://blog.ouorz.com/wp-json/wp/v2/posts?per_page=1")
      .then(post_one => {
        this.post_count = parseInt(
          post_one.data[0].post_total_count.post_count
        );
      })
      .finally(() => {
        //获取文章列表
        this.axios
          .get(
            "https://blog.ouorz.com/wp-json/wp/v2/posts?per_page=" +
              this.post_count
          ) //默认以发布时间排序
          .then(response => {
            this.posts = response.data;
          })
          .then(() => {
            var k = -1;
            var i = 0;
            for (i = 0; i < this.posts.length; i++) {
              //遍历所有文章
              if (
                this.posts[i].date.split("T")[0].split("-")[0] !==
                this.last_year
              ) {
                //当前文章发布年与上一篇不同
                this.posts_array[(k += 1)] = []; //初始化数组
                this.posts_array[k]["posts"] = []; //初始化 posts 数组
                this.posts_array[k]["year"] = parseInt(
                  this.posts[i].date.split("T")[0].split("-")[0]
                ); //增加年份
                this.posts_array[k]["posts"][
                  this.posts_array[k]["posts"].length
                ] = this.posts[i]; //增加文章
                this.last_year = this.posts[i].date.split("T")[0].split("-")[0]; //赋值当前文章发布年份
              } else {
                //发布年份与上一篇相同
                this.posts_array[k]["posts"][
                  this.posts_array[k]["posts"].length
                ] = this.posts[i]; //增加文章
              }
            }
            this.loading = false;
          });
      });
  },
  methods: {
    articleDisplay: (cateId, status, type) => {
      if (type) {
        if (cateId !== (2 || 58 || 5) && !status) {
          return true;
        } else {
          return false;
        }
      } else {
        if (cateId !== (2 || 58 || 5) && !status) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
};
</script>