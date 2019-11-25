<template>
	<view class="uni-padding-wrap uni-common-mt page">

		<!-- 上部分········································ -->
<!-- 		<view class="uni-flex uni-row rowUpper" v-show="hasLogin">
	
			<view class="flex-item  rowUpperList1">
				<view class="upperIT">
					<view class="upperText upperText1">消息</view>
				</view>
			</view>

			<view class="flex-item  rowUpperList2" @tap="appointment">
				<view class="upperIT">
					<view class="upperText upperText2"> 预约</view>
				</view>
			</view>
		</view> -->

		<!-- 下部分········································ -->

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll" v-show="hasLogin">
			<view class="uni-list">
				
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in chatUserS" :key="key">
					<uni-swipe-action :options="options" :is-opened="isOpened" :auto-close="false" @opened="bindOpened" @closed="bindClosed"
					 @click="bindClick($event)" class="sliderHeight">
						<view class="flex-item flex-item-V  columnBelowList">
							<view class="columnBelowListView" @tap="chatRoom(key)">
								<view class="uni-media-list-logo">
									<image class="belowImg" :src="value.from.avatar==myAvatar?value.to.avatar:value.from.avatar"></image>
								</view>
								<view class="uni-media-list-body" style="width: 80vw;">
									<view class="belowText">{{value.from.name==myName?value.to.name:value.from.name}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">{{value.message}}</view>
								</view>
								<!-- <uni-badge text="1" type="error"></uni-badge> -->
								<view>{{value.time}}</view>
							</view>
						</view>
					</uni-swipe-action>
				</view>
			</view>
		</scroll-view>
		<button class="addRoommate" @tap="findRoommate" v-show="hasLogin">匹配室友</button>

		<view v-show="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>这是一款帮助需要合租人群，匹配相似的合租室友软件，使用之前需要先登入~</view>
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view>
	</view>

</template>

<script src="./news.js"></script>

<style scoped>
	@import '../../index/haveRoom/haveRoom.css';
	@import './news.css';
</style>
