import uniIcon from '@/components/uni-icon/uni-icon.vue'

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
		uniIcon
	},
	data() {
		return {
			title: 'Hello00000',

		}
	},
	onLoad() {
		// 登入判断
		if (!this.hasLogin) {
			uni.showModal({
				title: '未登录',
				content: '您未登录，需要登录后才能继续',
				/**
				 * 如果需要强制登录，不显示取消按钮
				 */
				showCancel: !this.forcedLogin,
				success: (res) => {
					if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (this.forcedLogin) {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						} else {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				}
			});
		}
	},
	methods: {

		haveRoom: function() {

			uni.navigateTo({
				url: '/pages/index/haveRoom/haveRoom'
			})
		},
		// 跳转到以租到房
		// rentedRomm: function() {
		// 	uni.navigateTo({
		// 		url: '/pages/index/rentedRomm/rentedRomm'
		// 	})
		// },
		findRoom: function() {
			uni.navigateTo({
				url: '/pages/index/findRoom/findRoom'
			})
		},
		
		// lookForTenant: function() {
		// 	uni.navigateTo({
		// 		url: '/pages/index/lookForTenant/lookForTenant'
		// 	})
		// },
		// 出差日历
		costSharing: function() {
			uni.navigateTo({
				url: '/pages/index/costSharing/costSharing'
			});
		},

		findRoommate: function() {
			uni.navigateTo({
				url: '/pages/index/forum/forum?infoStyle=' + '0'
			})
		},

		findHome: function() {
			uni.navigateTo({
				url: '/pages/index/forum/forum?infoStyle=' + '1'
			})
		}

	}
}
