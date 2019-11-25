<style>
	@import './index.css';
</style>



<template>

	<view class="uni-padding-wrap uni-common-mt page">


		<!-- 上部分········································ -->
		<view class="uni-flex uni-row rowUpper" v-show="hasLogin">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  rowUpperList1" @tap="haveRoom">
				<view class="upperIT">
					<image class="upperImg" src="/static/img/index/index1.png"></image>
					<!-- <text>\n我找/有房间</text> -->
					<view class="upperText upperText1"><text class="upperTextsize">我有房间</text></view>
				</view>
			</view>


			<view class="flex-item  rowUpperList2" @tap="findRoom">
				<view class="upperIT">
					<image class="upperImg" src="/static/img/index/index2.png"></image>
					<view class="upperText upperText2"> 我找房间</view>
				</view>
			</view>

		</view>
		<!-- 下部分········································ -->
		<view class="uni-flex uni-column columnBelow" v-show="hasLogin">
			<view class="flex-item flex-item-V  columnBelowList1" @tap="costSharing">
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor1"></view>

					<uni-icon :type="'contact'" class="belowIcon" :color="'#469f94'" size="20" />
					<view class="belowText">我的出差记录</view>
					<uni-icon :type="'arrowright'" class="jianTou" :color="'#666666'" size="20" />
				</view>
			</view>
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item flex-item-V  columnBelowList2" @tap="findRoommate">
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor2"></view>
					<uni-icon :type="'home'" class="belowIcon" :color="'#f59393'" size="20" />
					<view class="belowText">找室友</view>
					<uni-icon :type="'arrowright'" class="jianTou" :color="'#666666'" size="20" />
				</view>
			</view>
			<view class="flex-item flex-item-V  columnBelowList3" @tap="findHome">
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor3"></view>
					<uni-icon :type="'pengyouquan'" class="belowIcon" :color="'#70a7c1'" size="20" />
					<view class="belowText">找房源</view>
					<uni-icon :type="'arrowright'" class="jianTou" :color="'#666666'" size="20" />
				</view>
			</view>
		</view>

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


<script src="./index.js"></script>
