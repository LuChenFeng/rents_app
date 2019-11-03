<template>
	<view class="uni-padding-wrap uni-common-mt page">
		<!-- 上部分········································ -->
		<view class="uni-flex uni-row rowUpper">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  rowUpperList1" @tap="news">
				<view class="upperIT">
					<view class="upperText upperText1">消息</view>
				</view>
			</view>

			<view class="flex-item  rowUpperList2">
				<view class="upperIT">
					<view class="upperText upperText2"> 预约</view>
				</view>
			</view>
		</view>
		
		<!-- 下部分········································ -->

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		 @scroll="scroll">

			<!-- #ifndef MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
			<uni-list>

				<uni-swipe-action :options="options" :is-opened="isOpened" :auto-close="false" @opened="bindOpened" @closed="bindClosed"
				 @click="bindClick($event)" class="sliderHeight">
				 <!-- <uni-list-item> -->
					<view class="flex-item flex-item-V  columnBelowList">
						<view class="columnBelowListView">
							<image  class="belowImg" src="../../../static/logo.jpg"></image>
							<view class="belowText">合租找室友<text class="belowTextSon">\n我要找室友一起合租</text></view>
						</view>
					</view>
					<!-- </uni-list-item> -->
				</uni-swipe-action>
				
				<uni-swipe-action :options="options" :is-opened="isOpened" :auto-close="false" @opened="bindOpened" @closed="bindClosed"
				 @click="bindClick($event)" class="sliderHeight">
				 <!-- <uni-list-item> -->
					<view class="flex-item flex-item-V  columnBelowList">
						<view class="columnBelowListView">
							<image  class="belowImg" src="../../../static/logo.jpg"></image>
							<view class="belowText">合租找室友<text class="belowTextSon">\n我要找室友一起合租</text></view>
						</view>
					</view>
					<!-- </uni-list-item> -->
				</uni-swipe-action>

				
			</uni-list>
			<!-- #endif -->
		</scroll-view>
		
		
		
	</view>
</template>

<script src="./appointment.js"></script>

<style scoped>
	@import '../../index/haveRoom/haveRoom.css';
	@import '../../tabBar/news/news.css';
	@import './appointment.css';
</style>
