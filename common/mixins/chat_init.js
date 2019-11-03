import {
	mapMutations
} from 'vuex'
import {
	SocketUrl,
	addToRedisUrl
} from '@/common/config.js'
import {
	addToRedisByData
} from '@/common/mixins/api.js'
//import global from '@/common/common.vue'
export default {
	data() {
		return {
			intervalId: null
		}
	},
	computed: {
		isSocketOpen() {
			return this.$store.state.chat.isSocketOpen
		},
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
	watch: {},
	onShow: function() {
		let self = this
		if (!self.isSocketOpen && self.hasLogin) {
			console.log("!self.isSocketOpen为真")
			this.addToRedis()
			this.wssInit()
		}
		this.intervalId = setInterval(() => {
			if (self.isSocketOpen && self.hasLogin) {
				uni.sendSocketMessage({
					data: '',
					fail: function() {
						self.$store.commit('changeSocket', false)
						self.wssInit()
					}
				})
			} else if (self.hasLogin) {
				console.log("执行了连接wssInit的方法")
				self.addToRedis()
				self.wssInit()
			}
		}, 50000) //50秒发送一次心跳

	},
	onHide: function() {
		clearInterval(this.intervalId)
		// #ifdef APP-PLUS
		uni.closeSocket()
		// #endif
	},
	methods: {
		...mapMutations([
			'',
			'receiveChatOnOpen', //登录广播
			'receiveChatUserList', //取得用户列表
			'receiveChatPrivate', //接收私聊
			'receiveChatPrivateList', //刷新用户对话消息
			'receiveChatOnLine', //用户上线
			'receiveChatOffLine', //当前设备用户不在线
		]),
		receiveLogOut(data) { //用户离线
			//console.log(data)
		},
		receiveErrorMessage(data) { //错误信息
			//console.log(data)
		},

		//连接后端 把用户添加到redis 列表中
		addToRedis() {
			let data = {
				'id': this.loginUserInfo.id,
				'name': this.loginUserInfo.userName,
				'avatar': this.loginUserInfo.avatar
			}

			addToRedisByData(data).then(res => {
				console.log(res[1].data)
			})
		},

		//连接wss 服务
		wssInit() {
			let _self = this
			let module = 'ChatNewService'; //操作类名
			uni.connectSocket({
				url: SocketUrl + _self.loginUserInfo.id
			});
			console.log("连接到服务器。。" + SocketUrl + _self.loginUserInfo.id);
			uni.onSocketOpen((res) => {
				debugger
				this.$store.commit('changeSocket', true)
				console.log('WebSocket连接已打开！');
			});
			uni.onSocketMessage((resopnse) => {
				let obj, fn;
				if (typeof resopnse.data == 'string' && resopnse.data.substring(0, 1) == '{') {
					obj = JSON.parse(resopnse.data);
					console.log('聊天室收到消息《《《《', obj)
					if (obj.data) {
						this.$store.commit('addPrivateMassagerList', obj.data)
					}
				}
			});
			uni.onSocketError((res) => {
				this.$store.commit('changeSocket', false)
				console.log('WebSocket连接错误！')
			});
			uni.onSocketClose((res) => {
				this.$store.commit('changeSocket', false)
				console.log('WebSocket 已关闭！');
			});
		},
	}
}
