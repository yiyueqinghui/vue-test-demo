<template>
	<div id="chart-window">
		<h6> 聊天系统 </h6>
		<div id='example-3' style="font-size: 20px;">
		  <label>请选择人物</label>
		  <input type="radio" id="jack" value="Jack" v-model="identify">
		  <label for="jack">Jack</label>
		  <input type="radio" id="tony" value="Tony" v-model="identify">
		  <label for="tony">Tony</label>
		</div>
		<div id="chat">
			<dl v-for="(item,index) in chats" :key="index">
				<dd class="me" v-if="item.from == 'Jack'"> <span>{{item.txt}}</span></dd>
				<dd class="he" v-else > <span>{{item.txt}}</span> </dd>
			</dl>
		</div>
		<p class="enter">
			<input type="text" v-model="val"  />
			<button class="send-info" @click="sendInfo" > 发送</button>
		</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				val:'',
				identify:'Jack',
				chats:[
				   
				],
				url:'ws://10.12.200.129:9501',
				currentInfo:{
					from:'',
					txt:''
				},
				ws:null
		   }
		},
		methods:{
			sendInfo(){
			  if(this.val == ''){
			     alert('发送信息不能为空')
			  }else{
			     var currentInfo = {
			     	from:this.identify,
			     	txt:this.val
			     }
			     
			     this.send(currentInfo);
			  }
			},
			send(currentInfo){
		        var sendInfo = JSON.stringify(currentInfo);  
				this.ws.send(sendInfo);
			},
			init(){
				this.ws = new WebSocket(this.url);
				this.ws.onopen = function(){
					console.log('建立连接');
				}
				this.ws.onmessage = (data)=>{
					var receive = JSON.parse(data.data).data;
					if(!receive) return;
					this.chats.push(JSON.parse(receive));
					
				}
			
			}
			
			
		},
		mounted(){
			this.init();
		}
			
	}
</script>

<style lang="less" scoped>
  #chat{
  	width:100%;
  	max-width: 500px;
  	height: 800px;
  	overflow-y: auto;
  	margin: 0 auto;
  	padding:10px;
  	border:1px solid red;
  	.me{
  		text-align: left;
  	
  	}
  	.he{
  		text-align: right;
  		span{
  			background: #DDDDDD;
  		}
  	}
  }
</style>