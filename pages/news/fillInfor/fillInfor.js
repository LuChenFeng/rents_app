import uniGrid from '@/components/uni-grid/uni-grid.vue'
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'
import cityData from '../../../common/city.data.js'
import global from '../../../common/common.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {
	putUserStyle,
	upDateUserStyle
} from '@/common/mixins/api.js'
export default {
	computed: {
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
	components: {
		mpvuePicker,
		uniGrid,
		uniGridItem,
		uniPopup
	},
	data() {
		let sliderKey = -1
		return {
			pickerText: '',
			mode: '',
			city: "",
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			mulLinkageTwoPicker: cityData,
			flagText: '',
			flagFill: false, //是否已经添加过特点信息
			list: [{
					key: 'thought',
					title: '室友经常带外人回家（月超过两次）',
					name1: '介意',
					name2: '不介意',
					fraction: 0,
					flag: 0,
					value: 10
				},
				{
					key: 'spend',
					title: '在23点之后才睡',
					name1: '经常',
					name2: '偶尔',
					fraction: 0,
					flag: 0,
					value: 10
				},
				{
					key: 'nature',
					title: '有个公共基金，来买公共需要品',
					name1: '接收',
					name2: '不接受',
					fraction: 0,
					flag: 0,
					value: 10
				},
				{
					key: 'discipline',
					title: '公区卫生你会希望如何解决',
					name1: '分工',
					name2: '找保洁',
					fraction: 0,
					flag: 0,
					value: 10
				},
				{
					key: 'thinking',
					title: '如果有对象了是否会在这里一起住',
					name1: '会的',
					name2: '不会',
					fraction: 0,
					flag: 0,
					value: 10
				}
			],
			hobby: [{
					key: 'isConstellation',
					value: 'constellation',
					name: '相信星座',
					checked: false
				},
				{
					key: 'isPets',
					value: 'pets',
					name: '介意养宠物',
					checked: false
				},
				{
					key: 'isSports',
					value: 'sports',
					name: '运动类',
					checked: false
				},
				{
					key: 'isChess',
					value: 'chess',
					name: '棋类',
					checked: false
				},
				{
					key: 'isTour',
					value: 'tour',
					name: '旅游类',
					checked: false
				},
				{
					key: 'isMusical',
					value: 'musical',
					name: '音乐类',
					checked: false
				},
				{
					key: 'isDance',
					value: 'dance',
					name: '舞蹈类',
					checked: false
				},
				{
					key: 'isFilm',
					value: 'filmAndTV',
					name: '影视类',
					checked: false
				},
				{
					key: 'isRead',
					value: 'read',
					name: '阅读类',
					checked: false
				}
			],
			sliderKey,
			// 弹窗
			show: false,
			type: '',
		}
	},
	onLoad(e) {
		this.flagFill = e.flagFill
	},
	onReady() {
		console.log("city:" + global.city);
		if (global.city == null) {
			global.city = ['北京市', '东城区'];
		}
		this.city = global.city[1];
	},
	/**
	 *  点击导航栏 buttons （设置按钮）时触发
	 */
	onBackPress(e) {
		uni.redirectTo({
			url: '/pages/news/findRoommate/findRoommate'
		});
		return true
	},

	methods: {
		idealHouse() {
			uni.navigateTo({
				url: '/pages/news/idealHouse/idealHouse'
			})
		},
		// 滑动条
		sliderChange(e, key) {
			console.log("索引：" + key)
			console.log(e)
			console.log('value 发生变化：' + e.detail.value)
			let svalue = e.detail.value
			if (svalue > 10) {
				this.list[key].flag = 1
				this.list[key].fraction = svalue - 10
			} else {
				this.list[key].flag = 0
				this.list[key].fraction = 10 - svalue
			}
			this.list[key].value = svalue
		},
		// 复选框
		checkboxChange: function(e) {
			console.log("checkboxChange:")
			console.log(e)
			var hobbys = this.hobby,
				values = e.detail.value;
			for (var i = 0, lenI = hobbys.length; i < lenI; ++i) {
				const item = hobbys[i]
				if (values.indexOf(item.value) >= 0) {
					this.$set(item, 'checked', true)
				} else {
					this.$set(item, 'checked', false)
				}
			}
			console.log(this.hobby)
		},
		// 双列
		showMulLinkageTwoPicker() {
			this.pickerValueArray = this.mulLinkageTwoPicker
			this.mode = 'multiLinkageSelector'
			this.deepLength = 2
			this.pickerValueDefault = [0, 0]
			this.$refs.mpvuePicker.show()
		},
		onConfirm(e) {
			global.city = e.label.split('-');
			console.log(global.city);
			this.city = global.city[1]
		},
		onCancel(e) {
			console.log(e);
		},
		// 保存按钮
		submitForum() {
			console.log("点了保存")
			// console.log(JSON.stringify(this.list[0]))
			let putList = {
				"userInfoId": this.loginUserInfo.id,
				"city": this.city,
				"thought": this.list[0].value,
				"spend": this.list[1].value,
				"nature": this.list[2].value,
				"discipline": this.list[3].value,
				"thinking": this.list[4].value,
				"isPets": this.hobby[0].checked == false ? 0 : 1,
				"isConstellation": this.hobby[1].checked == false ? 0 : 1,
				"isSports": this.hobby[2].checked == false ? 0 : 1,
				"isChess": this.hobby[3].checked == false ? 0 : 1,
				"isTour": this.hobby[4].checked == false ? 0 : 1,
				"isMusical": this.hobby[5].checked == false ? 0 : 1,
				"isDance": this.hobby[6].checked == false ? 0 : 1,
				"isFilm": this.hobby[7].checked == false ? 0 : 1,
				"isRead": this.hobby[8].checked == false ? 0 : 1
			}
			// 添加
			if (this.flagFill ==0) {
				putUserStyle(putList).then(res => {
					console.log(res.data.code)
				})
			}else{
				// 修改
				upDateUserStyle(putList).then(res => {
					console.log(res.data.code)
				})
			}
			uni.showToast({
				title: '保存成功',
				icon: 'none'
			})
		},
		togglePopup(type, open) {
			this.content = '居中弹出 popup'
			this.type = type
			this.show = true
		},
		cancel(type) {
			if (type === 'no') {
				this.show = false
				return
			} else {
				this.submitForum()
				this.show = false
			}
		},
		change(e) {
			console.log(e.show)
		}
	}
}
