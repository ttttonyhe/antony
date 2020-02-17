<template>
  <div id="header">
    <header class="tony-header-fixed" id="header-div">
      <!-- Content Menu -->
      <div class="header-div1" v-if="($route.path).match(routeDetect)">
        <router-link to="/" style="display: inline-block;">
          <img src="https://static.ouorz.com/t.jpg" />
        </router-link>
        <a href="https://www.ouorz.com/feed">
          <b-button variant="light">RSS 订阅</b-button>
        </a>
        <a>
          <b-button variant="light" @click="openSearch">博客搜索</b-button>
        </a>
      </div>
      <!-- Content Menu -->
      <!-- Index Menu -->
      <div class="header-div1-1" v-else>
        <router-link to="/" style="display: inline-block;">
          <img src="https://static.ouorz.com/t.jpg" />
        </router-link>
        <a>
          <b-button variant="light" @click="openSearch">博客搜索</b-button>
        </a>
        <a>
          <b-button variant="light">中/EN</b-button>
        </a>
      </div>
      <!-- Index Menu -->

      <!-- Menu Items -->
      <div class="header-div2">
        <router-link to="/">
          <b-button variant="light">首页</b-button>
        </router-link>
        <router-link to="/archive">
          <b-button variant="light">归档</b-button>
        </router-link>
        <router-link to="/comment">
          <b-button variant="light">留言板</b-button>
        </router-link>
        <router-link to="/donation">
          <b-button variant="light">赞助列表</b-button>
        </router-link>

        <!-- Contact Dropdown -->
        <b-dropdown variant="primary" split split-href="https://www.ouorz.com/126" html="关于我">
          <b-dropdown-item href="https://www.ouorz.com/comment_manage.html">Comments</b-dropdown-item>
          <b-dropdown-item href="https://github.com/HelipengTony">Github</b-dropdown-item>
          <div class="dropdown-divider"></div>
          <b-dropdown-item
            href="http://wpa.qq.com/msgrd?v=3&amp;uin=36624065&amp;site=qq&amp;menu=yes"
          >QQ</b-dropdown-item>
          <b-dropdown-item href="mailto:he@holptech.com">Email</b-dropdown-item>
          <b-dropdown-item href="https://music.163.com/#/user/home?id=79907497">Netease</b-dropdown-item>
          <b-dropdown-item href="https://weibo.com/HLPYSYLW">Weibo</b-dropdown-item>
          <b-dropdown-item href="https://twitter.com/iamtonyhe">Twitter</b-dropdown-item>
          <b-dropdown-item href="https://www.facebook.com/he.tony.351">Facebook</b-dropdown-item>
          <b-dropdown-item href="https://www.instagram.com/iamtonyhe">Instagram</b-dropdown-item>
        </b-dropdown>

        <!-- Contact Dropdown -->
      </div>
      <!-- Menu Items -->
      <div class="search-bg-b"></div>
      <!-- Search -->
      <div id="search_form" class="search_form_dis">
        <div class="search-bg" id="search-div">
          <div class="search-div1">
            <h3>
              搜索内容
              <button
                type="button"
                class="btn btn-primary"
                style="font-weight: 600;padding: 4px 14px;font-size: .9rem;margin-top: 6px;margin-left: 10px;float: right;"
                @click="closeSearch"
              >关闭</button>
            </h3>
            <p>从博客所有内容中检索所需</p>
            <input
              class="uk-input"
              type="text"
              placeholder="输入搜索内容并回车 Enter"
              v-on:keyup.enter="searchQuery"
              v-model.trim="search_key"
            />
          </div>
          <div class="search-div2">
            <ul v-if="search_loading">
              <template v-if="search_content.length !== 0">
                <li v-for="(search,index) in search_content" :key="index">
                  <a :href="search.link">
                    <h4 v-html="search.title.rendered"></h4>
                    <p v-html="search.post_excerpt.four"></p>
                  </a>
                </li>
              </template>
              <template v-else>
                <li>
                  <h4 style="color:#777">无匹配文章</h4>
                  <p>请尝试更换搜索词再试试吧...</p>
                </li>
              </template>
            </ul>
            <ul v-if="loading_ph">
              <div class="skeleton" style="padding:0px">
                <div class="skeleton-body" style="margin: 0px;">
                  <div class="skeleton-title" style="width:100%"></div>
                  <div class="skeleton-content"></div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <!-- Search -->
    </header>
    <div id="view-div" class="center-info" style="display:none">
        <p style="font-weight: 600;font-size: 1.2rem;color: #555;" id="view-text">-&nbsp;Posts List&nbsp;-</p>
    </div>
  </div>
</template>

<script>
// import jqeury feature
import $ from "jquery";

// add event listener which changes class for the nav when scrolling
$(window).scroll(function() {
  var a = $(document).scrollTop();
  if (a <= 0) {
    $("#header-div").attr("class", "tony-header-fixed");
    $("#view-div").css("display", "none");
    $("#header-div").hover(
      function() {
        $("#header-div").attr("class", "tony-header-scoll");
      },
      function() {
        $("#header-div").attr("class", "tony-header-fixed");
      }
    );
  } else {
    $("#header-div").attr("class", "tony-header-scoll");
    $("#view-div").css("display", "block");
    $("#header-div").hover(
      function() {
        $("#header-div").attr("class", "tony-header-scoll");
      },
      function() {
        $("#header-div").attr("class", "tony-header-scoll");
      }
    );
  }
});
export default {
  name: "computerNav",
  data() {
    return {
      routeDetect: RegExp(/post/),
      search_content: null,
      search_key: null,
      search_loading: false,
      loading_ph: false,
      search_open: false
    };
  },
  methods: {
    // 显示搜索区域
    openSearch: function() {
      $("#search_form").attr("class", "search_form_play");
      $(".search-bg-b").attr("style", "display:block");
      $("#search-div").attr("style", "display:block");
    },
    // 请求搜索
    searchQuery: function() {
      this.search_loading = false;
      this.loading_ph = true;

      var s = this.search_key;
      this.axios
        .get("https://www.ouorz.com/wp-json/wp/v2/posts?search=" + s)
        .then(response => {
          this.search_content = response.data;
          this.loading_ph = false;
          this.search_loading = true;
        });
    },
    // 关闭搜索区域
    closeSearch: function() {
      this.loading_ph = false;
      this.search_content = null;
      this.search_loading = false;
      this.search_key = null;
      $("#search_form").attr("class", "search_form_dis");
      $(".search-bg-b").attr("style", "display:none");
      $("#search-div").attr("style", "display:none");
    }
  }
};
</script>

<style lang="scss">
@import "./nav.scss";
</style>