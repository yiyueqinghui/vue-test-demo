<template>
  <div class="hello">
    <div id="vue_bg">
      <h2 align="center">Vue</h2>
    </div>
    <h1 class="nav" @click="tap">
      <router-link :to="item.url" v-for="(item,key) in links" :key="key">
         <i>{{item.name}}</i>
      </router-link>
    </h1>

    <h2 style="margin-top: 20px;">vue简单的公用数据管理store(以首页和Qcode jump页面为例)</h2>
    <table border="1" style="margin: 0 auto;">
      <tr v-for="(val,key) in this.personal">
        <td>{{key}}</td>
        <td>{{val}}</td>
      </tr>
    </table>
    <h1 @click="age">修改年龄数据</h1>
    <hr/>
    <!--上传图片-->
    <dl>
      <dd>
        <UploadImg></UploadImg>
      </dd>
    </dl>
  </div>
</template>

<script>
import { store } from '../store/store'
import UploadImg from './upload-img'
export default {
  name: 'HelloWorld',
  data () {
    return {
      links:[
        {
          url:'/this_api',
          name:'this pages'
        },
        {
          url:'/scroll',
          name:'scroll pages'
        },
        {
          url:'/qrcode',
          name:'Qcode jump'
        },
        {
          url:'/less',
          name:'less use'
        },
        {
          url:'/use/rem',
          name:'useRem'
        },
        {
        	url:'/socket',
        	name:'webSocket chart'
        }
      ],
      personal:store.data.personal
    }
  },
  methods:{
    tap(e){
       let that = e.currentTarget
       console.log(that)
       that.style.color = "#D1D1D1"

       let finalyThat = e.target
       console.log(finalyThat)
    },
    age(){
      store.modify_age(24)
    }
  },
  components:{
    UploadImg
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.nav a{
  margin: 10px 30px;
}
  #pbas_table tr td{
    padding: 15px;
    text-align: left;
  }
  #pbas_table tr td:nth-of-type(1):before{
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-color:transparent transparent transparent darkred;
    border-width: 5px;
    border-style: solid;
    margin-right: 10px;

  }
  #pbas_table tr td:nth-of-type(1){
    width: 25%;
    background-color: rgb(248,244,243);
    color:rgb(89,58,48);
    font-weight: 600;
  }
  #vue_bg{
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background:url('../assets/logo.png') no-repeat left top;
    -webkit-background-size: cover;
    background-size: cover;
  }
</style>
