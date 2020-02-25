<template>
  <div id="comments">
    <div class="grid grid-centered">
      <div class="grid-cell" id="grid-cell">
        <article class="article reveal">
          <template v-if="loading">
            <div class="skeleton">
              <div class="skeleton-body page-loading-body">
                <div class="skeleton-title page-loading-4"></div>
                <div class="skeleton-content page-loading-3"></div>
              </div>
            </div>
            <div class="skeleton page-loading-1">
              <div class="skeleton-body page-loading-body">
                <div class="skeleton-content page-loading-2"></div>
              </div>
            </div>
            <div class="skeleton">
              <div class="skeleton-body page-loading-body">
                <div class="skeleton-content page-loading-5"></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div id="load" class="donate-load">
              <h3 class="donate-title" v-if="english">Donate to TonyHe</h3>
              <h3 class="donate-title" v-else>赞助与赞助列表</h3>
              <button
                v-if="english"
                type="button"
                class="btn btn-primary btn-sm donate-switch"
                @click="english = !english"
              >
                <i class="ri-earth-line"></i>中文版本
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary btn-sm donate-switch"
                @click="english = !english"
              >
                <i class="ri-earth-line"></i>English Version
              </button>
              <p
                class="page-p donate-p"
                v-if="english"
              >If you feel that my projects are helpful to you and you are willing to give me a little support, you can donate to me in the following ways, which will help me to maintain the continuous development of my projects, thank you very much!</p>
              <p
                class="page-p donate-p"
                v-else
              >感谢你访问这个页面！如果你认为我的项目对你有所帮助，并且愿意为项目未来的持续开发贡献支持，你可以通过以下方式（点击以查看二维码/链接）向我赞助，谢谢！</p>
              <div style="display:flex">
                <div class="payment-div-1">
                  <a
                    target="_blank"
                    href="https://static.ouorz.com/alipay.png"
                    style="text-decoration:none"
                  >
                    <h1 class="donate-icon">
                      <i class="ri-alipay-line"></i>
                    </h1>
                    <h4 class="donate-h4" v-if="english">Alipay</h4>
                    <h4 class="donate-h4" v-else>支付宝</h4>
                  </a>
                </div>
                <div class="payment-div-1-1">
                  <a
                    target="_blank"
                    href="https://static.ouorz.com/wechatpay.png"
                    style="text-decoration:none"
                  >
                    <h1 class="donate-icon">
                      <i class="ri-wechat-pay-line"></i>
                    </h1>
                    <h4 class="donate-h4" v-if="english">Wechat Pay</h4>
                    <h4 class="donate-h4" v-else>微信支付</h4>
                  </a>
                </div>
              </div>

              <div class="payment-div-2 payment-div-2-2" id="view-bitcoin">
                <a href="#" style="text-decoration:none">
                  <h4 class="donate-bitcoin" v-if="english">
                    <i class="ri-bit-coin-line"></i> Bitcoin
                  </h4>
                  <h4 class="donate-bitcoin" v-else>
                    <i class="ri-bit-coin-line"></i> 比特币
                  </h4>
                </a>
              </div>
              <b-tooltip
                target="view-bitcoin"
                triggers="hover"
                placement="top"
              >bc1qz2kgqp26wtel6n7rl0cw053pxgtwt5vrr5hyd7pqmmjfhqxex8dq8fknpx</b-tooltip>

              <div class="payment-div-2">
                <a
                  target="_blank"
                  href="https://paypal.me/helipeng?locale.x=zh_XC"
                  style="text-decoration:none"
                >
                  <h4 class="donate-paypal" v-if="english">
                    <i class="ri-paypal-line"></i> Paypal
                  </h4>
                  <h4 class="donate-paypal" v-else>
                    <i class="ri-paypal-line"></i> 贝宝
                  </h4>
                </a>
              </div>

              <p class="page-p donate-p" v-if="english">
                The following list will not be updated automatically, please
                <a
                  href="https://www..ouorz.com/post/126#in10"
                  target="_blank"
                >contact me</a> after your payment. The donor's name will be kept on the list below, thank you very much for your support.
              </p>
              <p class="page-p donate-p" v-else>
                赞助列表将不会自动更新，完成赞助支付后请及时通过社交软件/Email/站内评论
                <a
                  href="https://www..ouorz.com/post/126#in10"
                  target="_blank"
                >与我联系</a>。所有赞助者的名字都会被记录在以下列表，感谢支持！
              </p>
              <table border="1" class="donate-table">
                <tbody>
                  <tr>
                    <template v-if="english">
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </template>
                    <template v-else>
                      <th>姓名</th>
                      <th>金额</th>
                      <th>日期</th>
                    </template>
                  </tr>
                  <tr v-for="(donor,index) in donors" :key="index">
                    <td>{{ donor.name }}</td>
                    <td>{{ donor.unit }}{{ donor.amount.toFixed(2) }}</td>
                    <td>{{ donor.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Donation",
  data() {
    return {
      english: true,
      donors: [],
      loading: true
    };
  },
  created() {
    //屏蔽错误
    window.onerror = function() {
      return true;
    };
    this.axios
      .get("https://blog.ouorz.com/wp-content/themes/peg/donors.json")
      .then(response => {
        this.donors = response.data.donors;
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }
};
</script>