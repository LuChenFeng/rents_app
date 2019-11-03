<template>
	<view class="uni-padding-wrap uni-common-mt page">



		 <button class="next" type="primary" @tap="submitForum" style="margin-bottom: 15%; background-color:#99CC99;">保存</button>
		
		<!-- 选择按钮 -->
		<view class="uni-flex uni-row rowUpper">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  rowUpperList1" @tap="fillInfor">
				<view class="upperIT">
					<view class="upperText upperText1">我的特点</view>
				</view>
			</view>

			<view class="flex-item  rowUpperList2">
				<view class="upperIT">
					<view class="upperText upperText2">理想房子</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script src="./idealHouse.js"></script>
<style scoped>
	@import '../../index/haveRoom/haveRoom.css';
	@import '../fillInfor/fillInfor.css';
	@import './idealHouse.css';
</style>
