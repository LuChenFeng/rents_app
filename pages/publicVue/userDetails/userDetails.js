import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
import cityData from '@/common/city.data.js'
import global from '@/common/common.vue'
import uniCard from '@/components/uni-card/uni-card.vue'
import uniTag from '@/components/uni-tag/uni-tag.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {
	getPostinfoBypage,
	userInfoStyleById
} from '@/common/mixins/api.js'
var self
export default {
	components: {
		mpvuePicker,
		uniCard,
		uniTag,
		uniIcon,
		uniPopup
	},
	computed: {
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	data() {
		return {
			roommateList: [],
			loadMoreText: "加载中...",
			showLoadMore: false,

			pageTotal: 1,
			thisPage: 1,
			likeStr: "",
			showPopup: false,

			inverted: false,
			postsId: '',
			userId: '',
			userInfo:{}
		}
	},

	onLoad(e) {
		self = this
		this.userId = e.userId
		this.setUserInfoStyle()
		this.setDate()
	},

	onUnload() {
		this.loadMoreText = "加载更多";
		this.showLoadMore = false;
	},

	/**
	 * 加载更多
	 */
	onReachBottom() {
		if (this.pageTotal < this.thisPage) {
			this.loadMoreText = "没有更多数据了!"
			return
		}
		this.showLoadMore = true
		this.setDate()
	},

	methods: {
		setUserInfoStyle() {
			userInfoStyleById(this.userId).then(res=>{
				if(res[1].data.code==200){
					self.userInfo=res[1].data.data[0]
				}
			})
		},
		setDate() {
			let dataPage = {
				userInfoId: this.userId,
				pageNo: this.thisPage
			}
			getPostinfoBypage(dataPage).then(res => {
				var arr = Object.keys(res[1].data)
				if (arr.length > 2) {
					self.roommateList = self.roommateList.concat(res[1].data.data.postDetails)
					self.pageTotal = res[1].data.data.pageTotal
					console.log(JSON.stringify(res[1].data.data))
					self.thisPage = self.thisPage + 1
					self.loadMoreText = "加载更多数据!"
				} else {
					self.showLoadMore = true
					this.loadMoreText = "没有更多数据了!"
				}

			})
		},

		clickCard(key) {
			let postKey = this.roommateList[key].postsId;
			uni.navigateTo({
				url: '/pages/index/forumDetails/forumDetails?id=' + postKey
			})
			console.log(key);
		},
		footerClick(key) {
			this.openLocation(key)
		},
		// 打开地图
		openLocation(key) {
			uni.openLocation({
				longitude: Number(this.roommateList[key].postsInfo.longitude),
				latitude: Number(this.roommateList[key].postsInfo.latitude),
				name: this.roommateList[key].postsInfo.locationName,
				address: this.roommateList[key].postsInfo.locationAddress
			})
		},
		change(e) {},
	}
}
