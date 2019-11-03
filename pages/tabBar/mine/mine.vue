<template>
	<view>
		<swiper class="topHeight">
			<swiper-item v-for="(img, key) in imgUrls" :key="key">
				<image :src="img" class="topImg" />
			</swiper-item>
		</swiper>
		<view class="headInfo" v-show="hasLogin">
			<image class="headImg" :src="loginUserInfo.avatar"></image>
			<view class="headText">
				<view class="headTextSon">
					{{loginUserInfo.hasRealName==0?'未实名':'已实名'}}
				</view>
				<view class="headTextSon">{{loginUserInfo.userName}}</view>
				<view class="headTextSon" style="color: #3F536E;">{{loginUserInfo.statement || ''}}</view>
			</view>
		</view>
		<!-- 列表部分 -->
		<view class="uni-padding-wrap uni-common-mt page" >
			
			<view class="flex-item flex-item-V  columnBelowList1" @tap="mineInfo" v-show="hasLogin">
				<view class="columnBelowListView">
					<uni-icon :type="'gear'" class="belowIcon" :color="'#00000'" size="22" />
					<view class="belowText">资料</view>
					<uni-icon :type="'arrowright'" class="jianTou" :color="'#666666'" size="20" />
				</view>
			</view>
			
			<view class="flex-item flex-item-V  columnBelowList1"  v-show="hasLogin" @tap="minePosts">
				<view class="columnBelowListView">
					<uni-icon :type="'chatboxes'" class="belowIcon" :color="'#00000'" size="22" />
					<view class="belowText">发布历史</view>
					<uni-icon :type="'arrowright'" class="jianTou" :color="'#666666'" size="20" />
				</view>
			</view>


			
			<view class="content"  >
			    <view class="btn-row">
			        <button v-show="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			        <button v-show="hasLogin" type="default" @tap="bindLogout">退出登录</button>
			    </view>
			</view>
			
		</view>
	</view>


</template>

<script src="./mine.js"></script>

<style scoped>
	@import './mine.css';
</style>
