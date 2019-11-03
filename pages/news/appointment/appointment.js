import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

export default {
	components: {
		uniIcon,
		uniSwipeAction,
		uniList,
		uniListItem
	},
	data() {
		return {
		scrollTop: 0,
		old: {
			scrollTop: 0
		},
		
		isOpened: true,
		options: [{
			text: '置顶'
		}, {
			text: '标记为已读',
			style: {
				backgroundColor: 'rgb(254,156,1)'
			}
		}, {
			text: '删除',
			style: {
				backgroundColor: 'rgb(255,58,49)'
			}
		}]
		}
	},
	onLoad() {

	},
onBackPress(e) {  
	uni.switchTab({
		url: '/pages/tabBar/news/news'
	});
	return true
}, 
	methods: {
		news: function() {
			uni.switchTab({
				url:'/pages/tabBar/news/news'
			})
		},
		
		upper: function(e) {
			console.log(e)
		},
		lower: function(e) {
			console.log(e)
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		
		submit: function() {
		
		},
		
		bindClick(value) {
			uni.showToast({
				title: `点击了${value.text}按钮`,
				icon: 'none',
			})
			console.log("bindClick");
		},
		setOpened() {
			this.isOpened = !this.isOpened;
				console.log("setOpened");
		},
		bindOpened() {
			this.isOpened = false;
				console.log("bindOpened");
		},
		bindClosed() {
			this.isOpened = false;
			console.log("bindClosed");
		}
	}
}
