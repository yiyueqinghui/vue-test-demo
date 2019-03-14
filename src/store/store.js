//vue 简单的公用数据状态管理，如果复杂的话，必须使用vuex
let store = {
  data:{
   personal:{
     name:'cj',
     age:27
   }
  },
  modify_name(val){
    this.data.personal.name = val
    console.log(this.data.personal)
  },
  modify_age(val){
    this.data.personal.age = val
  }
}

export {
  store
}
