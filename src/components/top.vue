<template>
  <div id="header_info" class="index-top">
    <nav class="header-nav reveal">
      <img class="header-avatar-top" src="https://static.ouorz.com/t.jpg" />
      <a style="text-decoration:none;" href="/" class="header-logo" title="TonyHe">TonyHe</a>

      <p class="lead" style="margin-top: 0px;margin-left:5px">Just A Poor Lifesinger</p>
    </nav>
    <!-- 英文版长内容展示不同样式 -->
    <div :class="'index-cates ' + ($i18n.locale == 'en-US' ? 'index-long' : '')">
      <template v-if="loading_cates">
        <li
          class="cat-item cat-item-4 loading-line"
          style="display: inline-block;width: 98%;height: 35px;box-shadow: none;border-radius: 0px;background: rgb(236, 237, 239);"
        ></li>
      </template>
      <template v-else>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
          <router-link to="/cate/2" title="和伙伴们交换网站链接，再高兴不过的事!">
            <div class="header-item-icon-div">
              <i class="ri-user-5-line"></i>
            </div>
            {{ $t('lang.top.friend') }}
          </router-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
          <router-link to="/cate/4" title="一些...小玩意儿">
            <div class="header-item-icon-div">
              <i class="ri-dvd-line"></i>
            </div>
            {{ $t('lang.top.rec') }}
          </router-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
          <router-link to="/cate/5" title="我所做过的每一个项目，都将在地球上留下独特的痕迹">
            <div class="header-item-icon-div">
              <i class="ri-product-hunt-line"></i>
            </div>
            {{ $t('lang.top.product') }}
          </router-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
          <router-link to="/cate/6" title="Talk about some shit in my life...">
            <div class="header-item-icon-div">
              <i class="ri-building-3-line"></i>
            </div>
            {{ $t('lang.top.bb') }}
          </router-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
          <router-link to="/cate/7" title="To make the world a better place">
            <div class="header-item-icon-div">
              <i class="ri-code-box-line"></i>
            </div>
            {{ $t('lang.top.code') }}
          </router-link>
        </li>
        <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
          <router-link to="/music" title="音乐收藏与推荐">
            <div class="header-item-icon-div">
              <i class="ri-netease-cloud-music-line"></i>
            </div>
            {{ $t('lang.top.music') }}
          </router-link>
        </li>
      </template>
    </div>
    <div>
      <ul class="post_tags">
        <li class="cat-real" v-for="(tag,index) in tages" :key="index">
          <router-link :to="'/tag/' + tag.id">#{{ tag.name }}</router-link>
        </li>
        <li
          class="loading-line"
          style="background: rgb(236, 237, 238);height: 25px;width: 100%;"
          v-if="loading_tages"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerTop",
  props: {
    loading_cates: Boolean,
    loading_tages: Boolean,
    tages: Array
  }
};
</script>