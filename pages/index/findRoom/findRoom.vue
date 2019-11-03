<template>
	<view class="uni-padding-wrap uni-common-mt page">
		<!-- 上部分········································ -->
		<view class="uni-flex uni-row rowUpper">
			<!-- @tap="findOrHaveRoom" -->
			<view class="flex-item  rowUpperList1" @tap="haveRoom">
				<view class="upperIT">
					<view class="upperText upperText1" hover-class="none">我有房</view>
				</view>
			</view>

			<view class="flex-item  rowUpperList2">
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
							<uni-icon :type="'home'" class="belowIcon" :color="'#fb9da0'" size="20" />
							<view class="belowText">{{value.postTypeName}}<text class="belowTextSon">\n{{value.remarks}}</text></view>
							<view class="jianTou ">
								<label class="radio" @tap="selectRadio(value.id)">
									<radio :value="key" /> </label>
							</view>
						</view>
					</view>
				</view>
			</radio-group>
			<button class="next" type="primary" @tap="submitForum">下一步</button>
		</view>
	</view>

</template>

<script src="./findRoom.js"></script>

<style scoped>
	@import '../haveRoom/haveRoom.css';
	@import './findRoom.css';
</style>
