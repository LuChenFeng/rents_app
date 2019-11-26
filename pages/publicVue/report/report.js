import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
import {
	putReportImg,
	addPostsReport
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
			pickerSingleArray: [{
					label: '中介，托管公司或职业二房东',
					value: 1
				}, {
					label: '骚扰',
					value: 2
				}, {
					label: '垃圾营销',
					value: 3
				},
				{
					label: '淫秽色情',
					value: 4
				},
				{
					label: '敏感信息',
					value: 5
				}, {
					label: '不实信息',
					value: 6
				},
				{
					label: '其他，请在下方补充',
					value: 7
				}
			],
			
			themeColor: '#007AFF',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],

			// 上传照片
			title: 'choose/previewImage',
			imageList: [],
			sourceTypeIndex: 1,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 0,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 1,
			count: [1, 2],

			reportText: '', //补充说明
			pickerText:'',//举报原因
			reportId: ''

		}
	},
	computed: {
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	onLoad(e) {
		self = this
		this.reportId = e.postsId

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
		// 单列
		onCancel(e) {
			console.log(e)
		},
		showSinglePicker() {
			this.pickerValueArray = this.pickerSingleArray
			this.mode = 'selector'
			this.$refs.mpvuePicker.show()
		},
		onConfirm(e) {
			this.pickerText = e.label
		},



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
					putReportImg(imgs).then(res => {
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
			if (this.loginUserInfo.hasRealName == 0) {
				uni.showToast({
					title: `实名后才可使用该功能,请显示名`,
					icon: 'none'
				})
				return
			}
			if(this.pickerText=='' || this.pickerText==null){
				uni.showToast({
					title: `请选择举报原因`,
					icon: 'none'
				})
				return
			}
			let data = {
				postsInfoId: this.reportId,
				userInfoId: this.loginUserInfo.id,
				reportTitle: this.pickerText,
				reportContents: this.reportText,
				reportImg1: this.imageUrl[0] || '',
				reportImg2: this.imageUrl[1] || ''
			}
			addPostsReport(data).then(res=>{
				if(res[1].data.code==200){
					uni.showToast({
						title: `举报成功，等待管理员审核`,
						icon: 'none'
					})
					self.pickerText=''
					self.reportText=''
				}else{
					uni.showToast({
						title: `信息提交失败`,
						icon: 'none'
					})
				}
			})
		}
	}

}
