<template>
    <div id="scroll">
       <h4>vue模拟jquery的scroll滚动</h4>
       <dl class="nav">
         <dd v-for="(item,key) in this.navs" :key="key" @click="scroll" :to="item.to">
           <a :href="item.route">
              {{item.content}}
           </a>
         </dd>
       </dl>
       <div id="content">
         <section id="home">
           <h4>首页</h4>
           <p class="pages"></p>
         </section>
         <section id="about_us">
           <h4>关于我们</h4>
           <p class="pages"></p>
         </section>
         <section id="foot">
           <h4>页脚</h4>
           <p class="pages"></p>
         </section>
       </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            navs:[
              {
                content:'首页',
                route:'javascript:;',
                to:'#home'
              },
              {
                content:'关于我们',
                route:'javascript:;',
                to:'#about_us'
              },
              {
                content:'页脚',
                route:'javascript:;',
                to:"#foot"
              }
            ]
          }
        },
        methods:{
          scroll(e){
            let that = e.currentTarget
            let id = that.getAttribute('to')
            let end_pos = document.querySelector(id).offsetTop
            let start_pos = document.body.scrollTop || document.documentElement.scrollTop
            let speed = 30,
                time=15
            console.log(end_pos,start_pos)
            let current = start_pos
            if(start_pos >= end_pos){
              up()
            }else{
              down()
            }

            function pos(pos){
              document.body.scrollTop = pos   //ie,Chrome
              document.documentElement.scrollTop = pos   //Firefox
            }

            function up(){
               current -= speed
               if(current >= end_pos){
                 pos(current)
                 setTimeout(()=>{
                   up()
                 },time)
               }else{
                 pos(end_pos)
               }
            }
            function down() {
              current += speed
              if(current <= end_pos){
                pos(current)
                setTimeout(()=>{
                  down()
                },time)
              }else{
                pos(end_pos)
              }
            }


          }
        }
    }
</script>

<style scoped>
    *{
      margin: 0;
      padding: 0;
    }
    .nav{
      width: 900px;
      padding:5px auto;
      display: flex;
      justify-content: space-around;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      margin: 10px auto;
      background-color: #976d63;
    }
    .nav dd{
      text-align: center;
      font-size: 20px;
    }
    .nav dd a{
      color: #ffffff;
    }
    #content h4{
      background-color: #d11027;
      padding: 5px;
    }
    #content .pages{
      height: 600px;
      background-color:#dddddd;
    }
</style>
