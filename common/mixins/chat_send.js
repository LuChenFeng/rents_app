import {
	SocketModul,
	UploadFile
} from '@/common/config.js'
export default {
	data() {
		return {
			_imgArray: [], //上传图片数组
			uploadIndex: 0, //上传数标
			isUpload: false,
		}
	},
	computed: {
		isSocketOpen() {
			return this.$store.state.chat.isSocketOpen
		},
		ischatOnline() {
			return this.$store.state.chat.isOnline
		},
		user_info() {
			return this.$store.state.chat.user_info
		}
	},
	onLoad() {

	},
	onShow() {
		this.initUserInfo()
		if (this.isSocketOpen && !this.ischatOnline) {
			this.init()
		}
	},
	watch: {
		'isSocketOpen': function(value) {
			if (value) {
				setTimeout(() => {
					if (this.isSocketOpen) {
						this.init()
					}
				}, 1000)
			}
		}
	},
	methods: {
		init() {
			if (this.user_info.id) {
				this.initUserInfo()
			}
		},
		initUserInfo() {
			try {
				const value = uni.getStorageSync('chat_user_info');
				if (value.id && value.token) {
					let {
						id,
						nickname,
						figureurl
					} = value
					this.$store.commit('setChatUserInfo', {
						id,
						nickname,
						figureurl
					})
					return;
				}
			} catch (e) {}
},
		//发送消息
		sendSocketMessage(data, pushUrl) {
			if (!data.message) return
			if (!this.isSocketOpen) return
			self = this
			console.log('聊天室发送消息》》》》', data)
			let flag=true
			uni.request({
				url: pushUrl,
				data: data,
				method: "POST",
				header: {
					'content-type': 'application/json'
				},
				success: function(res) {
					if(res.data.code!=200){
						uni.showToast({
							title: `对方未上线`,
							icon: 'none'
						});
						self.flag= false
					}
				}
			})
			return flag
			// if(typeof str !== 'string'){
			// 	let {action,data}=str
			// 	let tpl={module,action,data};
			// 	str=JSON.stringify(tpl)
			// }
			// uni.sendSocketMessage({
			// 	data: str,
			// 	success:function(response){},
			// 	fail:function(){
			// 		self.$store.commit('changeSocket',false)
			// 	}
			// });

		},



		popup(err) {
			this.popupMessage = err.message || '末知错误'
			this.showPopup = true
			setTimeout(() => this.showPopup = false, 1000)
		},
	}
}
