<template>
	<view>
		<!-- 地址选择 -->
		<view class="mpvue-picker">
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		</view>

         <button class="addRoommate" @tap="findOrHaveRoom" >免费发布</button>
		<view class="uni-list">
	
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in roommateList" :key="key">
				
				<view class="example-box">
					<uni-card :is-shadow="true" :title="value.userName" mode="title" :thumbnail="value.avatar" :extra="value.postsInfo.limitSex==1?'限男':'限女'+'--'+value.postsInfo.gmtCreate"
					 note="true" :id="key" @click="clickCard(key)">
						<!-- 中间内容 -->
						<view>
							<!-- tag标签 -->
							<view class="tag-view">
								<uni-tag :text="value.hasRealName==1 ? '已实名': ''" size="small" type="success"  />
								<uni-tag :text="value.postTypeName"  size="small" type="error" />
								<uni-tag :inverted="true" :text="value.postsInfo.price+'元/月'" type="error" size="small" />
							</view>
							<!-- 标题 -->
							<view class="content-box">
								<view>{{value.postsInfo.title}}</view>
							</view>
							<!-- 图片  -->
							<view class="uni-list">
								<view class="uni-flex uni-row">
									<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(valueImg,keyImg) in value.imgs" :key="keyImg">
										<view class="flex-item">
											<image class="image imagesize" :src="valueImg" />
										</view>
									</view>
								</view>
							</view>
						</view>
						<template v-slot:footer>
							<view class="footer-box" style="color:rgb(153, 204, 153);">
								<view class="footer-box__item" @click.stop="footerClick(key)" style="justify-content: center;">
										<uni-icon type="location"  color="rgb(153, 204, 153);" size="20"/>
									<text>{{value.postsInfo.locationName}}</text>
								</view>
							</view>
						</template>
					</uni-card>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<style scoped>
	@import '../../news/findRoommate/findRoommate.css';
	@import './forum.css';
</style>
<script src="./forum.js"></script>
