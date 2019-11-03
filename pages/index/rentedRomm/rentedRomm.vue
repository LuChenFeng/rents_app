<template>
<view class="uni-padding-wrap uni-common-mt page">

		<view class="uni-flex uni-column columnBelow">
			<view class="flex-item flex-item-V  columnBelowList1 columnBelowListColor1" @tap="costSharing">
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor1"></view>
					<uni-icon :type="'contact'" class="belowIcon" :color="'#469f94'" size="20"/>
					<view class="belowText">家中开销合理分</view>
					<uni-icon :type="'arrowright'" class="jianTou"  :color="'#666666'" size="20"/>
				</view>
			</view>
		
		
			<view class="flex-item flex-item-V  columnBelowList1 columnBelowListColor2" @tap="cleaning">
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor2"></view>
					<uni-icon :type="'home'" class="belowIcon"  :color="'#f59393'" size="20"/>
					<view class="belowText">公共区卫生安排</view>
					<uni-icon :type="'arrowright'" class="jianTou"  :color="'#666666'" size="20"/>
				</view>
			</view>
			
			
			<view class="flex-item flex-item-V  columnBelowList1 columnBelowListColor3">
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor3"></view>
					<uni-icon :type="'pengyouquan'" class="belowIcon"   :color="'#70a7c1'" size="20"/>
					<view class="belowText">评价室友/房源情</view>
					<uni-icon :type="'arrowright'" class="jianTou"  :color="'#666666'" size="20"/>
				</view>
			</view>
			
			<view class="flex-item flex-item-V  columnBelowList1 columnBelowListColor4" >
				<view class="columnBelowListView">
					<view class="belowStrip belowStripColor3"></view>
					<uni-icon :type="'pengyouquan'" class="belowIcon"   :color="'#70a7c1'" size="20"/>
					<view class="belowText">智能家居</view>
					<uni-icon :type="'arrowright'" class="jianTou"  :color="'#666666'" size="20"/>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script src="./rentedRomm.js" ></script>

<style scoped>
  @import './rentedRomm.css';
</style>

