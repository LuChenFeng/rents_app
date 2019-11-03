<template>
	<view class="uni-padding-wrap uni-common-mt page">

		<view class="uni-flex uni-column columnBelow ">
			<view class="flex-item flex-item-V  columnBelowList">
				<view class="columnBelowListView">
					<view class="belowIcon belowIconColor1">标题</view>
					<input class="uni-input belowText" v-model="putMessage.title" placeholder="简述下房子的特点" />
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList">
				<view class="columnBelowListView">
					<view class="belowIcon belowIconColor3">租金</view>
					<input class="uni-input belowText" v-model="putMessage.price" type="number" placeholder="最多5位数{元/月}" />
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList columnBelowListTA columnBelowListTAL">
				<view class="columnBelowListView" @tap="chooseLocation">
					<view class="belowIcon belowIconColor3">位置</view>
					<block v-if="hasLocation === false">
						<view class="belowText">未选择位置</view>
					</block>
					<block v-if="hasLocation === true">
						<view class="belowText columnBelowListTA columnBelowListTAL">
							{{locationName}}--{{locationAddress}}
							<text>\nE: {{location.longitude[0]}}°{{location.longitude[1]}}′</text>
							<text>N: {{location.latitude[0]}}°{{location.latitude[1]}}′</text>
						</view>
					</block>
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList">
				<view class="columnBelowListView">
					<view class="belowIcon belowIconColor3">限制</view>
					<radio-group class="belowText">
						<label class="radio">
							<radio value="1"  @tap="selectSex(1)"/>限男</label>
						<label class="radio" >
							<radio value="2" id="2"   @tap="selectSex(2)"/>限女</label>
						<label class="radio">
							<radio value="0" id="0" checked="true"  @tap="selectSex(0)" />不限</label>
					</radio-group>
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList  columnBelowListTA">
				<view class="columnBelowListView columnBelowListTA">
					<view class="belowIcon belowIconColor3">描述</view>
					<view class="belowText uni-textarea">
						<textarea v-model="putMessage.contents" placeholder="详细描述可以吸引更多人哦,非必填">
							</textarea>
					</view>
				</view>
			</view>

			<view class="flex-item flex-item-V  columnBelowList columnBelowListS ">
				<!-- 图片############################################ -->
				<view class="uni-common-mt">
					<view class="uni-list list-pd">
						<view class="uni-list-cell cell-pd ">
							<view class="uni-uploader">
								<view class="uni-uploader-head">
									<view class="uni-uploader-title">点击可预览选好的图片</view>
									<view class="uni-uploader-info">{{imageList.length}}/8</view>
								</view>
								<view class="myimg">
									<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
									 @scroll="scroll">
										<view class="uni-uploader-body">
											<view class="uni-uploader__files  ">
												<block v-for="(image,index) in imageList" :key="index">
													<view class="uni-uploader__file">
														<image class="uni-uploader__img " :src="image" :data-src="image" @tap="previewImage"></image>
													</view>
												</block>
												<view class="uni-uploader__input-box">
													<view class="uni-uploader__input myimg" @tap="chooseImage"></view>
												</view>
											</view>
										</view>
									</scroll-view>

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 提交按钮 -->
			<button class="next" type="primary" @click="togglePopup('center', 'tip')">提交</button>
			<uni-popup :show="show" :type="type" :custom="true" :mask-click="false" @change="change">
				<view class="uni-tip">
					<view class="uni-tip-title">警告</view>
					<view class="uni-tip-content">发布中介信息、虚假信息、非租房信息，将被删帖或封禁账号</view>
					<view class="uni-tip-group-button">
						<view class="uni-tip-button" @click="cancel('no')">取消</view>
						<view class="uni-tip-button" @click="cancel('yes')">确定</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>

</template>

<script src="./submitForum.js"></script>

<style scoped>
	@import './submitForum.css';
</style>
