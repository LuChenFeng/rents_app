import dyDate from "@/components/dy-Date/dy-Date.vue"
import {
	updataUserInfoById
} from '@/common/mixins/api.js'
var self
export default {
	components: {
		dyDate
	},
	computed: {
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	data() {
		return {
			userInfo: {
				id: '',
				userName: '',
				sex: '',
				birthady: '',
				tel: '',
				statemen: ''
			}
		}
	},

	onLoad() {
		self = this
		this.userInfo={
			id: this.loginUserInfo.id,
			userName: this.loginUserInfo.userName || '',
			sex: this.loginUserInfo.sex || '男',
			birthady: "",
			tel: this.loginUserInfo.tel || '',
			statement: this.loginUserInfo.statement || ''
		}
	},
	methods: {
		// 选择性别
		selectSex(sex) {
			this.userInfo.sex = sex
		},
		// 选择生日
		getData(e) {
			this.userInfo.birthady=e
		},
		submitUserInfo(){
			if(this.userInfo.userName=='' ||this.userInfo.birthady=='' || this.userInfo.tel==''){
				uni.showToast({
					title: `昵称、电话、生日 为必填项`,
					icon: 'none'
				})
				return
			}
			updataUserInfoById(this.userInfo).then(res=>{
				if(res[1].data.code==200){
					uni.showToast({
						title: `保存成功`,
						icon: 'none'
					})
				self.$store.commit('setLogin',res[1].data.data[0])
				}
			})
		}


	}
}
