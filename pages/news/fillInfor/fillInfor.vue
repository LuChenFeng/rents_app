<template>
	<view class="uni-padding-wrap uni-common-mt page">
		<view style="color: #555555; font-size: 1vw; margin-bottom: 2%;">填写以下信息，我们将会保护好你的隐私（除兴趣爱好外）</view>
		<view class="uni-list" style="position: relative;">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in list" :key="key">
				<view class="uni-flex uni-column mySlider">
					<view class="flex-item flex-item-V" style="font-size: 2.5vh;">
						<view class="uni-flex uni-row" style="width: 100%;">
							<view class="flex-item">{{value.title}}</view>
							<view class="flex-item" style="color: #555555; position: absolute; right: 9%;">{{value.flag==0? value.name1:value.name2}}指数：{{value.fraction}}</view>
						</view>
					</view>
					<view class="flex-item flex-item-V">
						<view class="uni-flex uni-row">
							<view class="flex-item" style="color: #555555;">{{value.name1}}</view>
							<view class="flex-item" style="width: 80%;">
								<slider value="10" @change="sliderChange('$event',key)" @mouseenter="sliderClick(key)" activeColor="#99CC99"
								 backgroundColor="#FFCCCC" block-color="#FFCC33" block-size="20" max="20" />
							</view>
							<view class="flex-item" style="color: #555555;">{{value.name2}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view @tap="showMulLinkageTwoPicker">点击选择我所在城市：
			{{city}}
		</view>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>

		<view class="uni-title uni-common-mt">我的兴趣爱好：</view>
		<view class="example-body">
			<checkbox-group @change="checkboxChange">
				<uni-grid :column="3" :highlight="true">
					<uni-grid-item v-for="item in hobby" :key="item.value">
						<view>
							<checkbox :value="item.value" :checked="item.checked" />
						</view>
						<view class="text">{{item.name}}</view>

					</uni-grid-item>
				</uni-grid>
			</checkbox-group>
		</view>
		<button class="next" type="primary" @tap="submitForum" style="margin-bottom: 15%; background-color:#99CC99;">保存</button>

		<!-- 选择按钮 -->
		<view class="uni-flex uni-row rowUpper">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  rowUpperList1">
				<view class="upperIT">
					<view class="upperText upperText1">我的特点</view>
				</view>
			</view>

			<view class="flex-item  rowUpperList2" @tap="idealHouse">
				<view class="upperIT">
					<view class="upperText upperText2">理想房子</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script src="./fillInfor.js"></script>
<style scoped>
	@import '../../index/haveRoom/haveRoom.css';
	@import './fillInfor.css';
</style>
