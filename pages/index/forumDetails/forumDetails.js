import uniTag from '@/components/uni-tag/uni-tag.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

import {
	getPostInfoByid,
	addPostsComment,
	getPostsCommentById,
	getPostsReplyById,
	delCommentById,
	addPostsReplyById,
	delPostsReplyById
} from '@/common/mixins/api.js'
var self
export default {
	components: {
		uniTag,
		uniIcon,
		uniPopup
	},
	data() {
		let postList = []
		let posterImg = ''
		return {
			postsCommentList: [],
			postList,
			posterImg,
			showChangeAdd: false,
			addPostsComment: '',
			type: '',
			content: '底部弹 popup',
			isAddReply: false,
			postsCommentId: ''
		}
	},

	computed: {
		postsCommentList() {
			return this.postsCommentList
		},
		forcedLogin() {
			return this.$store.getters.getForcedLogin
		},
		hasLogin() {
			return this.$store.getters.getHasLogin
		},
		loginUserInfo() {
			return this.$store.getters.getLoginUserInfo
		}
	},
	onLoad(options) {
		self = this
		console.log("1.根据帖子ID去服务器找帖子内容")
		getPostInfoByid(options.id).then(res => {
			if (res[1].data.code == 200) {
				self.postList = res[1].data.data
			} else {
				uni.showToast({
					title: `请求失败,请检查网络`,
					icon: 'none'
				})
			}
		})
		console.log(this.postList);
	},
	methods: {
		report() {
			uni.navigateTo({
				url: "/pages/publicVue/report/report" + "?postsId=" + this.postList.postsInfo.id
			});
		},
		/**
		 * tap标签
		 */
		setType() {
			let types = ['default', 'primary', 'success', 'warning', 'error']
			let index = types.indexOf(this.type)
			types.splice(index, 1)
			let randomIndex = Math.floor(Math.random() * 4)
			this.type = types[randomIndex]
		},
		setInverted() {
			this.inverted = !this.inverted
		},

		// 打开地图
		openLocation() {
			uni.openLocation({
				longitude: Number(this.postList.postsInfo.longitude),
				latitude: Number(this.postList.postsInfo.latitude),
				name: this.postList.postsInfo.locationName,
				address: this.postList.postsInfo.locationAddress
			})
		},
		// 点击放大
		previewImage: function(e) {
			console.log("previewImage");
			var current = e.target.dataset.src
			uni.previewImage({
				current: current,
				urls: this.postList.imgs
			})
		},
		// 分享帖子
		sharePost() {
			let data = "标题：" + this.postList.postsInfo.title + "\n\n租金:" + this.postList.postsInfo.price + "元/月\n\n地点:" + this.postList
				.postsInfo.locationAddress + "\n\n描述:" + this.postList.postsInfo.contents;
			uni.share({
				provider: "weixin",
				scene: "WXSceneSession",
				type: 1,
				summary: data,
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			})
		},
		contact() {
			console.log(JSON.stringify(this.postList))
			let toId = this.postList.userId
			let toName = this.postList.userName
			let toAvatar = this.postList.avatar
			console.log(toId)
			uni.navigateTo({
				url: '/pages/chat/chatRoom?toId=' + toId + '&toName=' + toName + '&toAvatar=' + toAvatar
			});
		},
		// 查看评论
		getPostsComment() {
			getPostsCommentById(this.postList.postsId).then(res => {
				if (res[1].data.code == 200) {
					if (res[1].data.data.length <= 0) {
						uni.showToast({
							title: `暂无评论`,
							icon: 'none'
						})
					}
					self.postsCommentList = res[1].data.data
				}
			})
		},
		// 查看回复
		getPostsReply(id, key) {
			getPostsReplyById(id).then(res => {
				if (res[1].data.code == 200) {
					self.postsCommentList[key].postsReplies = res[1].data.data
				}
			})
		},
		// 删除评论
		delComment(id) {
			delCommentById(id).then(res => {
				if (res[1].data.code == 200) {
					uni.showToast({
						title: `删除成功`,
						icon: 'none'
					})
					self.getPostsComment()
				}
			})
		},
		//删除回复
		delReply(id){
			delPostsReplyById(id).then(res=>{
				if(res[1].data.code==200){
					uni.showToast({
						title: `删除成功`,
						icon: 'none'
					})
					self.getPostsComment()
				}
			})
		},
		// 添加回复
		addReply(id) {
			if (this.loginUserInfo.hasRealName == 0) {
				uni.showToast({
					title: `实名后才可使用该功能,请先实名`,
					icon: 'none'
				})
				return
			}
			this.content = '底部弹出 popup'
			this.type = 'center'
			this.showChangeAdd = true
			this.isAddReply = true
			this.postsCommentId = id
		},
	//添加评论
		comment(type, open) {
			if (this.loginUserInfo.hasRealName == 0) {
				uni.showToast({
					title: `实名后才可使用该功能,请显示名`,
					icon: 'none'
				})
				return
			}
			debugger
			this.content = '底部弹出 popup'
			this.type = 'center'
			if (type == 'centerChangeAdd') {
				this.showChangeAdd = true
			} else {
				this.$refs[open].open()
			}
		},
		cancel(type, key, list) {
			if (type === 'no') {
				this.showChangeAdd = false
				return
			} else {
				//添加评论/回复
				if (list == 'changeAdd') {
					if (this.addPostsComment == '' || this.addPostsComment == null) {
						uni.showToast({
							title: `未输入留言信息`,
							icon: 'none'
						})
						this.showChangeAdd = false
						return
					}
					if (this.isAddReply) {
						let data = {
							postsCommentId: this.postsCommentId,
							userInfoId: this.loginUserInfo.id,
							content: this.addPostsComment
						}
						addPostsReplyById(data).then(res => {
							if (res[1].data.code == 200) {
								uni.showToast({
									title: `回复成功`,
									icon: 'none'
								})
								self.getPostsComment()
							} else {
								uni.showToast({
									title: `回复失败`,
									icon: 'none'
								})
							}
						})
					} else {
						let data = {
							postsInfoId: this.postList.postsId,
							userInfoId: this.loginUserInfo.id,
							content: this.addPostsComment
						}
						addPostsComment(data).then(res => {
							if (res[1].data.code == 200) {
								uni.showToast({
									title: `留言成功`,
									icon: 'none'
								})
								self.getPostsComment()
							} else {
								uni.showToast({
									title: `留言失败`,
									icon: 'none'
								})
							}
						})
					}
					this.showChangeAdd = false
				}
			}
		},
		change(e) {
			console.log(e.show)
		}
	}
}
