<template>
	<view class="uni-padding-wrap uni-common-mt page">


		<!-- flag=0 表示用户没有填写响应的性格信息 -->
		<text>{{flagFill == 0? "匹配室友前需要完成试题，请点击右上角图标":''}}</text>

		<!-- 下部分········································ -->
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in roommateList" :key="key">
				<view class="example-box">

					<uni-card :is-shadow="true" :title="value.userName" mode="title" :thumbnail="value.avatar" :extra="value.statement"
					 note="true" :id="key" @click="clickCard(key)">

						<view>
							<view class="content-box">
								<text>{{value.userStyle.isPets==1?'介意养宠物':''}}
							{{value.userStyle.isConstellation==1?'相信星座':''}}</text>
							<br/>
								<text>兴趣爱好：</text>
									{{value.userStyle.isSports==1?'运动类':''}}
									{{value.userStyle.isChess==1?'棋类':''}}
									{{value.userStyle.isTour==1?'旅游类':''}}
									{{value.userStyle.isMusical==1?'音乐类':''}}
									{{value.userStyle.isFilm==1?'影视类':''}}
									{{value.userStyle.isDance==1?'舞蹈类':''}}
									{{value.userStyle.isRead==1?'阅读类':''}}
								
							</view>
							<view class="tag-view">
								<uni-tag :text="value.hasRealName==1 ? '已实名': ''" type="success" size="small" />
								<uni-tag :text="'相似度：'+Math.round(value.similarity)+'%'" type="success" size="small" />
							</view>
						</view>

						<template v-slot:footer>
							<view class="footer-box">
								<view class="footer-box__item" @click.stop="footerClick('contact',key)" style="justify-content: center;"><text>联系ta
									</text></view>
							</view>
						</template>
					</uni-card>

				</view>
			</view>
		</view>
	</view>

</template>

<script src="./findRoommate.js"></script>
<style scoped>
	@import '../../index/haveRoom/haveRoom.css';
	@import './findRoommate.css';
</style>
