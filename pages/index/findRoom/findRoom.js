import uniIcon from '@/components/uni-icon/uni-icon.vue'
import {
	getTypeByIsHave
} from '@/common/mixins/api.js'
export default {
	components: {
		uniIcon
	},
	computed: {
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	data() {
		return {
			postsType: [],
			selectTypeId: ''
		}
	},
	created() {
		self = this
		// 获取发帖类型
		getTypeByIsHave("0").then(res => {
			this.postsType = res[1].data.data
		})
	},
	onLoad() {},
	onBackPress(e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		uni.switchTab({
			url: '/pages/tabBar/index/index'
		});
		// return true 表示禁止默认返回
		return true
	},
	methods: {
		haveRoom: function() {
			uni.navigateTo({
				url: '/pages/index/haveRoom/haveRoom'
			});
		},
		submitForum: function() {
			if (this.loginUserInfo.hasRealName == 0) {
				uni.showToast({
					title: `实名后才可使用该功能,请显示名`,
					icon: 'none'
				})
				return
			}
			console.log(this.postsType)
			if (this.selectTypeId == '') {
				uni.showToast({
					title: `选择帖子类型`,
					icon: 'none'
				});
				return
			}
			console.log(this.selectTypeId)
			uni.navigateTo({
				url: '/pages/index/submitForum/submitForum?postTypeId=' + this.selectTypeId
			})
		},
		selectRadio(typeId) {
			this.selectTypeId = typeId
		}
	}
}
