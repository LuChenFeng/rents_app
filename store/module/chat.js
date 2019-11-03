import Vue from 'vue'
export default {
	
	/* 属性值 */
  state: {
		//是否在ws服务中注册
		isOnline:false,
		//wss连接是否打开
		isSocketOpen:false,
		// 用户信息
		user_info:{},
		// 用户列表
        userListObject:{},
		//群聊消息列表
		groupMassageList:{},
		//私聊消息列表
		privateMassagerList:{},
		//私聊对象信息
		private_info:{},
		
		//私聊消息提示列表
		privateMassagerTips:{},
  },
	
	/* 
		计算属性 
		定义 doneTodos:(state, getters,rootState)=>{}
		使用 store.getters.doneTodosCount
	*/
  getters: {
		privateMassagerObject(state, getters){
			return state.privateMassagerList
		}
  },
	/* 
		计算方法
		定义 increment :function(state,data){}
		使用 store.commit('increment', data) or  store.commit({type:'increment',...data})
	 */
  mutations: {
	  //初始化聊天室聊天记录
	  setPrivateMassagerList(state,data){
	  		  console.log("setPrivateMassagerList调用了")
			state.privateMassagerList=data
	  },
	  //追加信息到聊天记录列表
	  addPrivateMassagerList(state,data){
		  state.privateMassagerList=state.privateMassagerList.concat(data)
	  },
		//设置用户信息
		setChatUserInfo(state,data){
			state.user_info=data
		},
		
		//设置wss打开状态
		changeSocket(state,data){
			if(!data){
				state.isOnline=false
			}
			state.isSocketOpen=data
		},

		
		/* 以下是聊天室操作 */
		//用户上线
		receiveChatOnLine(state){
			state.isOnline=true
		},
		//用户下线
		receiveChatOffLine(state){
			state.isOnline=false
		},
		// 设置私聊信息
		changPrivateiInfo(state,data){
			state.private_info=data
		},
		// 当有用户登录广播时记录
		receiveChatOnOpen(state,data){
			let {user_info}=data;
			if(user_info){
				let {id}=user_info
				if(id ){
					let key='_chat_new_'+id
					Vue.set(state.userListObject,key,user_info)
				}
			}
		},
		// 拉取用户列表
		receiveChatUserList(state,data){
			state.userListObject=data.user_list||{}
		},
		//记录单条聊天记录
		receiveChatPrivate(state,data){
			state.privateMassagerList.push(data)
			if(data.send_id != state.user_info.id){
				Vue.set(state.privateMassagerTips,data.send_id,true)
			}
		},
		//取消新消息提醒
		cancelMassagerTips(state,id){
			Vue.set(state.privateMassagerTips,id,false)
		},
		// 更新两个人的私聊信息
		receiveChatPrivateList(state,data){
			console.log("receiveChatPrivateList运行了")
			console.log(JSON.stringify(state))
			console.log(JSON.stringify(data))
			state.privateMassagerList=state 
			
	console.log(JSON.stringify(state.privateMassagerList))

		}
		//用户注册上线
		
	},
	/* 
		导步计算方法
		定义 incrementAsync  :function ({ commit, state,dispatch,rootState  },data){commit('increment',data)}
		使用 store.dispatch('incrementAsync', data) or  store.commit({type:'incrementAsync',...data})
	 */
  actions: {
		
  }
}