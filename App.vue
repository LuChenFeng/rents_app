<script>
	import chat from '@/common/mixins/chat_init.js'
	export default {
		mixins: [chat],
		onLaunch: function() {
			console.log('App Launch');
			var domModule = weex.requireModule('dom');
			domModule.addRule('fontFace', {
				'fontFamily': "uniicons",
				'src': "url('./static/uni.ttf')"
			});

			// #ifdef APP-PLUS
			plus.push.addEventListener('receive', function(msg) {
				plus.push.createMessage('receive teile')
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			let info = plus.push.getClientInfo().clientid
			console.log('onShow', JSON.stringify(info))
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
		/*每个页面公共css */
		@import "./common/uni.css";
	
	
		*,
		::after,
		::before {
			box-sizing: content-box;
		}
	
		.page {
			position: absolute;
			height: 95%;
		}
	
	
		/* 上部分的两个 */
		.rowUpper {
			height: 40%;
			margin-bottom: 10%;
		}
	
		.navigatorTap {
			position: relative;
			height: 100%;
			width: 49%;
		}
	
		.rowUpperList1,
		.rowUpperList2 {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			/* width: 49%; */
			border-radius: 5%;
			/* box-shadow: 0 -1px 1px 0px rgb(185, 181, 181) inset; */
		}
	
		.rowUpperList1 {
			/* margin-right: 1%; */
	
		}
	
		.rowUpperList2 {
			/* margin-left: 1%; */
	
		}
	
		.upperIT {
			position: relative;
			height: 50%;
			width: 50%;
		}
	
		.upperImg {
			display: flex;
			opacity: 0.60;
			height: 70%;
			width: 100%;
		}
	
		.upperText {
			position: relative;
			height: 30%;
			width: 100%;
			text-align: center;
	
		}
	
		.upperTextsize {
			font-style: 4vh;
		}
	
	
	
		/* 下部分                 -----------                 */
		.columnBelow {
			height: 45%;
			margin-bottom: 15%;
		}
	
		.columnBelowList1,
		.columnBelowList2,
		.columnBelowList3 {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30%;
			box-shadow: 0 -1px 0 0 rgb(227, 220, 220) inset;
	
		}
	
		.columnBelowListView {
			display: flex;
			width: 100%;
			height: 50%;
			justify-content: center;
			align-items: center;
		}
	
		.belowStrip {
			position: relative;
			left: -13.5%;
			height: 100%;
			width: 1%;
		}
	
		.belowIcon {
			position: relative;
			height: auto;
			width: 12%;
			left: -10%;
			font-size: 20px;
		}
	
		.belowText {
			position: relative;
			left: -12%;
			height: auto;
			width: 50%;
			font-size: 2.2;
	
		}
	
		.jianTou {
			position: relative;
			height: auto;
			width: 10%;
			left: 15%;
		}
	
		/* 提示窗口 */
	
		.uni-tip {
			padding: 15px;
			width: 300px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			padding: 15px;
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			margin-top: 10px;
			display: flex;
		}
	
		.uni-tip-button {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
	
		.addRoommate {
			position: fixed;
			height: 10vh;
			width: 10vh;
			bottom: 10%;
			right: 5%;
			background-color: #89a5d4;
			font-size: 2;
			color: #ffffff;
			font-size: 2vh;
			border-radius: 50%;
		}
	/* 登入模块样式 */
/* 原生组件模式下需要注意组件外部样式 */
/* 	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	} */

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
