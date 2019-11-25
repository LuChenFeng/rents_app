import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
var self
export default {
	components: {
		uniIcon,
		uniPopup
	},
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
	data() {
		return {
			showSwiper: false,
			imgUrls: [
				'/static/img/mine/img2.png'
			],
			// 弹窗
			show: false,
			type: '',
		}
	},
	onLoad() {
		self = this
	},
	methods: {
		// 个人资料页面
		mineInfo() {
			uni.navigateTo({
				url: '/pages/mine/mineInfo/mineInfo'
			})
		},
		// 历史发布页面

		minePosts() {
			uni.navigateTo({
				url: '/pages/mine/minePosts/minePosts'
			})
		},
		// 登入
		bindLogin() {
			uni.navigateTo({
				url: '/pages/login/login',
			});
		},
		// 退出登入
		bindLogout() {
			// this.logout();
			this.$store.commit('setLogout')
			/**
			 * 如果需要强制登录跳转回登录页面
			 */
			if (this.forcedLogin) {
				uni.reLaunch({
					url: '/pages/login/login',
				});
			}
		},
		togglePopup(type, open) {
			this.content = '居中弹出 popup'
			this.type = type
			this.show = true
		},
		cancel(type) {
			if (type === 'no') {
				this.show = false
				return
			} else {
				this.bindLogout()
				this.show = false
			}
		},
		change(e) {
			console.log(e.show)
		}
	}
}
