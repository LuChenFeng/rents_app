<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row">
				<text class="title">电话：</text>
				<m-input type="text" focus clearable v-model="tel" placeholder="请输入联系电话"></m-input>
			</view>
			<view class="input-row">
				<text class="title">账号：</text>
				<m-input type="text" focus clearable v-model="loginName" placeholder="请输入你的账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="text" focus clearable v-model="password" placeholder="请输入你的新密码"></m-input>
			</view>
			<view class="input-row">
				<text class="title">确认密码：</text>
				<m-input type="text" focus clearable v-model="passwordG" placeholder="请再次输入新密码"></m-input>
			</view>
		</view>

		<view class="btn-row">
			<button type="primary" class="primary" @tap="findPassword">提交</button>
		</view>
	</view>
</template>

<script>
	import service from '@/service.js';
	import mInput from '@/components/m-input.vue';
	import {
		updateUserPwd
	} from '@/common/mixins/api.js'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				loginName: '',
				tel: '',
				password: '',
				passwordG: '',
				isTel: false
			}
		},
		methods: {
			findPassword() {
				if (!RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/).test(this.password)) {
					uni.showToast({
						icon: 'none',
						title: '密码至少包含 数字和英文，长度6-12'
					});
					return;
				}

				if (this.password != this.passwordG) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
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

				let data = {
					loginName: this.loginName,
					tel: this.tel,
					password: this.password
				}
				updateUserPwd(data).then(res => {
					if (res[1].data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: '修改成功'
						})
						uni.navigateTo({
							url: '/pages/login/login',
						});
					}else if(res[1].data.code == 450){
						uni.showToast({
							icon: 'none',
							title: res[1].data.msg
						})
					}
					 else {
						uni.showToast({
							icon: 'none',
							title: '修改失败，可能是账号有误'
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
