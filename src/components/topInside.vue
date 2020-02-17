<template>
  <div class="index-cates">
    <template v-if="loading">
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
          </div>伙伴
        </router-link>
      </li>
      <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
        <router-link to="/cate/4" title="一些...小玩意儿">
          <div class="header-item-icon-div">
            <i class="ri-dvd-line"></i>
          </div>推荐
        </router-link>
      </li>
      <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
        <router-link to="/cate/5" title="我所做过的每一个项目，都将在地球上留下独特的痕迹">
          <div class="header-item-icon-div">
            <i class="ri-product-hunt-line"></i>
          </div>项目
        </router-link>
      </li>
      <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
        <router-link to="/cate/6" title="Talk about some shit in my life...">
          <div class="header-item-icon-div">
            <i class="ri-hand-heart-line"></i>
          </div>琐碎
        </router-link>
      </li>
      <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
        <router-link to="/cate/7" title="To make the world a better place">
          <div class="header-item-icon-div">
            <i class="ri-code-box-line"></i>
          </div>折腾
        </router-link>
      </li>
      <li class="cat-item cat-item-4 cat-real" style="display: inline-block;">
        <router-link to="/music" title="音乐收藏与推荐">
          <div class="header-item-icon-div">
            <i class="ri-netease-cloud-music-line"></i>
          </div>音乐
        </router-link>
      </li>
    </template>
  </div>
</template>

<script>
export default {
  name: "topInside",
  props: {
    loading: Boolean
  }
};
</script>