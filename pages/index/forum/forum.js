import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
import cityData from '../../../common/city.data.js'
import global from '../../../common/common.vue'
import uniCard from '@/components/uni-card/uni-card.vue'
import uniTag from '@/components/uni-tag/uni-tag.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import {
	getPostinfoBypage
} from '@/common/mixins/api.js'
var self
export default {
	components: {
		mpvuePicker,
		uniCard,
		uniTag,
		uniIcon
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
			// 导航栏
			pickerSingleArray: [{
				label: '中国',
				value: 1
			}],
			mulLinkageTwoPicker: cityData,
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],

			flagText: '',
			roommateList,

			// tag标签
			type: 'default',
			inverted: false,
			//懒加载	
			placeholderSrc: '../../../static/60x60.png',
			windowHeight: 0,
			show: false
		}
	},

	onLoad(e) {
		console.log(e)
		self = this
		console.log(JSON.stringify(global.city))
		if (global.city == null) {
			global.city = ['北京市', '东城区']

		}
		this.setStyle(0, global.city[1])
		this.infoStyle = parseInt(e.infoStyle)
		// this.initData();
		this.setDate()
	},

	onUnload() {
		this.max = 0;
		this.data = [];
		this.loadMoreText = "加载更多";
		this.showLoadMore = false;
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
		}
	},

	/**
	 * 加载更多
	 */
	onReachBottom() {
		console.log("onReachBottom执行了 ,请求服务器数据去服务器");

		if (this.pageTotal < this.thisPage) {

			this.loadMoreText = "没有更多数据了!"
			return;
		}

		this.showLoadMore = true;
		this.setDate();
	},

	// 导航栏
	onBackPress() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
			return true;
		}
	},

	/**
	 *  点击导航栏 buttons 时触发
	 */
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.showMulLinkageTwoPicker();
		}
	},
	/**
	 * 当 searchInput 配置 disabled 为 true 时触发 搜索框
	 */
	onNavigationBarSearchInputClicked(e) {
		console.log('事件执行了')
		uni.navigateTo({
			url: '/pages/index/forum/detail/detail?'
		});
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
			let city = global.city[1]
			let dataPage = {
				city: city,
				isHave:this.infoStyle,
				likeStr: this.likeStr,
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

		// 导航栏
		onCancel(e) {
			console.log(e);
		},
		// 双列
		showMulLinkageTwoPicker() {
			this.pickerValueArray = this.mulLinkageTwoPicker
			this.mode = 'multiLinkageSelector'
			this.deepLength = 2
			this.pickerValueDefault = [0, 0]
			this.$refs.mpvuePicker.show()
		},
		onConfirm(e) {
			global.city = e.label.split('-')
			console.log(global.city)
			this.setStyle(0, global.city[1])
			this.setDate()
			this.thisPage = +1

		},
		/**
		 * 修改导航栏buttons
		 * index[number] 修改的buttons 下标索引，最右边索引为0
		 * text[string] 需要修改的text 内容
		 */
		setStyle(index, text) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			if (text.length > 3) {
				text = text.substr(0, 3) + '...';
			}
			// #ifdef APP-PLUS
			let currentWebview = page.$getAppWebview();
			let titleNView = currentWebview.getStyle().titleNView;
			// 添加文字过长截取为3个字符，请根据自己业务需求更改
			titleNView.buttons[0].text = text;
			currentWebview.setStyle({
				titleNView: titleNView
			});
			// #endif
			// #ifdef H5
			document.getElementsByClassName('uni-btn-icon')[1].innerText = text;
			// #endif
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

		// 打开地图
		openLocation(key) {
			uni.openLocation({
				longitude: Number(this.roommateList[key].postsInfo.longitude),
				latitude: Number(this.roommateList[key].postsInfo.latitude),
				name: this.roommateList[key].postsInfo.locationName,
				address: this.roommateList[key].postsInfo.locationAddress
			})
		}

	}
}
