// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/scss/index.scss'
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(ElementUI)
Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
	if (localStorage.token) {
		if (request.method == 'get' || request.method == 'GET') {
			if (request.url.indexOf("?") != -1) {
				request.url += "&r=" + Math.random();
			} else {
				request.url += "?r=" + Math.random();
			}
		}
		request.headers.set('Authorization', localStorage.token);
	}
	next((response) => {
		// if (response.data && response.data.code !== 0) {
		// 	if (response.data.code === 401) {
		// 		window.location.href = "/login";
		// 	}
		// 	if (response.data.details && response.data.details.length > 0) {
		// 		let details = response.data.details;
		// 		let message = details.length == 1 ? details[0] : details.join(",");
		// 		ElementUI.Message({
		// 			type: 'error',
		// 			message: message
		// 		});
		// 	} else {
		// 		ElementUI.Message({
		// 			type: 'error',
		// 			message: response.data.message
		// 		});
		// 	}
		// }
		return response;
	});
});


new Vue({
	el: '#app',
	router
})
