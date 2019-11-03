<template>
	<view class="bubble" :style="{ float:isSelf  }">
		<block>
			<rich-text :nodes="messageText"></rich-text>
		</block>
	</view>
</template>

<script>
	import HTMLParser from './html-parser.js'
	export default {
		props:{
			row:{
				type:Object,
				default:()=>{}
			}
		},
		created() {
			if(this.row.message_type==='img'){
				this.imgInit()
			}
		},
		computed:{
			user_info(){//用户信息
				return this.$store.state.chat.user_info
			},
			isSelf(){
				return this.user_info.id==this.row.send_id?'right':'left'
			},
			messageText(){//将文本信息转成数组
				let array=[]
					array=HTMLParser(this.row.message)
				return array
			}
		},
	}
</script>

<style>
</style>
