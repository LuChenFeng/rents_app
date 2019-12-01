import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
import {
	realNameUpLoadImg,
	addRealName,
	getUserInfoById
} from '@/common/mixins/api.js'
// #ifdef APP-PLUS
import permision from "@/common/permission.js"
// #endif
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
var self
export default {
	components: {
		uniIcon,
		uniPopup,
		mpvuePicker
	},
	data() {

		return {
			imageUrl: [],

			themeColor: '#007AFF',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],

			// 上传照片
			title: 'choose/previewImage',
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 1,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 1,
			count: [1, 2]
		}
	},
	computed: {
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	onLoad() {
		self = this

	},
	onUnload() {
		// 上传照片
		this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 0,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 2;
	},
	methods: {

		// 上传照片
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
			// #ifdef APP-PLUS
			// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			if (this.sourceTypeIndex !== 2) {
				let status = await this.checkPermission();
				if (status !== 1) {
					return;
				}
			}
			// #endif

			if (this.imageList.length >= 2) {
				let isContinue = await this.isFullImg();
				console.log("是否继续?", isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 2 ? 2 - this.imageList.length : this.count[this.countIndex],
				success: (res) => {
					this.imageList = this.imageList.concat(res.tempFilePaths)
					let imgs = this.imageList.map((value, index) => {
						return {
							name: index,
							uri: value
						}
					})
					//上传图片
					realNameUpLoadImg(imgs).then(res => {
						console.log(res[1])
						imgs = JSON.parse(res[1].data)
						for (let value in imgs) {

							(self.imageUrl).push(imgs[value])
							console.log(self.imageUrl)
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
					content: "已经有2张图片了,是否清空现有图片？",
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
		submitReport() {
			let data = {
				userInfoId: this.loginUserInfo.id,
				imgUrls: this.imageUrl
			}
			addRealName(data).then(res => {
				if (res[1].data.code == 200) {
					uni.showToast({
						title: `实名成功`,
						icon: 'none'
					})
					self.getUserInfo()

				} else if (res[1].data.code == 450) {
					uni.showToast({
						title: res[1].data.msg,
						icon: 'none'
					})
				}
			})
		},
		getUserInfo() {
			let id = this.loginUserInfo.id
			getUserInfoById(id).then(res => {
				if (res[1].data.code == 200) {
					self.$store.commit('setLogin', res[1].data.data[0])
				}
			})
		}
	}

}
