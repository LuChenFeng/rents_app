import { AdminUserLogin} from '@/common/config.js'
export default {
	data:function(){
		return {
			// #ifdef MP
			is_mp:true,
			// #endif				
		}
	},
	computed:{
		no_status(){
			return this.is_mp?1:0//是否在服务端保存session no_status=1则是不保存 除h5和APP一般不保存
		},
	},	
	methods:{
		_adminUserLogin(data){
			let self=this
			uni.request({
				url:AdminUserLogin+"?no_status="+self.no_status,
				method:"POST",
				header:{"content-type":"application/x-www-form-urlencoded", "X-Requested-With":"XMLHttpRequest"},
				data
			}).then((data)=>{
				return new Promise((resolve, reject)=>{
					let [code,login]=data
					if(!code && login.data && !login.data.code){
						self._saveUserInfo(login.data)
					}
				})
			});
		},
		
		_saveUserInfo(data){
			let {id,nickname,figureurl}=data
			this.$store.commit('setChatUserInfo',{id,nickname,figureurl})
			try {
				uni.setStorageSync('chat_user_info',data);
			} catch (e) {}
			uni.reLaunch({url:'/pages/user/index'});//跳转到用户页面
		}
	}
}