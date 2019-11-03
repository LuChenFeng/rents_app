import uniIcon from '@/components/uni-icon/uni-icon.vue'
import {
	getTypeByIsHave
} from '@/common/mixins/api.js'
var self
export default {
	components: {
		uniIcon
	},

	data() {
		return {
			postsType: [],
			selectTypeId:''
		}
	},
	created() {
		self = this
		// 获取发帖类型
		getTypeByIsHave("1").then(res => {
			this.postsType = res[1].data.data
		})
	},

	onLoad() {

	},
	onBackPress(e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		uni.switchTab({
			url: '/pages/tabBar/index/index'
		});
		// return true 表示禁止默认返回
		return true
	},
	methods: {
		// 转到找房子
		findRoom: function() {
			uni.navigateTo({
				url: '/pages/index/findRoom/findRoom'
			});
		},
		// 点击发布
		submitForum: function() {
			console.log(this.postsType)
			if(this.selectTypeId==''){
				uni.showToast({
					title: `选择帖子类型`,
					icon: 'none'
				});
				return
			}
			console.log(this.selectTypeId)
			uni.navigateTo({
				url: '/pages/index/submitForum/submitForum?postTypeId='+this.selectTypeId
			})
		},
		selectRadio(typeId){
			this.selectTypeId=typeId
		}
	}
}
