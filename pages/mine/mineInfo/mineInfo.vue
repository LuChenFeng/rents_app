<template>
	<view class="uni-padding-wrap uni-common-mt page">
		<view class="head">
			<image class="headImg" :src="loginUserInfo.avatar"></image>
		</view>
		<view class="uni-flex uni-column columnBelow ">
			<view class="flex-item flex-item-V  columnBelowList">
				<view class="columnBelowListView">
					<view class="belowIcon belowIconColor1">昵称</view>
					<input class="uni-input belowText" v-model="userInfo.userName" placeholder="输入的你的昵称" />
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList">
				<view class="columnBelowListView">
					<view class="belowIcon belowIconColor3">性别</view>
					<radio-group class="belowText">
						<label class="radio">
							<radio value="0" :checked="loginUserInfo.sex=='男'" @tap="selectSex('男')" />男</label>
						<label class="radio">
							<radio value="1" id="2" :checked="loginUserInfo.sex=='女'" @tap="selectSex('女')" />女</label>

					</radio-group>
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList ">
				<view class="columnBelowListView ">
					<view class="belowIcon belowIconColor3">实名</view>
					<view class="belowText uni-textarea">
						{{loginUserInfo.hasRealName==0?"未实名":"已实名"}}
						<view v-show="loginUserInfo.hasRealName==0" @tap="realName">点击进入实名认证</view>
					</view>
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList">
				<view class="columnBelowListView">
					<view class="belowIcon belowIconColor3">电话</view>
					<input class="uni-input belowText" v-model="userInfo.tel" placeholder="输入你的联系手机号" />
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList  ">
				<view class="columnBelowListView ">
					<view class="belowIcon belowIconColor3">生日</view>
					<view class="belowText uni-textarea">
						<dyDate @getData="getData" placeholder="请选择日期" maxSelect="2002/12/31"></dyDate>
					</view>
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList  columnBelowListTA">
				<view class="columnBelowListView columnBelowListTA">
					<view class="belowIcon belowIconColor3">签名</view>
					<view class="belowText uni-textarea">
						<textarea v-model="userInfo.statement" placeholder="留下你的备注,非必填">
							</textarea>
					</view>
				</view>
			</view>

			<!-- 提交按钮 -->
			<button class="next" type="primary" @tap="submitUserInfo">保存</button>

		</view>
	</view>

</template>

<script src="./mineInfo.js"></script>

<style scoped>
	@import '../../index/submitForum/submitForum.css';
	@import './mineInfo.css';
</style>
