<template>
	<view class="uni-padding-wrap uni-common-mt">
		<!-- 选择图片 -->
 		<view class="uni-common-mt">
 				<view class="uni-list list-pd">
 					<view class="uni-list-cell cell-pd">
 						<view class="uni-uploader">
 							<view class="uni-uploader-head">
 								<view class="uni-uploader-title">依此上传正面、反面清晰的身份证图片</view>
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

<script src="./realName.js"></script>

<style scoped>
	@import './realName.css';
</style>
