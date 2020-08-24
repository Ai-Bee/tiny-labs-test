/* eslint-disable no-return-assign */
/* eslint-disable vue/return-in-computed-property */
<template>
<div id='custom-table'>
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
     <section v-if="one">
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
       <span class="col-md-1" @click="deleteRecord(item.id)"><img class="index" src="../assets/trash.png"></span>
       </div>
     </section>
</div>
</template>

<script>
import { ourEventBus } from '../main'
// import firebase from 'firebase'
import { db } from '../firebaseConfig'

export default {
  name: 'tableComponent',
  props: {
    selectedRole: String,
    role: String
  },
  data () {
    return {
      marked: [],
      index: false,
      data: [],
      pageTwo: [],
      temp: [],
      one: true
    }
  },
  methods: {
    selectAll () {
      // let temp = this.data
      if (this.index) {
        this.data.map(el => { el.icon = true })
        this.index = false
      } else {
        this.data.map(el => { el.icon = false })
        this.index = true
      }
    },
    async updateStuff (val) {
      let chosen = this.data.filter(el => el.icon)
      console.log(chosen)
      await chosen.map(el => {
        db.collection('employees')
          .doc(el.id)
          .update({
            role: val
          })
          .then(() => {
            console.log('Document successfully updated!')
            el.role = val
          })
          .catch((error) => {
            console.error('Error updating document: ', error)
          })
      })
    },
    deleteRecord (employeeId) {
      db.collection('employees')
        .doc(employeeId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error updating document: ', error)
        })
    },
    toggleSelection (employee) {
      if (employee.icon) {
        employee.icon = false
      } else {
        employee.icon = true
      }
    }
  },
  created () {
    ourEventBus.$on('filteredData', (val) => {
      if (val !== 'No data') {
        this.data = []
        this.data = val
        console.log(val)
      } else {
        this.data = this.temp
      }
    })
    ourEventBus.$on('togglePage', () => {
      if (this.data.length > 5) { this.one = !this.one }
    })
  },
  async mounted () {
    db.collection('employees')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.data.push({
            id: doc.id,
            first: doc.data().first,
            last: doc.data().last,
            number: doc.data().number,
            role: doc.data().role,
            icon: doc.data().selected,
            email: doc.data().email
          })
        })
        return this.data
      })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })

    this.temp = await this.data
    ourEventBus.$emit('updateList', this.data)
    ourEventBus.$on('updatingRole', (val) => {
      this.updateStuff(val)
    })
    ourEventBus.$on('addNewEmployee', (val) => {
      db.collection('employees')
        .add(
          val
        )
        .then(() => {
          console.log('Document successfully updated!')
        })
        .catch((error) => {
          console.error('Error updating document: ', error)
        })
    })
    // Pushing to firebase collection
    // arrt.map(el => {
    //   db.collection('employees')
    //     .add(
    //       el
    //     )
    //     .then(() => {
    //       console.log('Document successfully updated!')
    //     })
    //     .catch((error) => {
    //       console.error('Error updating document: ', error)
    //     })
    // })
  },
  computed: {
    // filteredNames: function () {
    //     return
    //   })
    // },
    anyTruthy: function () {
      let truth = this.data.some(el => !el.icon)
      return truth
    }
  },
  watch: {
    data (val) {
      console.table(val)
    },
    async role (val) {

    },
    async selectedRole (val) {
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
@media only screen and (max-width: 600px){
  div#custom-table{

}
}
</style>
