// import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
import uCharts from '../../../components/u-charts/u-charts.js';
var _self;
export default {
	components: {
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

		return {
			// 日历
			date: '',
			startDate: '',
			endDate: '',
			timeData,
			selected,
			infoShow: false,

			//饼状图
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: ''
		}

	},

	onLoad() {
		console.log("页面加载。。。。	请求服务器得到每月出差天数");
		this.selected = [{
				date: '2019-8-21',
				info: '小丽'
			},
			{
				date: '2019-8-20',
				info: '小雨'
			}
		];
		//饼状图
		_self = this; 
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);

	},
	//饼状图的

	onShow: function() {
			_self = this;
		this.getServerData();
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
					info: '我'
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
			
					_self.timeData = e
					_self.selectedThisDay = e.year + '-' + e.month + '-' + e.date
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
		//饼状图
		getServerData() {
			uni.showLoading({
				title: "正在加载数据..."
			})
			console.log("从服务端获取饼状图数据")
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
				data: {},
				success: function(res) {
					// _self.fillData(res.data);
					_self.fillData([{
						"Pie": {
							"series": [{
									"name": "小雨:1000",
									"data": 1000
								},
								{
									"name": "小花:1200",
									"data": 1200
								},
								{
									"name": "小绿:1500",
									"data": 1500
								}
							]
						}
					}])
				},
				fail: () => {
					_self.tips = "网络错误，小程序端请检查合法域名";
				},
				complete() {
					uni.hideLoading();
				}
			});
		},
		fillData(data) {
			console.log(JSON.stringify(data))
			this.serverData = data;
			let Pie = {
				series: []
			};
			Pie.series = data[0].Pie.series;
			console.log("Pie::" + JSON.stringify(Pie))
			this.showPie("myCanvasPie", Pie);
		},

		showPie(canvasId, chartData) {
			console.log("调用了showpie")
			var uc = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'pie',
				fontSize: 11,
				legend: true,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						lableWidth: 15
					}
				},
			});
			console.log("showpie 执行完了");
		}
	}
}
