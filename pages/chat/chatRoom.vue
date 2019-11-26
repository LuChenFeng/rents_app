<template>
	<view class="content">
		<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
		 :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">

			<!-- 加载历史数据waitingUI  @touchstart="hideDrawer" -->
			<view class="loading">
				<view class="spinner">
					<view class="rect1"></view>
					<view class="rect2"></view>
					<view class="rect3"></view>
					<view class="rect4"></view>
					<view class="rect5"></view>
				</view>
			</view>


			<view class="row" v-for="(value,index) in privateMassagerList" :key="index" :id='"message"+index'>
				<view class="my" v-if="value.from.id != receive_id">
					<view class="left">
						<view class="username">
							<view class="time">{{value.time}}</view>
							<view class="name">{{value.from.name}}</view>
						</view>
						<chat-message :row="value"></chat-message>
					</view>
					<view class="right">
						<image :src="value.from.avatar" class="figureurl"></image>
					</view>
				</view>

				<view v-else class="other">
					<view class="left">
						<image :src="value.from.avatar" class="figureurl"></image>
					</view>
					<view class="right">
						<view class="username">
							<view class="name">{{value.from.name}}</view>
							<view class="time">{{value.time}}</view>
						</view>

						<chat-message :row="value"></chat-message>
					</view>
				</view>

			</view>
		</scroll-view>

		<!-- 输入框 -->
		<view class="input-box" :class="popupLayerClass">
			<view class="textbox">
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" :value="textMsg" :cursor="cursor" @blur='textareaBlurEvent' />
						</view>
				</view>
			</view>
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view> 

	</view>
</template>

<script>
import chatMessage from '@/components/chat-message/chat-message.vue'
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import chatSend from '@/common/mixins/chat_send.js'
import global from '@/common/common.vue'
import {
	PushUrl,
	GetMsgUrl
} from '@/common/config.js'
var _self //用来方list
var toUser //聊天对象
export default {

	components: {
		chatMessage,
		uniPopup
	},
	mixins: [chatSend],
	data() {
		return {
			scrollAnimation: false, //滑动动画开关
			scrollTop: 0, //竖向滚动条位置
			scrollToView: '', //滚动到元素位置
			
			// 聊天输入框相关
			textMsg: '', //输入文本
			cursor: 0, //输入框中光标位置

			/* 以下是聊天对象 */
			receive_id: "" //私聊对象
		}
	},

	computed: {
		//对话用户信息
		receive_user_info() {
			let key = '_chat_new_' + this.receive_id
			return this.$store.state.chat.userListObject[key] || {}
		},
		//私聊列表
		privateMassagerList() {
			return this.$store.getters.privateMassagerObject
		},
		forcedLogin(){
			return this.$store.getters.getForcedLogin
		},
		hasLogin(){
			return this.$store.getters.getHasLogin
		},
		loginUserInfo(){
			return this.$store.getters.getLoginUserInfo
		}
	},
	watch: {
		// 有新消息室自动往上顶
		'privateMassagerList': function() {
			let that = this
			this.$nextTick(function() {
				that.scrollToView = "message" + (that.privateMassagerList.length - 1)
			})
		}
	},
	onLoad(e) {
		_self = this
		this.receive_id = e.toId
		this.toUser = {
			'id': e.toId,
			'name': e.toName,
			'avatar': e.toAvatar
		}
		this.getPrivateChat()
		console.log(JSON.stringify(_self.msgList))
	},
	onUnload() {},
	onShow() {
		if (this.receive_id === "") {
			this.receive_id = this.$store.state.chat.private_id
		}
		if (!this.receive_id) {
			// uni.reLaunch({url:"/pages/chat/match"});
		}
		uni.setNavigationBarTitle({
			title: "与" + this.toUser.name + "的对话"
		});
		this.$store.commit('cancelMassagerTips', this.receive_id)


	},
	onHide() {
		this.$store.commit('changPrivateiId', 0)
	},
	methods: {

		//  触发滑动到顶部(加载历史信息记录)
		loadHistory() {},

		// 输入框边界上显示更多
		showMore() {
			this.hideMore = false
			this.popupLayerClass = 'showLayer';
		},
		//输入框失去焦点
		textareaBlurEvent(event) {
			this.textMsg = event.detail.value
			this.cursor = event.detail.cursor || 0;
		},


		//  发送信息
		sendText() {
			if(this.loginUserInfo.hasRealName==0){
				uni.showToast({
					title: `实名后才可使用该功能,请显示名`,
					icon: 'none'
				})
				return
			}
			console.log(this.loginUserInfo)
			if (this.textMsg === '') return
			let text = this.textMsg
			// setTimeout(() => {
			// 	this.textMsg = ''
			// }, 0)
			console.log("我要发送的消息：" + text)
			let pushUrl = PushUrl + "/" + this.toUser.id
			let sendUser = {
				'id': this.loginUserInfo.id,
				'name': this.loginUserInfo.userName,
				'avatar': this.loginUserInfo.avatar
			}
			let receiveUser = {
				'avatar': this.toUser.avatar,
				'id': this.toUser.id,
				'name': this.toUser.name,
			}
				let date=new Date(time)
		let newMsg={
			'from': sendUser,
			'to':receiveUser,
			'message': text,
			'time':time
		}
			let flag = this.sendSocketMessage(newMsg, pushUrl)
			let time = global.dateFormat(new Date()) 
			if (flag) {
					_self.textMsg = ''
				_self.$store.commit('addPrivateMassagerList', newMsg)
			}

		},
		//取得聊天记录
		getPrivateChat() {
			uni.request({
				url: GetMsgUrl + "/" + this.loginUserInfo.id + "/" + this.toUser.id,
				method: "GET",
				success: function(res) {
					_self.$store.commit('setPrivateMassagerList', res.data.data)
				}
			})


		}
	}
}

</script>

<style lang="scss">
	@import "@/static/css/chat.scss"; 
	.page{
	    /*距离顶部范围应该在118-122范围内*/
	    padding-bottom: 118upx;
	}
	
</style>
