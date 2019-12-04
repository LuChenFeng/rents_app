<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="/pages/login/reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="/pages/login/pwd/pwd">忘记密码</navigator>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input.vue'
	import global from '@/common/common.vue'
	import {
		userLoginByAppInfo,
		addToRedisByData
	} from '@/common/mixins/api.js'
	import {
		SocketUrl,
		addToRedisUrl
	} from '@/common/config.js'

	var self
	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		computed: {
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
		onLoad(e) {
			self = this
			global.city = ['北京市', '东城区']
		},
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			// 用户账号登入
			bindLogin() {
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				let data = {
					loginMethod: false,
					userTypeName: '会员用户',
					loginName: this.account,
					password: this.password,
					userName: this.account
				}
				this.userLoginBydata(data)
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo, value);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
				console.log("第三方正在登入中。。。。")
			},
			// 第三方登入
			toMain(userInfo, value) {
				if (value === 'weixin') {
					if (userInfo.province != '' && userInfo.city != '') {
						global.city = [userInfo.province, userInfo.city]
					}
				} else if (value === 'sinaweibo') {
					if (userInfo.location != '') {
						let location = (userInfo.location).split(' ')
						global.city = [location[0], location[1]]
					}
				}
				let data = {
					loginMethod: true,
					userTypeName: '会员用户',
					loginName: userInfo.openId,
					password: '',
					userName: userInfo.nickName,
					avatar: userInfo.avatarUrl
				}
				this.userLoginBydata(data)
			},
			// 调用后台api 登入成功后跳转页面
			userLoginBydata(data) {
				userLoginByAppInfo(data).then(res => {
					if (res[1].data.code == 450) {
						uni.showToast({
							title: res[1].data.msg,
							icon: 'none'
						})
					} else {
						self.$store.commit('setLogin', res[1].data.data)
						self.wssInitLogin(res[1].data.data)
					}
				})
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '/pages/tabBar/index/index',
					});
				} else {
					uni.navigateBack();
				}
			},
			// 建立ws连接
			wssInitLogin(loginUserInfo) {
				console.log(JSON.stringify(loginUserInfo))

				let data = {
					'id': loginUserInfo.id,
					'name': loginUserInfo.userName,
					'avatar': loginUserInfo.avatar
				}

				addToRedisByData(data).then(res => {
					console.log(res[1].data)
					if (res[1].data.code == 200) {
						self.wssInit(loginUserInfo)
					}

				})


			},
			wssInit(loginUserInfo) {

				let module = 'ChatNewService'; //操作类名
				uni.connectSocket({
					url: SocketUrl + loginUserInfo.id
				});
				console.log("连接到服务器。。" + SocketUrl + loginUserInfo.id);
				uni.onSocketOpen((res) => {
					debugger
					self.$store.commit('changeSocket', true)
					console.log('WebSocket连接已打开！');
				});
				uni.onSocketMessage((resopnse) => {
					let obj, fn;
					if (typeof resopnse.data == 'string' && resopnse.data.substring(0, 1) == '{') {
						obj = JSON.parse(resopnse.data);
						console.log('聊天室收到消息《《《《', obj)
						if (obj.data) {
							self.$store.commit('addPrivateMassagerList', obj.data)
						}
					}
				});
				uni.onSocketError((res) => {
					self.$store.commit('changeSocket', false)
					console.log('WebSocket连接错误！')
				});
				uni.onSocketClose((res) => {
					self.$store.commit('changeSocket', false)
					console.log('WebSocket 已关闭！');
				});
			},
		},
		onReady() {
			this.initPosition();
			this.initProvider();
		},

	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left:0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
