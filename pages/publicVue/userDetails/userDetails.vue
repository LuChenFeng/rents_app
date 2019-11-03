<template>
	<view>
		<view class="headInfo">
			<image class="headImg" :src="userInfo.avatar"></image>
			<view class="headText">
				<view class="headTextSon">
					{{userInfo.hasRealName==0?'未实名':'已实名'}}
				</view>
				<view class="headTextSon">{{userInfo.userName}}</view>
				<view class="headTextSon" style="color: #3F536E;">{{userInfo.statement || ''}}</view>
			</view>
			
			<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon" style="margin-top: 30vh;">性别</view>
			<view class="belowText">{{userInfo.sex}}</view>
			<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">年龄</view>
			<view class="belowText">{{((userInfo.birthady).split('-')[0])}}后</view>
			<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">兴趣</view>
			<view class="belowText">
				{{userInfo.userStyle.isSports==1?'运动类':''}}
				{{userInfo.userStyle.isChess==1?'棋类':''}}
				{{userInfo.userStyle.isTour==1?'旅游类':''}}
				{{userInfo.userStyle.isMusical==1?'音乐类':''}}
				{{userInfo.userStyle.isFilm==1?'影视类':''}}
				{{userInfo.userStyle.isDance==1?'舞蹈类':''}}
				{{userInfo.userStyle.isRead==1?'阅读类':''}}
			</view>
		</view>
			
		<view class="uni-padding-wrap uni-common-mt page"  style="margin-top: 60vh;">
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
								<view class="footer-box__item" @click.stop="footerClick(key)" style="justify-content: center;">
									<uni-icon type="location" color="rgb(153, 204, 153);" size="20" />
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
	</view>
</template>

<style scoped>	
	@import '../../tabBar/mine/mine.css';
	@import '../../news/findRoommate/findRoommate.css';

	@import './userDetails.css';
</style>
<script src="./userDetails.js"></script>
