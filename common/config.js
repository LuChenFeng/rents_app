
//webSocket地址
export const SocketUrl='ws://47.102.192.121:8100/chat/'
// export const SocketUrl='ws://192.168.3.38:8080/chat/'

//聊天api 前缀地址
export const ChatUrl='http://47.102.192.121:8100/'
// export const ChatUrl='http://192.168.3.38:8080/'
//把用户添加到Redis聊天列表中
export const addToRedisUrl=ChatUrl+'chat/addToRedis'

// 获取在线用户列表
export const OnlineUrl=ChatUrl+'chat/online/list'

 // 向指定窗口推送消息
export const PushUrl= ChatUrl+'chat/push' 

 // 获取指定用户的聊天消息内容
 export const GetMsgUrl=ChatUrl+ 'chat/self'
 
 //数据传输Api 前缀
 export const ApiUrl='http://47.102.192.121:8000/rents/'
  // export const ApiUrl='http://192.168.3.2:8000/rents/'
 // 用户登入
 export const UserLogin=ApiUrl+'user/userLoginByAppInfo'
 //用户注册
 export const UserRegistered=ApiUrl+'user/userRegisteredByAppInfo'
 
 // 用户信息修改
 export const UserInfo=ApiUrl+'user/userInfo'
 
 // 用户详情页信息
 export const UserInfoStyle=ApiUrl+'user/userInfoStyle'
 
 //室友匹配
 export const  GetUserMatching=ApiUrl+"user/matching"
 
 // 获取帖子类型
 export const GetTypeByIsHave=ApiUrl+"forum/selectTypeByIsHave"
 
 //帖子图片上传
 export const PutPonstsImg=ApiUrl+"forum/uploadPostImgs"

 //帖子
export const PonstsInfo=ApiUrl+"forum/postInfo"
 // 上传举报图片
 export const PutReportImg=ApiUrl+"forum/uploadReportImgs"
 
// 添加/修改用户特点
export const PutUserStyle=ApiUrl+"user/style"

// 帖子分页
export const GetPostinfoBypage=ApiUrl+"forum/getPostinfoBypage"

//帖子详情页 id 为 posts_info 的 id
export const GetPostInfoByid=ApiUrl+"forum/getPostInfoByid"

// 添加留言
export const PostsComment =ApiUrl+"forum/postsComment"
// 查看帖子评论

// 根据评论id 查看回复
export const PostsReply=ApiUrl+"forum/postsReply"

// 帖子举报
export const PostsReport=ApiUrl+"forum/postsReport"

// 出差日历
export const RentsOut=ApiUrl+"user/userOuts"

export const RealNameUpLoadImg=ApiUrl+"admin/realNameUpLoadImg"
export const RealName=ApiUrl+"admin/realName"
//修改密码
export const  UpDatePwd=ApiUrl+"/user/userPwd"
export default {
	SocketUrl,
	ChatUrl,
	addToRedisUrl,
	OnlineUrl,
	PushUrl,
	GetMsgUrl,
	
	ApiUrl,
	GetTypeByIsHave,
	PutPonstsImg,
	PonstsInfo,
	PutReportImg,
	PutUserStyle,
	GetUserMatching,
	GetPostinfoBypage,
	GetPostInfoByid,
	UserLogin,
	UserRegistered,
	PostsComment,
	PostsReply,
	PostsReport,
	UserInfo,
	UserInfoStyle,
	RentsOut,
	RealNameUpLoadImg,
	RealName,
	UpDatePwd

}