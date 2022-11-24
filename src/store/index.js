import Vuex from 'vuex'
import Vue from 'vue'
import Cookie from 'js-cookie'
Vue.use(Vuex)

const menu = {
    namespaced:true,
    action:{},
    mutations:{
        // 菜单展开开关
        CLICKMUNE(state){
            state.collapse = !state.collapse
        },
        // 面包屑添加功能
        SELECTMENUS(state,val){
            if(val.name !== 'home'){
                const index = state.selectMenu.includes(val)
                if(!index){
                    state.selectMenu.push(val)
                }
            }
        },
        // 关闭面包屑
        CLOSETAG(state,item){
            const index = state.selectMenu.findIndex(val => val.name === item.name)
            state.selectMenu.splice(index, 1)
        },
        // 设置menu数据
        SETMENU(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态注册数据
        ADDMENU(state,router){
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 组装路由数据
            const menuArray = []
            menu.forEach(item=>{
                if(item.children){
                    item.children.map(val=>{
                        val.component = () => import(`../views/${val.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }
                else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            // 路由添加
            menuArray.forEach(item =>{
                router.addRoute('Main',item);
            })
        }
    },
    state:{
        // 侧边栏菜单展开
        collapse:false,
        // 面包屑功能
        selectMenu:[
                {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
                },
            ],
            menu:[]
    }
}

export default new Vuex.Store({
    modules:{menu}
})