<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in roommateList" :key="key">

				<view class="example-box">
					<uni-card :is-shadow="true" :title="value.userName" mode="title" :thumbnail="value.avatar" :extra=" (value.postsInfo.limitSex==1?'限男--':'限女--')+value.postsInfo.gmtCreate"
					 note="true" :id="key" @click="clickCard(key)">
						<!-- 中间内容 -->
						<view>
							<!-- tag标签 -->
							<view class="tag-view">
								<uni-tag :text="value.hasRealName==1 ? '已实名': ''" size="small" type="success" />
								<uni-tag :text="value.postTypeName" size="small" type="error" />
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
								<view class="footer-box__item" @click.stop="footerClick(key, value.postsInfo.id,'location')" style="justify-content: center;">
									<uni-icon type="location" color="rgb(153, 204, 153);" size="20" />
									<text>{{value.postsInfo.locationName}}</text>
								</view>
								<view class="footer-box__item" @click.stop="footerClick(key,value.postsInfo.id,'del')" style="justify-content: center;">
									<text style="color:#F76260;">删除</text>
								</view>
	
							</view>
						</template>
					</uni-card>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		<uni-popup :show="showPopup" type="center" :custom="true" :mask-click="false" @change="change">
			<view class="uni-tip">
				<view class="uni-tip-title">警告</view>
				<view class="uni-tip-content">一旦删除将无法恢复，确认删除吗</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel('no')">取消</view>
					<view class="uni-tip-button" @click="cancel('yes')">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<style scoped>
	@import '../../news/findRoommate/findRoommate.css';
	@import './minePosts.css';
</style>
<script src="./minePosts.js"></script>
