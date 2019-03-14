<template>
    <div id="this_api">
       <h4>vue点击事件中指向当前对象(相等于jquery中的this)</h4>
      <p class="welcome" @click="tap"><i>click here!</i></p>
    </div>
</template>

<script>
    export default {
       data(){
         return {

         }
       },
       methods:{
         tap(e){
           let that = e.target
           console.log('target指向,事件最终所作用于的对象')
           console.log(that)
           that.style.fontWeight = 'bold'

           let current_that = e.currentTarget
           console.log('currentTarget指向，事件定义时所在的对象')
           console.log(current_that)

           alert('请查看控制台')
         }
       }

    }
</script>

<style scoped>
  .welcome{
    font-size: 22px;
  }
</style>
