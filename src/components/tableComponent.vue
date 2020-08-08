/* eslint-disable no-return-assign */
/* eslint-disable vue/return-in-computed-property */
<template>
<div>
  <div class="ml-1 pt-2 row px-3  table-head-row justify-content-between text-left">
       <div @click="selectAll()">
                   <span class="col-md-1" v-if="index || anyTruthy"> <img class="index" src="../assets/selected.png"> </span>
         <span class="col-md-1" v-else> <img class="index" src="../assets/deselected.png"> </span>
            </div>
       <p class="col ">FIRST NAME</p>
       <p  class="col">LAST NAME</p>
       <p  class="col">EMAIL</p>
       <p  class="col">PHONE</p>
       <p  class="col">ROLE</p>
       <p  class="col-md-1"></p>
     </div>
       <div v-for="(item, index) in data" class="ml-1 pt-2 px-3 row table-row justify-content-between" :key="index">
            <div @click="toggleSelection(item)">
                   <span class="col-md-1" v-if="item.icon"> <img class="index" src="../assets/selected.png"> </span>
         <span class="col-md-1" v-else> <img class="index" src="../assets/deselected.png"> </span>
            </div>
       <p  class="col">{{item.first}}</p>
       <p  class="col"> {{item.last}}</p>
       <p  class="col">{{item.email}}</p>
       <p  class="col">{{item.number}}</p>
       <p  class="col">{{item.role}}</p>
       <span class="col-md-1" @click="deleteRecord(item._id)"><img class="index" src="../assets/trash.png"></span>
       </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'tableComponent',
  props: {
    selectedRole: String
  },
  data () {
    return {
      marked: [],
      index: false,
      data: [],
      pageTwo: []
    }
  },
  methods: {
    selectAll () {
    //  let temp = this.data
      // if (this.index) {
      //   console.log('true')
      //   this.data.map(el => el.icon = true)
      //   this.index = false
      // } else {
      //   console.log('false')
      //   this.data.map(el =>return  el.icon = false)
      //   this.index = true
      // }
    },
    deleteRecord (employeeId) {
      console.log(employeeId)
      axios.delete(`https://crudcrud.com/api/17df3ba5d3784cb887ec4d437a9f1a06/employees/${employeeId}`).then((res) => {
        let temp = this.data
        this.data = temp.filter(el => el._id !== employeeId)
      }, (error) => {
        console.log(error)
      })
    },
    toggleSelection (employee) {
      let valueUpdate = this.data
      valueUpdate.map(item => {
        if (item._id === employee._id) {
          if (item.icon) {
            item.icon = false
          } else {
            item.icon = true
          }
        }
      })
      this.data = valueUpdate
    }
  },
  mounted () {
    //     let arrt = [
    //       {
    //         icon: 'rue,
    //         first: 'Joshua',
    //         last: 'Bakare',
    //         email: 'josh.bakery@gmail.com',
    //         number: '+2348012345678',
    //         role: 'Admin'
    //       },
    //       {
    //         icon: 'alse,
    //         first: 'Josh',
    //         last: 'Baks',
    //         email: 'josh.bakery@gmail.com',
    //         number: '+2348012345678',
    //         role: 'Admin'
    //       },
    //       {
    //         icon: 'rue,
    //         first: 'Pink',
    //         last: 'Longhorn',
    //         email: 'josh.bakery@gmail.com',
    //         number: '+2348012345678',
    //         role: 'Admin'
    //       },
    //       {
    //         icon: false,
    //         first: 'Mary',
    //         last: 'Poppins',
    //         email: 'josh.bakery@gmail.com',
    //         number: '+2348012345678',
    //         role: 'Admin'
    //       }
    //     ]
    //     arrt.map(el => {
    //       axios
    //         .post('https://crudcrud.com/api/17df3ba5d3784cb887ec4d437a9f1a06/employees', el)
    //         .then(response => {
    //              this.data.push(response.data)
    //              console.log(response) })
    //     })
    axios.get('https://crudcrud.com/api/17df3ba5d3784cb887ec4d437a9f1a06/employees').then((response) => {
      this.data = response.data
    }, (error) => {
      console.log(error)
    })
  },
  computed: {
    anyTruthy: function () {
      return this.data.some(el => !el.icon)
    }
  },
  watch: {
    data (val) {
      console.log(val)
    },
    async selectedRole (val) {
      let chosen = this.data.filter(el => el.icon)
      console.log(chosen)
      await chosen.map(el => {
        el.role = val
        console.log(el)
        axios.put(`https://crudcrud.com/api/17df3ba5d3784cb887ec4d437a9f1a06/employees/${el._id}`, el).then((response) => {
          console.log(response)
        }, (error) => {
          console.log(error)
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-row{
     background-color: #fff;
     border: 1px solid #E5E5E5;
     height: 50px;
     border-radius: 5px;
     margin-bottom: 16px;
     font-size: 16px;
}
.table-head-row{
     font-size: 14px;
}
</style>
