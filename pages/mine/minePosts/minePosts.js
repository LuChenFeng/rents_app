import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
import cityData from '../../../common/city.data.js'
import global from '../../../common/common.vue'
import uniCard from '@/components/uni-card/uni-card.vue'
import uniTag from '@/components/uni-tag/uni-tag.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {
	getPostinfoBypage,
	delPostsInfoById
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
		let roommateList = []

		return {
			data: [],
			loadMoreText: "加载中...",
			showLoadMore: false,
			max: 0,
			infoStyle: 1,
			pageTotal: 1,
			thisPage: 1,
			likeStr: "",
			showPopup: false,

			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],

			flagText: '',
			roommateList,

			// tag标签
			type: 'default',
			inverted: false,
			//懒加载	
			placeholderSrc: '../../../static/60x60.png',
			windowHeight: 0,
			postsId: ''
		}
	},

	onLoad(e) {
		self = this
		this.setDate()
	},

	onUnload() {
		this.max = 0;
		this.data = [];
		this.loadMoreText = "加载更多";
		this.showLoadMore = false;
	},

	/**
	 * 加载更多
	 */
	onReachBottom() {
		if (this.pageTotal < this.thisPage) {
			this.loadMoreText = "没有更多数据了!"
			return;
		}
		this.showLoadMore = true;
		this.setDate();
	},



	/**
	 * 下拉刷新
	 */
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
		this.initData();
	},

	methods: {
		// 免费发布按钮
		findOrHaveRoom: function() {
			uni.navigateTo({
				url: '/pages/index/haveRoom/haveRoom'
			})
		},
		initData() {
			setTimeout(() => {
				this.max = 0;
				this.data = [];
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
				uni.stopPullDownRefresh();
			}, 300);
		},
		setDate() {

			let dataPage = {
				userInfoId: this.loginUserInfo.id,
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
		},
		footerClick(key,id, type) {
			if (type === 'del') {
				this.postsId = id
				this.content = '居中弹出 popup'
				this.showPopup = true
			} else {
				this.openLocation(key)
			}
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

		cancel(type) {
			if (type === 'no') {
				this.showPopup = false
				console.log("取消")
				return
			} else {
				delPostsInfoById(this.postsId).then(res => {
					if (res[1].data.code == 200) {
						uni.showToast({
							title: `删除成功`,
							icon: 'none'
						})
						self.thisPage = 1
						self.roommateList = []
						self.setDate()
					}
				})
			}
			this.showPopup = false
		},

	}
}
