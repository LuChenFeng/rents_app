<script type="text/javascript">
  // 定义一些公共的属性和方法
  const city = [] //用户所在城市
  const id=''  //用户ID
  const name='' //用户名
  const avatar='' //用户头像
  const msgList={} //私聊列表
  // function commonFun() {
  //   console.log("公共方法")
  // }
  function dateFormat(time) {
  		var date=new Date(time);
  		var year=date.getFullYear();
  		/* 在日期格式中，月份是从0开始的，因此要加0
  		 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
  		 * */
  		var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  		var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  		var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  		var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  		var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  		// 拼接
  		return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
  	}

  
  // 暴露出这些属性和方法
  export default {
    city,
	id,
	name,
	avatar,
	dateFormat
    // commonFun
  }
</script>
