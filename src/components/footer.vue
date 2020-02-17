<template>
  <div>
    <go-top-button
      :animate="true"
      :speed="70"
      :acceleration="8"
      :scrollDistance="10"
      class="goup-container footer-goup"
    >
      <i class="ri-arrow-up-s-fill footer-goup-icon"></i>
    </go-top-button>
    <div
      class="goup-container footer-github"
    >
      <a href="https://github.com/HelipengTony/tony" target="_blank" style="text-decoration:none">
        <i class="ri-github-fill footer-github-icon"></i>
      </a>
    </div>
    <footer class="footer reveal">
      <p>
        Copyright &copy; 2018-{{ new Date().getFullYear() }} · TonyHe ·
        <a
          href="http://www.beian.miit.gov.cn"
          target="_blank"
          style="text-decoration: none;color: inherit;font-size: 14px;font-weight: 500;"
        >蜀ICP备16017417号-9</a> ·
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          style="text-decoration: none;color: inherit;font-size: 14px;font-weight: 500;"
        >CC BY-NC 4.0</a>
      </p>
    </footer>
  </div>
</template>

<script>
import GoTopButton from "vue-go-top-button";
import "vue-go-top-button/dist/lib/vue-go-top-button.min.css";

export default {
  name: "siteFooter",
  components: { GoTopButton }
};
</script>