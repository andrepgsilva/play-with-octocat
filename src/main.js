import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import './assets/tailwind.css';
import helpers from './helpers';

Vue.config.productionTip = false

Vue.mixin({
  methods: helpers
});

let elEvent
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    elEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', elEvent)
  },
  unbind: function () {
    document.body.removeEventListener('click', elEvent)
  },
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

