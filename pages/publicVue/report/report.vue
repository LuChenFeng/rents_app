<template>
	<view class="uni-padding-wrap uni-common-mt">


		<view class="uni-flex uni-row rowUpper" style="position: relative;" @click="showSinglePicker">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  " style="position: relative; left: 0%;">
				举报原因：
			</view>
			<view class="flex-item " style="position: relative; right: 0%;">
			
				{{pickerText==''?'请选择':pickerText}}
				<uni-icon  class="flex-item " type="arrowright"   size="20"/>
			</view>
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		 

		<textarea maxlength="200" placeholder="补充说明不超过200字" style="width:100%;" v-model="reportText"></textarea>
		
		<!-- 选择图片 -->
 		<view class="uni-common-mt">
 				<view class="uni-list list-pd">
 					<view class="uni-list-cell cell-pd">
 						<view class="uni-uploader">
 							<view class="uni-uploader-head">
 								<view class="uni-uploader-title">补充图片证据，举报能被更快处理哦</view>
 								<view class="uni-uploader-info">{{imageList.length}}/2</view>
 							</view>
 							<view class="uni-uploader-body">
 								<view class="uni-uploader__files">
 									<block v-for="(image,index) in imageList" :key="index">
 										<view class="uni-uploader__file">
 											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
 										</view>
 									</block>
 									<view class="uni-uploader__input-box">
 										<view class="uni-uploader__input" @tap="chooseImage"></view>
 									</view>
 								</view>
 							</view>
 						</view>
 					</view>
 				</view>
 		</view>
		
		<button class="next" type="primary" style="margin-top: 5%;" @tap="submitReport">提交</button>
	</view>
</template>

<script src="./report.js"></script>

<style scoped>
	@import './report.css';
</style>
