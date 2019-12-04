<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row">
				<text class="title">电话：</text>
				<m-input type="text" clearable v-model="tel" placeholder="请输入联系电话"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue';
	import {
		userRegisteredByAppInfo
	} from '@/common/mixins/api.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				tel: ''
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 6 个字符'
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
				
				if (!RegExp(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/).test(this.tel)) {
					uni.showToast({
						icon: 'none',
						title: '联系方式不合法'
					});
					return;
				}

				const data = {
					loginMethod: false,
					userTypeName: "会员用户",
					loginName: this.account,
					password: this.password,
					userName: this.account,
					tel:this.tel
				}
				userRegisteredByAppInfo(data).then(res => {
					if (res[1].data.code == 450) {
						uni.showToast({
							title: res[1].data.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
