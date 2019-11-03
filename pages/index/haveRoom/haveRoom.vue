<template>
	<view class="uni-padding-wrap uni-common-mt page">
		<!-- 上部分········································ -->
		<view class="uni-flex uni-row rowUpper">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  rowUpperList1">
				<view class="upperIT">
					<view class="upperText upperText1">我有房</view>
				</view>
			</view>

			<view class="flex-item  rowUpperList2" @tap="findRoom" hover-class="none">
				<view class="upperIT">
					<view class="upperText upperText2"> 我无房</view>
				</view>
			</view>
		</view>

		<!-- 下部分········································ -->
		<view class="uni-flex uni-column columnBelow">
			<radio-group>
				<view v-for="(value,key) in postsType" :key="key">
					<view class="flex-item flex-item-V  columnBelowList">
						<view class="columnBelowListView">
							<uni-icon :type="'home'" class="belowIcon" :color="'#93aff5'" size="20" />
							<view class="belowText">{{value.postTypeName}}<text class="belowTextSon">\n{{value.remarks}}</text></view>
							<view class="jianTou ">
								<label class="radio" @tap="selectRadio(value.id)">
									<radio :value="value.id" /> </label>
							</view>
						</view>
					</view>
				</view>
			</radio-group>
			<button class="next" type="primary" @tap="submitForum">下一步</button>
		</view>
	</view>

</template>

<script src="./haveRoom.js"></script>

<style scoped>
	@import './haveRoom.css';
</style>
