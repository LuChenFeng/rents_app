import Vue from 'vue'
export default {
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		loginUserInfo: {}
	},
	getters: {
		getHasLogin(state, getters) {
			return state.hasLogin
		},
		
		getForcedLogin(state, getters) {
			return state.forcedLogin
		},
		getLoginUserInfo(state, getters) {
			return state.loginUserInfo
		}

	},
	mutations: {
		setLogin(state, loginUserInfo) {
			state.loginUserInfo = loginUserInfo || {}
			state.hasLogin = true
		},

		// login(state, userName) {
		//     state.userName = userName || '新用户';
		//     state.hasLogin = true;
		// },
		setLogout(state) {
			state.loginUserInfo = {}
			state.hasLogin = false
		}
	}
}
