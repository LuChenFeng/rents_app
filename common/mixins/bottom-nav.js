
export default {
	
	computed:{
		bottomNavList(){
			return this.$store.state.app.bottomNavList
		}
	},
	methods:{
		changeNav({item}){
			let pagePath =item.pagePath||'/pages/index/index'
			uni.redirectTo({
			    url: pagePath
			});
		}
	}
}