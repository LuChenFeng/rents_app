<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt page ">
			<view class="uni-flex uni-column ">
				<!-- 标题 -->
				<view class="flex-item flex-item-V  columnBelowList">
					<view class="tag-view" style="width: auto;">
						<uni-tag :text="postList.postTypeName" size="small" type="success" />
					</view>
					<view style="width: auto;font-weight:bolder; width: 80%;">{{postList.postsInfo.title}}</view>
				</view>

				<!-- 用户信息 -->
				<view class="flex-item flex-item-V  columnBelowList centerHeight">
					<view class="uni-media-list-logo">
						<image class="belowImg" :src="postList.avatar"></image>
					</view>
					<view class="uni-media-list-body ">
						<view class="belowText">{{postList.userName}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">{{postList.postsInfo.gmtCreate}}</view>
					</view>
					<view style="color: #3B4144;" @tap="report">
						举报
					</view>
				</view>

				<!-- 关于我 -->
				<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">关于我</view>
				<view class="belowText">{{postList.sex}}-{{postList.hasRealName==1?'以实名':'未实名'}}</view>

				<!-- 租金 -->
				<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">租金</view>
				<view class="belowText">{{postList.postsInfo.price}}元/月</view>

				<!-- 性别限制 -->
				<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">性别限制</view>
				<view class="belowText">{{postList.postsInfo.limitSex==0?"不限男女":postList.postsInfo.limitSex==1?"限男":"限女"}}</view>

				<!-- 查看地图 -->
				<view @click.stop="openLocation">
					<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">位置（点击可查看地图）</view>
					<view class="belowText">
						<uni-icon type="location" color="rgb(153, 204, 153);" size="20" />
						<text style="color:rgb(153, 204, 153);">{{postList.postsInfo.locationName}}</text>
					</view>
				</view>

				<!-- 正文 -->
				<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">正文</view>
				<text class="belowText" style="margin-bottom: 5%; width: 99%;">{{postList.postsInfo.contents}}</text>

				<!-- 图片 -->
				<view class="flex-item flex-item-V" style="position: relative;">
					<block v-for=" (image,index) in postList.imgs" :key="index">
						<view class="uni-uploader__file  houseImg">
							<image class="uni-uploader__img " :src="image" :data-src="image" @tap="previewImage"></image>
						</view>
					</block>
				</view>

				<!-- 提示 -->
				<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon">温馨提示</view>
				<text class="belowText" style="margin-bottom: 15%; width: 99%; color: #8f8f94;">
					1、异性合租需谨慎
					2、没完成合同前，不要交任何费用
					3、谨防以帮助搬贴为名的其他平台推广人员
				</text>
				<view class="uni-media-list-text-bottom uni-ellipsis belowTextSon" style=" margin-bottom: 15%; color:rgb(153, 204, 153);"
				 @tap="getPostsComment">点击查看评论</view>
				<!-- 评论区 start -->
				<view class="uni-comment" hover-class="uni-list-cell-hover" v-for="(value,key) in postsCommentList" :key="key"
				 style=" margin-bottom: 15%;">
					<view class="uni-comment-list">
						<view class="uni-comment-face">
							<image :src="value.avatar" mode="widthFix"></image>
						</view>
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text>{{value.userName}}</text>
							</view>
							<view class="uni-comment-date">
								<text>{{value.gmtCreate}}</text>
								<view class="rowUpperList2 bottomselectSonBtn" v-show="value.userId==loginUserInfo.id" @tap="delComment(value.commentId)">删除</view>
								<view class="rowUpperList2 bottomselectSonBtn" v-show="value.userId!=loginUserInfo.id" @tap="addReply(value.commentId)">回复</view>
							</view>
							<view class="uni-comment-content">{{value.content}}</view>
							<view v-if="value.repliesSize>0" @tap="getPostsReply(value.commentId,key)">
								<view>{{value.repliesSize}}个回复</view>
							</view>
							<view class="uni-comment" v-for="(repValue,repKey) in value.postsReplies" :key="repKey">
								<view class="uni-comment-list" style="background-color:#E7E7E7;">
									<view class="uni-comment-face">
										<image :src="repValue.avatar" mode="widthFix"></image>
									</view>
									<view class="uni-comment-body">
										<view class="uni-comment-top">
											<text>{{repValue.userName}}</text>
										</view>
										<view class="uni-comment-date">
											<text>{{repValue.gmtCreate}}
											</text>
											<view class="rowUpperList2 bottomselectSonBtn" v-if="repValue.userId==loginUserInfo.id" @tap="delReply(repValue.replyId)">删除</view>
										</view>
										<view class="uni-comment-content">{{repValue.content}}</view>
									</view>
								</view>

							</view>

						</view>
					</view>
				</view>
				<!-- 评论区 end -->
			</view>
		</view>


		<view class="uni-flex uni-row bottomselect">
			<view class="flex-item bottomselectSon" @click="comment('centerChangeAdd','tip')">
				<uni-icon type="chat" color="rgb(153, 204, 153);" size="20" />留言
				<uni-popup :show="showChangeAdd" :type="type" :custom="true" :mask-click="false" @change="change">
					<view class="uni-tip">
						<view class="uni-tip-title">请输入名称</view>
						<view class="uni-tip-content">
							<input maxlength="50" autocomplete="off" class="uni-input " placeholder="输入留言,最多50个字符" style="width:100%; text-align: center;"
							 v-model="addPostsComment" />
						</view>
						<view class="uni-tip-group-button">
							<view class="uni-tip-button" @tap="cancel('yes','','changeAdd')">确定</view>
						</view>
					</view>
				</uni-popup>

			</view>

			<!-- 		<view class="flex-item bottomselectSon" @tap="comment">
				<uni-icon type="star" color="rgb(153, 204, 153);" size="20" />收藏
			</view> -->

			<view class="flex-item bottomselectSon" @tap="sharePost">
				<uni-icon type="redo" color="rgb(153, 204, 153);" size="20" />分享
			</view>

			<button class="rowUpperList2 bottomselectSonBtn" @tap="contact">联系ta</button>
		</view>

	</view>
</template>

<script src="./forumDetails.js"></script>

<style scoped>
	@import './forumDetails.css';
</style>
