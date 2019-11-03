import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue'

import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
import cityData from '../../../common/city.data.js'
export default {
	components: {
		uniIcon,
		uniDrawer,
		uniList,
		uniListItem,
		uniPopup,
		mpvuePicker
	},
	data() {
		let fixedList = [{
			title: "房租：",
			price: ""
		}]
		let changeList = [{
			title: "水费",
			price: ""
		}]
		let delItem = []
		return {
			fixedList, //固定费用列表
			changeList, //可变费用列表
			showOutTips: false, //出差提示框
			type: '', //弹窗删除的
			showFixedAdd: false, //弹窗添加的
			showChangeDel: false,
			showChangeAdd: false,
			delItem,
			addName: '',
			// 单列
			pickerSingleArray: [{
				label: '1',
				value: 1
			}, {
				label: '2',
				value: 2
			}, {
				label: '3',
				value: 3
			}, {
				label: '4',
				value: 4
			}, {
				label: '5',
				value: 5
			}, {
				label: '6',
				value: 6
			}, {
				label: '7',
				value: 7
			}, {
				label: '8',
				value: 8
			}, {
				label: '9',
				value: 9
			}, {
				label: '10',
				value: 10
			}, {
				label: '11',
				value: 11
			}, {
				label: '12',
				value: 12
			}, {
				label: '13',
				value: 13
			}, {
				label: '14',
				value: 14
			}, {
				label: '15',
				value: 15
			},{
				label: '16',
				value: 16
			},{
				label: '17',
				value: 17
			},{
				label: '18',
				value: 18
			},{
				label: '19',
				value: 19
			},{
				label: '20',
				value: 20
			},{
				label: '21',
				value: 21
			},{
				label: '22',
				value: 22
			},{
				label: '23',
				value: 23
			},{
				label: '24',
				value: 25
			}, {
				label: '25',
				value: 25
			},{
				label: '26',
				value: 26
			},{
				label: '27',
				value: 27
			},{
				label: '28',
				value: 28
			},],
			mulLinkageTwoPicker: cityData,
			// cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '1',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: []
		}
	},
	/**
	 *  点击导航栏 buttons 时触发
	 */
	onNavigationBarButtonTap() {
		uni.showModal({
			title: '提示',
			content: '用户点击了功能按钮，这里仅做展示。',
			success: res => {
				if (res.confirm) {
					console.log('用户点击了确定');
				}
			}
		});
	},
	onLoad() {
		console.log("从服务器获取费用数据....")
		this.fixedList = [{
			title: "房租",
			price: "1000"
		}]
		this.changeList = [{
			title: "水费",
			price: "50"
		}]
	},
	methods: {
		// 固定费用input鼠标离开时
		inputListFixed(e) {
			console.log("1.当鼠标离开时..")
			this.fixedList[e.target.id].price = e.detail.value
			console.log("修改后的值", this.fixedList[e.target.id].price)
		},
		// 不定费用input鼠标离开时
		inputListChange(e) {
			console.log("1.当鼠标离开时..")
			console.log(e)
			this.changeList[e.target.id].price = e.detail.value
			console.log("修改后的值", this.changeList[e.target.id].price)
		},
		//在加一行固定费用的。。
		addInputName(e) {
			if (e.detail.value != '') {
				this.addName = e.detail.value
			}
		},
		// 删除固定费用的一条数据
		togglePopup(type, open, list, key) {

			this.content = '居中弹出 popup'
			this.type = 'center'
			if (type == 'centerChangeDel') {
				console.log(list + key)
				this.delItem = this.delItem.concat({
					listName: list,
					index: key
				})
				console.log(this.delItem)
				this.showChangeDel = true
			} else if (type == 'centerAdd') {
				this.showFixedAdd = true
			} else if (type == 'centerChangeAdd') {
				this.showChangeAdd = true
			} else if (type == 'showOutTips') {
				this.showOutTips = true
			} else {
				this.$refs[open].open()
			}

		},
		cancel(type, key, list) {

			if (type === 'no') {
				
				this.showChangeDel = false
				this.showFixedAdd = false
				this.showChangeAdd = false
				this.showOutTips = false
				this.delItem.splice(0,1)
				console.log("取消")
				return
			} else {

				if (this.delItem.length > 0) {
					if (this.delItem[0].listName == 'fixedList') {
						console.log("1.确定提交")
						this.fixedList.splice(this.delItem[0].index, 1)
						this.showChangeDel = false
					} else if (this.delItem[0].listName == 'changeList') {
						this.changeList.splice(this.delItem[0].index, 1)
						this.showChangeDel = false
					}
					this.delItem.splice(0, 1)
				} else if (list == 'fixeAdd') {
					if (this.addName != '') {
						this.fixedList = this.fixedList.concat({
							title: this.addName,
							price: ''
						})
						this.addName = ''
					}
					this.showFixedAdd = false
				} else if (list == 'changeAdd') {
					if (this.addName != '') {
						this.changeList = this.changeList.concat({
							title: this.addName,
							price: ''
						})
						this.addName = ''
					}
					this.showChangeAdd = false
				}


			}
		},
		change(e) {
			console.log(e.show)
		},

		// 单列
		onCancel(e) {
			console.log(e)
		},
		showSinglePicker() {
			this.pickerValueArray = this.pickerSingleArray
			this.mode = 'selector'
			this.$refs.mpvuePicker.show()
		},
		onConfirm(e) {
			this.pickerText = e.label
		},
		submit(){
			console.log("把fixelist,changelist,pickerText、分配方式、上传至服务器")
		}
		
	}
}
