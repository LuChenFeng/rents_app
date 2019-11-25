import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import global from '@/common/common.vue'
var util = require('../../../common/util.js');
var formatLocation = util.formatLocation;
// #ifdef APP-PLUS
import permision from "../../../common/permission.js"
// #endif
import {
	putPostInfoImg,
	putPostsInfo
} from '@/common/mixins/api.js'
var self
var sourceType = [
	['camera'],
	['album'],
	['camera', 'album']
]
var sizeType = [
	['compressed'],
	['original'],
	['compressed', 'original']
]
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
		uniPopup,
		uniIcon
	},
	data() {
		return {

			hasLocation: false,
			location: {},
			locationAddress: '',
			locationName: '',
			imageList: [],

			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 7,
			count: [1, 2, 3, 4, 5, 6, 7, 8],
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			// 弹窗
			show: false,
			type: '',
			// 表单信息
			imageUrl: [],
			putMessage: {
				"postTypeId": "",
				"userInfoId": "",
				"title": "",
				"price": 0,
				"limitSex": 0,
				"longitude": 0,
				"latitude": 0,
				"locationName": "",
				"locationAddress": "",
				"contents": "",
				"postsImgs": []
			}

		}
	},
	created() {
		self = this
	},
	onLoad(options) {
		if (options.postTypeId) {
			this.putMessage.postTypeId = options.postTypeId
		} else {
			uni.showToast({
				title: `选择帖子类型`,
				icon: 'none'
			});
			return
		}

		if (this.hasLogin) {
			this.putMessage.userInfoId =this.loginUserInfo.id
		} else {
			uni.showToast({
				title: `请先登入`,
				icon: 'none'
			});
			return
		}


	},
	onUnload() {
		this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 0,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 7;
	},
	methods: {
		haveRoom: function() {
			uni.navigateTo({
				url: '/pages/index/haveRoom/haveRoom'
			})
		},
		// 地图
		chooseLocation: function() {
			uni.chooseLocation({
				success: (res) => {
					console.log("地址--------")
					console.log(JSON.stringify(res))
					this.hasLocation = true,
						this.location = formatLocation(res.longitude, res.latitude),
						this.locationAddress = res.address,
						this.locationName = res.name
					var point = new plus.maps.Point(res.longitude, res.latitude);
					plus.maps.Map.reverseGeocode(
						point, {},
						function(event) {
							var address = event.address; // 转换后的地理位置
							self.putMessage.locationAddress = address + self.locationAddress
						},
						function(e) {}
					)
					this.putMessage.longitude = parseFloat(this.location.longitude[0] + "." + this.location.longitude[1])
					this.putMessage.latitude = parseFloat(this.location.latitude[0] + "." + this.location.latitude[1])
					this.putMessage.locationName = this.locationName
				}
			})

		},
		clear: function() {
			this.hasLocation = false
		},

		// 选图片##########################

		sourceTypeChange: function(e) {
			this.sourceTypeIndex = e.target.value
		},
		sizeTypeChange: function(e) {
			this.sizeTypeIndex = e.target.value
		},
		countChange: function(e) {
			this.countIndex = e.target.value;
		},
		chooseImage: async function() {
			console.log("chooseImage触发");
			// #ifdef APP-PLUS
			// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			if (this.sourceTypeIndex !== 2) {
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
			}
			// #endif

			if (this.imageList.length >= 8) {
				let isContinue = await this.isFullImg();
				console.log("是否继续?", isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({

				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 8 ? 8 - this.imageList.length : this.count[this.countIndex],
				success: (res) => {
					//在这里选中了图片
					this.imageList = this.imageList.concat(res.tempFilePaths)
					let imgs = this.imageList.map((value, index) => {
						return {
							name: index,
							uri: value
						}
					});

					//上传图片
					putPostInfoImg(imgs).then(res => {
						console.log(res[1])
						imgs = JSON.parse(res[1].data)
						for (let value in imgs) {
							self.imageUrl = self.imageUrl.concat({
								"img": imgs[value]
							})
						}
					})
				},
				fail: (err) => {
					// #ifdef APP-PLUS
					if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
						this.checkPermission(err.code);
					}
					// #endif
				}
			})
		},
		isFullImg: function() {
			return new Promise((res) => {
				uni.showModal({
					content: "已经有8张图片了,是否清空现有图片？",
					success: (e) => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false)
						}
					},
					fail: () => {
						res(false)
					}
				})
			})
		},
		previewImage: function(e) {
			console.log("previewImage");
			var current = e.target.dataset.src
			uni.previewImage({
				current: current,
				urls: this.imageList
			})
		},
		async checkPermission(code) {
			let type = code ? code - 1 : this.sourceTypeIndex;
			let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
				await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
					'android.permission.READ_EXTERNAL_STORAGE');

			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: "没有开启权限",
					confirmText: "设置",
					success: function(res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				})
			}
			return status;
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
		// 弹窗
		togglePopup(type, open) {
			this.content = '居中弹出 popup'
			this.type = type
			this.show = true
		},
		cancel(type) {
			if (type === 'no') {
				this.show = false
				console.log("取消")
				return
			} else {
				console.log("确定提交")
				if (!this.hasLocation ||this.putMessage.price<=0 ||this.putMessage.title=="") {
					uni.showToast({
						title: `请填写：标题、价格、定位地址`,
						icon: 'none'
					})
					return
				}
				this.submitPost()
				this.show = false
				console.log(JSON.stringify(this.imageUrl))
			}
		},
		selectSex(limitSex) {
			this.putMessage.limitSex = limitSex
		},
		submitPost() {
			console.log(JSON.stringify(this.putMessage))
			if (this.imageUrl.length > 0) {
				this.putMessage.postsImgs = this.imageUrl
			}

			putPostsInfo(this.putMessage).then(res => {
				console.log(JSON.stringify(res))
				if (res[1].data.code == 200) {
					uni.showToast({
						title: `发布成功`,
						icon: 'none'
					})
					self.gotoIndex();//返回到主页
					// self.infoReset()
				} else {
					uni.showToast({
						title: `发布异常`,
						icon: 'none'
					})
				}
			})

		},
		infoReset() {
			this.putMessage = {
				"postTypeId": "",
				"userInfoId": "",
				"title": "",
				"price": 0,
				"limitSex": 0,
				"longitude": 0,
				"latitude": 0,
				"locationName": "",
				"locationAddress": "",
				"contents": "",
				"postsImgs": []
			}
		},
		// 路由跳转
		gotoIndex(){
			uni.switchTab({
				url: '/pages/tabBar/index/index'
			})
		},
		change(e) {
			console.log(e.show)
		}
	}
}
