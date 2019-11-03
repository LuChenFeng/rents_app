// import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'

export default {
	components: {
		// uniIcon,
		uniDrawer,
		uniList,
		uniListItem,
		uniCalendar
	},
	data() {
		let selected = this.selected //所有出差日子
		let selectedThisDay = '' //当前选中佛如日子
		let timeData = {
			clockinfo: '',
			date: '',
			fulldate: '',
			lunar: '',
			month: '',
			range: '',
			year: ''
		}
		// let tags = [{
		// 	id: 0,
		// 	name: '出差',
		// 	value: [{
		// 		date: getDate(new Date(), 0),
		// 		info: '出差',
		// 		data: {
		// 			custom: '自定义信息',
		// 			name: '自定义消息头'
		// 		}
		// 	}],
		// 	checked: false,
		// 	attr: 'selected'
		// }]
		return {
			// 日历

			date: '',
			startDate: '',
			endDate: '',
			timeData,
			selected,
			infoShow: false
		}
		/**
		 * 时间计算
		 */
		// function getDate(date, AddMonthCount = 0, AddDayCount = 0) {
		// 	if (typeof date !== 'object') {
		// 		date = date.replace(/-/g, '/')
		// 	}
		// 	let dd = new Date(date)
		// 	dd.setMonth(dd.getMonth() + AddMonthCount) // 获取AddDayCount天后的日期
		// 	dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
		// 	let y = dd.getFullYear()
		// 	let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		// 	let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		// 	return y + '-' + m + '-' + d
		// }
	},
	onLoad() {
		console.log("页面加载。。。。	请求服务器得到每月出差天数")
		this.selected = []
	},
	/**
	 *  点击导航栏 buttons （设置按钮）时触发
	 */
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: "/pages/index/costSharingGear/costSharingGear",
		});
	},
	methods: {
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
				this.selected = this.selected.concat({
					date: this.selectedThisDay,
					info: '出差'
				})
				console.log("2.打卡成功！")
			} else {
				console.log("1.告诉服务器这个日子在家...")

				for (let item in this.selected) {
					if (this.selected[item].date == this.selectedThisDay) {
						console.log("2.从select中删除这个日子")
						this.selected.splice(item, 1)
					}

				}
				console.log("3.取消成功！！")
			}
		},
		change(e) {
			console.log('change 返回:', e)
			this.timeData = e
			this.selectedThisDay = e.year + '-' + e.month + '-' + e.date
			this.infoShow = true
		},
		confirm(e) {
			console.log('confirm 返回:', e)
			this.timeData = e
			this.infoShow = true
		},
		retract() {
			this.infoShow = !this.infoShow
		}
	}
}
