import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			title: 'Hello00000'
		}
	},
	onLoad() {

	},
	methods: {
		costSharing: function() {
			uni.navigateTo({
				url: '/pages/index/costSharing/costSharing'
			});
		},
		
		cleaning: function() {
			uni.navigateTo({
				url: '/pages/index/cleaning/cleaning'
			});
		}
	}
}
