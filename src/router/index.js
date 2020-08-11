import Vue from 'vue'
import Router from 'vue-router'
import welcomeForm from '@/components/welcomeForm.vue'
import employeesPage from '@/components/employeesPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcomeForm',
      component: welcomeForm,
      props: true
    },
    {
      path: '/employeesPage',
      name: 'employeesPage',
      component: employeesPage
    }
  ]
})
