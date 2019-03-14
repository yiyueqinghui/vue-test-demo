<template>
    <p :class="['item'+item.id,'item']">
      {{item.txt}}
    </p>
</template>

<script>
    export default {
      name: "li-vue",
      props:{
        item:{
          type:Object,
          default:{
            txt:'',
            id:''
          }
        }
      },
      data(){
        return {

        }
      },
      mounted(){
        this.$nextTick(()=>{
        	
        })
      }

    }
</script>

<style scoped>
  .item{
    text-align: left;
    padding:20px 0;
  }
</style>
