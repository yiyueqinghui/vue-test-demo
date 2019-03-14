<template>
    <div id="less_use">
        <h4>less使用</h4>
        <h2>less安装步骤</h2>
        <dl>
          <dd>
            1,安装less和less-loader   npm install less less-loader --save
          </dd>
          <dd>
            2,修改webpack.base.config.js文件,新增如下
            {
              test:/.\less$/,
              loader:"style-loader!css-loader!less-loader"
            }
          </dd>
          <dd>
            3,在相应的组件style填写lang="less"
            (style标签里加上 scoped 为只在此作用域 有效)
            <!--<style lang="less"></style>-->
          </dd>
        </dl>

    </div>
</template>

<script>

  export default {
     data(){
       return {

       }
     }
  }
</script>

<style lang="less" scoped>
  // @import '';   //引入其他css/less文件
  //变量
   @color: #ddab2e;
   @fontSize:40px;
  //公共样式
   .common{
     border: 1px solid gray;
     padding: 10px;
     margin: 10px;
   }
  //函数
  .border-radius(@radius){
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
  }
  //默认参数
  .font(@font:15px){
    font-size: @font;
  }
  //函数参数如果有默认，调用时就是通过变量名称，而不是位置
  //多个参数,用分号分隔
  .mixin(@color:red; @margin; @padding: 20px) {
    color: @color;
    margin: @margin;
    padding: @padding;
  }



   #less_use{
     &:before{
       //父元素的伪类写法
     }
     h4{
       color:@color;
       font-size: 30px;
       .common;
       .mixin(@margin:0px);
     }
     h2{
       display: inline-block;
       .font();
       .border-radius(10px);
       .common;

     }
   }
</style>
