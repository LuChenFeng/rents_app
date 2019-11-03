import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import uniBadge from '@/components/uni-badge/uni-badge.vue'
import global from '@/common/common.vue'
import {
	OnlineUrl
} from '@/common/config.js'
var _self;
export default {
	computed: {
		forcedLogin(){
			return this.$store.getters.getForcedLogin
		},
		hasLogin(){
			return this.$store.getters.getHasLogin
		},
		loginUserInfo(){
			return this.$store.getters.getLoginUserInfo
		}
	},
	components: {
		uniIcon,
		uniSwipeAction,
		uniList,
		uniListItem

	},
	data() {

		let chatUserS
		return {
			myId:'',
			myName: '',
			myAvatar: '',
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
			}],
			chatUserS
		}
	},
	onLoad() {
		_self = this
		this.myId=this.loginUserInfo.id,
		this.myName=this.loginUserInfo.userName,
		this.myAvatar=this.loginUserInfo.avatar,
		setTimeout(() => {
			this.showImg = true
		}, 400)
		this.getOnlineUserS()

	},
	// 返回按钮
	onBackPress(e) {
		uni.switchTab({
			url: '/pages/tabBar/news/news'
		});
		return true
	},

	// 下拉刷新
	onPullDownRefresh() {
		console.log('onPullDownRefresh')
		this.initData()
		this.getOnlineUserS()
	},
	methods: {
		// 获取用户列表
		getOnlineUserS: function() {
			console.log("执行请求聊天用户列表")
			uni.request({
				url: OnlineUrl + "/" +this.loginUserInfo.id,
				method: "GET",
				success: function(res) {
					console.log(res)
					_self.chatUserS = res.data.data
					console.log(JSON.stringify(_self.chatUserS))
				}
			})
		},

		// 预约界面
		appointment: function() {
			uni.navigateTo({
				url: '/pages/news/appointment/appointment'
			});
		},
		// 找室友界面
		findRoommate: function() {
			uni.navigateTo({
				url: '/pages/news/findRoommate/findRoommate'
			});
		},


		// 聊天室页面
		chatRoom: function(key) {
			console.log(key)
			let chatUser=this.chatUserS[key]
			let toId=chatUser.from.id==this.loginUserInfo.id?chatUser.to.id:chatUser.from.id
			let toName=chatUser.from.name==this.loginUserInfo.userName?chatUser.to.name:chatUser.from.name
			let toAvatar=chatUser.from.avatar==this.loginUserInfo.avatar?chatUser.to.avatar:chatUser.from.avatar
			console.log(toId)
			uni.navigateTo({
				url: '/pages/chat/chatRoom?toId=' + toId + '&toName=' + toName + '&toAvatar=' + toAvatar
			});
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

		},
		initData() {
			setTimeout(() => {
				uni.showToast({
					title: `刷新`,
					icon: 'none',
				});
				uni.stopPullDownRefresh();
			}, 300);
		}

	}
}
