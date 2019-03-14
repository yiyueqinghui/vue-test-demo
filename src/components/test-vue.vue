<template>
	<div>
		<div id="test-vue">
			<liTemplate v-for="(item,key) in filterList" :key="key" :item="item"></liTemplate>
		</div>
		<h4 v-once="">v-once我只渲染一次，数据更改我也不变{{name}}</h4>
		<h4>{{name}}</h4>
		<h4>{{newName}}</h4>
		<button @click="changeList">点一下，改变列表</button>
		<button @click="tap" v-bind:disabled="isButtonDisabled">Button</button>
		<button @click="tap">Button</button>
		<hr />
		<p class="notice">
			方法methods与computed的区别：

			methods无缓存，computed有缓存
			(当计算的数据量比较大时，computed可以利用缓存来提高性能)
		</p>
		<hr />
		<h4>class和style的绑定</h4>
		<p class="explanation">v-bind:class 指令也可以与普通的 class 属性共存。当有如下模板:</p>
		<p class="static" :class="{active:isActive,color:isColor}">文章一</p>
		<p class="explanation">v-bind:class的数组语法。当有如下模板:</p>
		<p :class="[classColor,classFont,'static']">文章二</p>
		<p class="explanation">v-bind:class的三目运算:</p>
		<p :class="[isActive?'active':'color','static']">文章三</p>
		<hr />
		<h4>v-for</h4>
		<dl>
			<dd v-for="(item,key) in items" :key="key">{{item}}</dd>
		</dl>
		<ul>
			<li v-for="(val,key) in persons" :key="key">{{key}}--{{val}}</li>
		</ul>
		<button @click="changeItem">修改items[0]='aaa'</button>
   </div>
</template>

<script>
	import Vue from 'vue'
	import liTemplate from './template/li-vue'
	export default {
		name: "test-vue",
		data() {
			return {
				name: '1123流年',
				isButtonDisabled:true,
				list: [
				    {
						id: 1,
						txt: '水'
					},
					{
						id: 2,
						txt: '空气'
					},
					{
						id:3,
						txt:'食物'
					}
				],
				isActive:true,
				isColor:false,
				classColor:'color',
				classFont:'active',
				items:['a','b','c'],
				persons:{
					name:'xxx',
					age:28
				}
			}
		},
		methods: {
			watchList(newVal, oldVal) {
				console.log('改变了');
				console.log(newVal, oldVal);
			},
			changeList() {
				this.list.forEach((item, index) => {
					console.log(item);
					Object.keys(item).forEach((key) => {
						if(key == 'txt') this.list[index][key] = item[key] + "modify";

					})
				})

				this.name = 'xxxxxx';
			},
			tap(){
				console.log('点击按钮');
			},
			changeItem(){
               //this.items[0] = 'aaa';   //无效
//				Vue.set(this.items,0,'aaa');  //或者
                this.$set(this.items,1,'bbb');

                this.persons = Object.assign(this.persons,{
                	sex:'man'
                })
			}
		},
		computed:{
			newName(){
				let filterName = this.name.split('').join('-');
				return filterName
			},
			filterList(){
				return this.list.filter(function(item){
					return item.id%2 == 0;
				})
			}

		},
		components: {
			liTemplate
		},
		mounted() {
			this.$nextTick(() => {
				let that = this.$el;
				let testId = document.getElementById('test-vue');
				//$el  获取实例化对象
				console.log(that == testId);

				//$data 获取所有data数据
				console.log(this.$data);

				//$watch 监控一个值的变化
				this.$watch('list', this.watchList, {
					deep: true
				});
			})
		}
	}
</script>

<style scoped>
	#test-vue {
		font-size: 30px;
		background: darkred;
		color: #ffffff;
	}
	.notice{
		text-align: left;
	}
	.explanation{
		color: gray;
		text-align: left;
		font-size: 25px;
		margin: 20px 0;
	}
	/*
	 *动态绑定class
	*/
	.static{
		background: #DDDDDD;
	}
	.active{
		font-size: 40px;
	}
	.color{
		color: red;
	}
</style>
