// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import router from './router';
import { Flexbox, FlexboxItem, ToastPlugin, ConfirmPlugin, AlertPlugin, LoadingPlugin } from 'vux';
import store from './store'

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.component('flexbox', Flexbox);
Vue.component('flexbox-item', FlexboxItem);

// 公用弹窗
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.prototype.showToast = function (text, type) {
  this.$vux.toast.show({
    text: text,
    type: type || 'success'
  })
};
Vue.prototype.showAlert = function (content, title) {
  this.$vux.alert.show({
    title: title || '提示',
    content: content,
    hideOnBlur: true
  })
};
Vue.prototype.showConfirm = function (title, onConfirm) {
  this.$vux.confirm.show({
    title: title,
    onConfirm () {
      onConfirm()
    }
  })
};
Vue.prototype.showLoading = function (show = true) {
  const visible = this.$vux.loading.isVisible();
  if (show) {
    if (!visible) {
      this.$vux.loading.show()
    }
  } else {
    if (visible) {
      this.$vux.loading.hide()
    }
  }
};
Vue.prototype.errMsg = function (text) {
  this.$vux.toast.show({
    text: text,
    type: 'cancel'
  })
};

/* eslint-disable no-new */
const app = new Vue({
  el: '#app-box',
  router,
  store,
  components: { App },
  template: '<App/>'
});

export default app;
