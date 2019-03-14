<template>
    <div id="upload_img">
        <!--方法一，new FileReader()     base64格式上传 -->
       <div class="uploaded" @click="openBrowser" >
           <input type="file" name="img" imgtype="1"  ref="img" @change="submitImg" />
           <img :src="src"  class="img" v-if="!!this.src" ref="pic"/>
       </div>
       <!--方法二 ,new FormData()   文件上传-->
      <div class="uploaded" @click="openBrowser02" >
        <input type="file" name="img" imgtype="1"  ref="img02" @change="submitImg02" />
        <img :src="src02"  class="img" v-if="!!this.src02" ref="pic02"/>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
            file:'',
            src:'',
            src02:''
          }
        },
        methods:{
          /*
          * base64形式，图片上传
          * */
          openBrowser(){
             this.$refs.img.click()
          },
          submitImg(e){
            this.file = e.target.files[0];
            let fr = new FileReader()
            let that = this
            fr.onload =function(e){
               // 获取加载对象的result,即src
               that.src = this.result;
               let data = {
                  img:that.src,
                  imgtype: that.$refs.img.getAttribute('imgtype')
               }
               that.sendImg(data)
            }
            fr.readAsDataURL(this.file)
          },
          sendImg(data){
            this.$ajax.post('/api/v1/save/img',data)
              .then(res=>{
                 console.log(res)
                 this.src = res.data.src;
              })
          },

          /*
          * formData 图片上传
          * */
          openBrowser02(){
            this.$refs.img02.click()
          },
          submitImg02(e){
            var formData = new FormData(),
                file = e.target.files[0];
            formData.append('file',file);
            formData.append('type',1);
            this.$ajax({
              method: 'post',
              url: '/api/v1/save/img/src',
              data: formData
            }).then((res)=>{
              this.src02 = res.data.src
              console.log(res)
            })

          }
        },
        mounted(){
          this.$nextTick(function () {

          })
        }
    }
</script>

<style scoped>
   .uploaded{
     width: 200px;
     height: 100px;
     border: 1px solid gray;
     margin: 0 auto;
     position: relative;
   }
   .uploaded input{
     display: none;
   }
   .img{
     width: 100%;
     height: 100%;
     position: absolute;
     left: 0;
     top: 0;
   }
   .show{
     display: block;
   }

</style>
