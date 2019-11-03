
<template>
	<view>
		
		<view :class="{ 'calendar-content-active ': infoShow }" class="calendar-content">
			<!-- 日历 -->
			<uni-calendar class="calendar" :insert="true" :start-date="startDate" :end-date="endDate" :date="date" :selected="selected"
			 @change="change" :mode="2"  />
			<button @click="reckon" class="reckonbtn">{{ timeData.clockinfo.have ? '在家' : '出差' }}</button>
			<view>出差:{{selected.length}}天</view>
		</view>
		
		<view class="qiun-columns">
			<view class="qiun-charts">
				<!--#ifdef MP-ALIPAY -->
				<canvas canvas-id="myCanvasPie" id="myCanvasPie" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="myCanvasPie" id="myCanvasPie" class="charts"></canvas>
				<!--#endif-->
				
			</view>
		</view>
		
	</view>

</template>

<script src="./costSharing.js"></script>

<style scoped>
	@import './costSharing.css';
</style>
