import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import This from '@/components/this'
import Scroll from '@/components/mock-scroll'
import QRCode from '@/components/qrcode'
import LessUse from '@/components/less-use'
import UploadImg from '@/components/upload-img'
import useRem from '@/components/use-rem'
import testVue from '@/components/test-vue'
import Socket from '@/components/socket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/this_api',
      component:This
    },
    {
      path:'/scroll',
      component:Scroll
    },
    {
      path:'/qrcode',
      component:QRCode
    },
    {
      path:'/less',
      component:LessUse
    },
    {
      path:"/uploadImg",
      component:UploadImg
    },
    {
      path:'/use/rem',
      component:useRem
    },
    {
      path:'/test/vue',
      component:testVue
    },
    {
      path:'/socket',
      component:Socket
    }
  ]
})
