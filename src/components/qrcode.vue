<template>
    <div id="q_code">
       <h4>扫描二维码,跳转链接</h4><br/>
       <div id="qrcode"></div>

       <table border="1" style="margin: 0 auto;">
         <tr v-for="(val,key) in this.personal">
            <td>{{key}}</td>
            <td>{{val}}</td>
         </tr>
       </table>
       <h2 @click="modify_personal">点击此处，修改个人信息</h2>
    </div>
</template>

<script>
  //引入一个有export输出的文件
  import $ from 'jquery'
  import {obj,say} from '../../static/js/common'
  import { store } from '../store/store'
  export default {
      data(){
        return {
           personal:store.data.personal
        }
      },
      methods:{
        init(){
          var dom = $("#q_code")
          console.log(dom)

          var qrcode = new QRCode('qrcode', {
            text: 'your content',
            width: 256,
            height: 256,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
          });

          qrcode.makeCode('http://www.baidu.com/')

        },
        test(){
          console.log(obj)
          say()
        },
        modify_personal(){
          store.modify_name('琦')
        }
      },
      mounted(){
        this.$nextTick(function () {
          this.init()
          this.test()
        })
      }
  }
</script>

<style scoped>
  #qrcode{
    display: inline-block;
    text-align: center;
  }
</style>
