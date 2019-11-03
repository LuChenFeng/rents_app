import uniCard from '@/components/uni-card/uni-card.vue'
import uniTag from '@/components/uni-tag/uni-tag.vue'
var self
import {
	getUserMatching
} from '@/common/mixins/api.js'
// import global from '@/common/common.vue'
export default {
	computed: {
		forcedLogin() {
			return this.$store.getters.getForcedLogin
		},
		hasLogin() {
			return this.$store.getters.getHasLogin
		},
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	components: {
		uniCard,
		uniTag
	},
	data() {
		let roommateList = []
		return {
			flagText: '',
			roommateList,
			listSize: 0,
			// tag标签
			type: 'default',
			inverted: false,
			flagFill: 1, //判断是否已经存在记录
			loadNum: 10
		}
	},
	onLoad() {
		self = this
		console.log("从服务器或取匹配的室友信息")

		let userInfoId = this.loginUserInfo.id
		getUserMatching(userInfoId, this.loadNum).then(res => {
			if (res[1].data.code == 450) {
				self.flagFill = 0
				uni.showToast({
					title: res[1].data.msg,
					icon: 'none'
				})
			} else {
				self.roommateList = res[1].data.data
			}
		})
		console.log(this.roommateList);
	},
	/**
	 *  点击导航栏 buttons （设置按钮）时触发
	 */
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: "/pages/news/fillInfor/fillInfor?flagFill=" + this.flagFill,
		});
	},
	/**
	 *  点击导航栏 f返回 （设置按钮）时触发
	 */
	onBackPress(e) {
		uni.reLaunch({
			url: '/pages/tabBar/news/news'
		});
		return true
	},
	methods: {
		clickCard(key) {
			let userId = this.roommateList[key].userStyle.userInfoId
			uni.navigateTo({
				url: '/pages/publicVue/userDetails/userDetails?userId=' + userId
			})
		},
		footerClick(types, key) {
			if (types == 'contact') {
				console.log("在这里跳到聊天页面")
				console.log(key)
				let chatUser = this.roommateList[key]
				let toId = chatUser.userStyle.userInfoId
				let toName = chatUser.userName
				let toAvatar = chatUser.avatar
				console.log(toId)
				uni.navigateTo({
					url: '/pages/chat/chatRoom?toId=' + toId + '&toName=' + toName + '&toAvatar=' + toAvatar
				})
			}
		},
		/**
		 * tap标签
		 */
		setType() {
			let types = ['default', 'primary', 'success', 'warning', 'error']
			let index = types.indexOf(this.type)
			types.splice(index, 1)
			let randomIndex = Math.floor(Math.random() * 4)
			this.type = types[randomIndex]
		},
		setInverted() {
			this.inverted = !this.inverted
		}
	}

}
