import Vuerouter from 'vue-router'
import Cookie from 'js-cookie'

const router = new Vuerouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/home',
            name:'Main',
            component:()=> import("../components/Main.vue"),   
        }, 
        {
            path:'/login',
            name:'login',
            component:()=> import("../views/Login.vue")
        }  
    ]
})

router.beforeEach((to,from,next)=>{
    const token = Cookie.get('token')
    if(!token && to.name !=='login'){
        next({name:'login'})
    }
    else if(token && to.name ==='login'){
        next({name:'home'})
    }
    else{
        next()
    }
})

export default router
