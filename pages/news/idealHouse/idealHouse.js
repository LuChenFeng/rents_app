

	
export default {

	data() {
		
		return {

		}
	},
	onLoad() {

	},
	/**
	 *  点击导航栏 buttons （设置按钮）时触发
	 */
	onBackPress(e) {
		uni.redirectTo({
				url: '/pages/news/findRoommate/findRoommate'
		})
		return true
	},

	methods: {
		fillInfor(){
			uni.navigateTo({
				url:'/pages/news/fillInfor/fillInfor'
			})
		},
	
	}
}
