// import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
import uCharts from '../../../components/u-charts/u-charts.js'
import global from '@/common/common.vue'
import {
	getUserOutsByMonth,
	addUserOuts,
	delUserOut
} from '@/common/mixins/api.js'
var _self;
export default {
	components: {
		uniCalendar
	},
	computed: {
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	data() {
		let selected = this.selected //所有出差日子
		let selectedThisDay = '' //当前选中佛如日子


		return {
			// 日历
			date: '',
			startDate: '',
			endDate: '',
			timeData: {
				clockinfo: '',
				date: '',
				fulldate: '',
				lunar: '',
				month: '',
				range: '',
				year: ''
			},
			selected: [],
			infoShow: false,
			addUserDate: {},
			delId: ''
		}

	},

	onLoad() {
		_self = this;
		console.log("页面加载。。。。	请求服务器得到每月出差天数");
		let time = global.dateFormat(new Date())
		let data = {
			date: time,
			userInfoId: this.loginUserInfo.id,
				outDate:time
		}
		this.UserOutsByMonth(data)

	},
	//点击导航栏 buttons（ 设置按钮） 时触发 *
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: "/pages/index/costSharingGear/costSharingGear",
		});
	},
	methods: {
		// 获取出差日期
		UserOutsByMonth(data) {
			getUserOutsByMonth(data).then(res => {
				if (res[1].data.code == 200) {
					_self.selected = res[1].data.data || []
				}
			})
		},

		// 日历部分
		toggle(index, item) {
			this.tags[index].checked = !item.checked
			this.reckon()
		},
		open() {
			this.reckon()
			this.$refs.calendar.open()
		},
		// 出差/取消出差
		reckon() {
			if (!this.timeData.clockinfo.have) {
				console.log("1.把现在点的出差的日期上传到服务器...")
				console.log("1.添加当前日期到select...")
				this.addUserDate = {
					date: this.selectedThisDay,
					userInfoId: this.loginUserInfo.id,
					outDate: this.selectedThisDay
				}
				addUserOuts(this.addUserDate).then(res => {
					if (res[1].data.code == 200) {
						uni.showToast({
							title: `记录成功`,
							icon: 'none'
						})
						_self.UserOutsByMonth(_self.addUserDate)
					}
				})
				console.log("2.打卡成功！")
			} else {
				console.log("1.告诉服务器这个日子在家...")

				for (let item in this.selected) {
					if (this.selected[item].date == this.selectedThisDay) {
						console.log("2.从select中删除这个日子")
						this.delId = this.selected[item].id
						this.addUserDate = {
							date: this.selected[item].date,
							userInfoId: this.loginUserInfo.id,
							outDate: this.selected[item].date
						}
						delUserOut(this.delId).then(res => {
							if (res[1].data.code == 200) {
								uni.showToast({
									title: `取消成功`,
									icon: 'none'
								})
								_self.UserOutsByMonth(_self.addUserDate)
							}
						})
					}

				}
				console.log("3.取消成功！！")
			}
		},
		change(e) {
			console.log('change 返回:', e)

			_self.timeData = e
			_self.selectedThisDay = e.year + '-' + e.month + '-' + e.date
			let data = {
				date: _self.selectedThisDay,
				userInfoId: this.loginUserInfo.id,
				outDate: _self.selectedThisDay
			}
			_self.UserOutsByMonth(data)
			_self.infoShow = true

		},

		confirm(e) {
			console.log('confirm 返回:', e)
			this.timeData = e
			this.infoShow = true
		},
		retract() {
			this.infoShow = !this.infoShow
		},
	}
}
