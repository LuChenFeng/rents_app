
<template>
	<view>
		
		<view :class="{ 'calendar-content-active ': infoShow }" class="calendar-content">
			<!-- 日历 -->
			<uni-calendar class="calendar" :insert="true" :start-date="startDate" :end-date="endDate" :date="date" :selected="selected"
			 @change="change" @month-switch	="monthSwitch" :mode="2"  />
			<button @click="reckon" class="reckonbtn">{{ timeData.clockinfo.have ? '在家' : '出差' }}</button>
			<view>出差:{{selected.length}}天</view>
			<view>提示：目前只支持记录当月记录，如有需要可截图保存</view>
		</view>
		

		
	</view>

</template>

<script src="./costSharing.js"></script>

<style scoped>
	@import './costSharing.css';
</style>
