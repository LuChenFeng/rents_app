import Vue from 'vue'
import App from './App'
import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'

import store from './store'
Vue.config.productionTip = false
Vue.prototype.selected = []
Vue.prototype.$store = store
App.mpType = 'app'

Vue.prototype.$backgroundAudioData = {
	playing: false, 
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)
Vue.prototype.selectedCost=[]//出差日历

App.mpType = 'app'

const app = new Vue({
	   store,
    ...App
})
app.$mount()
