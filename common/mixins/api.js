import {
	SocketUrl,
	addToRedisUrl,
	GetTypeByIsHave,
	PutPonstsImg,
	PonstsInfo,
	PutUserStyle,
	GetUserMatching,
	GetPostinfoBypage,
	GetPostInfoByid,
	UserLogin,
	UserRegistered,
	PostsComment,
	PostsReply,
	PutReportImg,
	PostsReport,
	UserInfo,
	UserInfoStyle
} from '@/common/config.js'
export function addToRedisByData(data) {
	console.log("执行了addToRedis")
	return uni.request({
		url: addToRedisUrl,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})

}

//获取帖子类型
export function getTypeByIsHave(type) {
	return uni.request({
		url: GetTypeByIsHave + '?isHave=' + type,
		method: "GET"
	})
}
//上传帖子图片
export function putPostInfoImg(imgs) {
	return uni.uploadFile({
		url: PutPonstsImg,
		files: imgs,
		header: {
			"Content-Type": "multipart/form-data"
		},
		formData: {
			'user': 'test'
		}
	})
}
// 上传帖子信息
export function putPostsInfo(data) {
	return uni.request({
		url: PonstsInfo,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}

// 联级删除帖子
export function delPostsInfoById(data){
	return uni.request({
		url: PonstsInfo + '?id=' + data,
		method: "DELETE"
	})
}

// 上传举报图片信息
export function putReportImg(imgs) {
	return uni.uploadFile({
		url: PutReportImg,
		files: imgs,
		header: {
			"Content-Type": "multipart/form-data"
		},
		formData: {
			'user': 'test'
		}
	})
}

// 添加用户特点
export function putUserStyle(data) {
	return uni.request({
		url: PutUserStyle,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}
// 修改用户特点
export function upDateUserStyle(data) {
	return uni.request({
		url: PutUserStyle,
		data: data,
		method: "PUT",
		header: {
			'content-type': 'application/json'
		},
	})
}
//获取匹配用户
export function getUserMatching(userInfoId, loadNum) {
	return uni.request({
		url: GetUserMatching + '?userInfoId=' + userInfoId + "&loadNum=" + loadNum,
		method: "GET"
	})
}
// 分页查询帖子信息
export function getPostinfoBypage(data) {
	return uni.request({
		url: GetPostinfoBypage,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}
//根据id 获取帖子信息
export function getPostInfoByid(data) {
	return uni.request({
		url: GetPostInfoByid + '?id=' + data,
		method: "GET"
	})
}
// 添加评论
export function addPostsComment(data) {
	return uni.request({
		url: PostsComment,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}
// 根据帖子id获取评论
export function getPostsCommentById(data) {
	return uni.request({
		url: PostsComment + '?id=' + data,
		method: "GET"
	})
}
// 删除评论
export function delCommentById(data) {
	return uni.request({
		url: PostsComment + '?id=' + data,
		method: "DELETE"
	})
}

// 根据评论Id 查看回复
export function getPostsReplyById(data) {
	return uni.request({
		url: PostsReply + '?id=' + data,
		method: "GET"
	})
}
// 添加回复
export function addPostsReplyById(data) {
	return uni.request({
		url: PostsReply,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}
//删除回复
export function delPostsReplyById(data) {
	return uni.request({
		url: PostsReply + '?id=' + data,
		method: "DELETE"
	})
}

export function addPostsReport(data){
	return uni.request({
		url: PostsReport,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}

// 用户注册
export function userRegisteredByAppInfo(data) {
	return uni.request({
		url: UserRegistered,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}

//用户登入
export function userLoginByAppInfo(data) {
	return uni.request({
		url: UserLogin,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}
// 修改用户信息
export function updataUserInfoById(data) {
	return uni.request({
		url: UserInfo,
		data: data,
		method: "POST",
		header: {
			'content-type': 'application/json'
		},
	})
}

export function userInfoStyleById(data){
	return uni.request({
		url: UserInfoStyle + '?id=' + data,
		method: "GET"
	})
}