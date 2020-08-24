/* eslint-disable no-undef */
<template>
     <div id="wholePage">
       <nav class="col-sm-1 d-none d-sm-block sidebar pt-4 mt-4">
          <ul class="nav nav-pills flex-column mt-4 pt-4">
            <li class="nav-item my-4">
              <a class="nav-link" href=""><img class="sideItem " src="../assets/Icon.png"></a>
            </li>
            <li class="nav-item active my-4">
              <a class="nav-link" href=""><img class="sideItem " src="../assets/users.png"></a>
            </li>
            <li class="nav-item my-4">
              <a class="nav-link" href=""><img class="sideItem" src="../assets/cards.png"></a>
            </li>
          </ul>
        </nav>
                <!-- The top navbar starts here -->
        <nav class="navbar border border-bottom">
  <a class="navbar-brand mb-3 " href="#">
    <img src="../assets/bitmap.png">
  </a>
    <div class="navbar-text pr-4">
      <p class="nav-item dropdown">
                  <a class="dropdown-toggle"  type="button" data-toggle="dropdown" data-hover="dropdown"><span class="user-icon"><img src='../assets/Rectangle.png'></span> Hi, {{ username }} <span class="caret"></span></a>
                  <ul class="dropdown-menu user">
                      <li class="nav-item"> One Option</li>
                      <li class="nav-item"> Another Option</li>
                    </ul>

        </p>
    </div>
</nav>
        <!-- The top navbar ends here -->
        <div class="mainBody">
            <div class="row justify-content-md-between pt-4 mb-4">
                <h4>Employees</h4>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#formModal">Add New</button>
            </div>
            <div class="row companyName justify-content-md-between border py-4 px-3 my-4">
                <h4>Josh Bakery Ventures</h4>
                <p class="address text-dark">62, Bode Thomas, Surulere, Lagos</p>
            </div>
            <div class="mb-3 ml-1 inputs-row row justify-content-md-between" >
                <div class="row">
                <select class="custom-select col-md-3" v-model="role">
                  <option selected>Change Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
              </select>
                <button type="button" class="col mx-2 btn btn-success" @click="updateRole(role)">Change</button>
                <input type="search" v-model="searchInput" @input="updateList" class="col-md-6 form-control" placeholder="Enter staff name here…" >
              </div>
            </div>
            <table-component :selectedRole="selectedRole" :role="role" ></table-component>
        </div>
        <div class="modal fade p-4" id="formModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content p-4">
      <div class="modal-header my-2">
        <h5 class="modal-title text-primary" id="exampleModalLabel">Add New Employee</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     <form>
  <div class="row p-2">
    <div class="col px-2">
      <input v-model="newEmployee.first" required type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col px-2">
      <input v-model="newEmployee.last" required type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
  <div class="row p-2">
    <div class="col px-2">
      <input type="email" v-model="newEmployee.email" required class="form-control" placeholder="Email">
    </div>
    <div class="col px-2">
      <input type="number" v-model="newEmployee.number" required class="form-control" placeholder="Phone Number">
    </div>
  </div>
  <div class="row py-2">
    <div class="col-sm-6">
      <label>Select Role</label>
      <select class="custom-select" required v-model="newEmployee.role">
  <option value="Admin" selected>Admin</option>
  <option value="Staff">Staff</option>
</select>
    </div>
  </div>
</form>
 <div class="modal-footer my-2">
        <button type="button" class="btn btn-primary"  @click="addNewEmployee">Add</button>
      </div>
    </div>
  </div>
</div>
     </div>
</template>

<script>
import tableComponent from '../components/tableComponent'
import { ourEventBus } from '../main'
export default {
  name: 'employeesPage',
  components: {
    'table-component': tableComponent
  },
  data: function () {
    return {
      username: 'Olive',
      role: 'Change Role',
      selectedRole: '',
      searchInput: '',
      dataList: [],
      newEmployee: {
        first: '',
        last: '',
        email: '',
        number: '',
        role: 'Admin',
        selected: true
      }
    }
  },
  async mounted () {

  },
  async beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.username = vm.$route.params.name
    })
  },
  async created () {
    ourEventBus.$on('updateList', (info) => {
      console.log(info)
      this.dataList = info
      console.log(this.dataList)
    })
  },
  methods: {
    addNewEmployee () {
      if (this.newEmployee['first'] && this.newEmployee['last'] && this.newEmployee['email'] && this.newEmployee['number']) {
        ourEventBus.$emit('addNewEmployee', this.newEmployee)
        this.newEmployee['first'] = ''
        this.newEmployee['last'] = ''
        this.newEmployee['email'] = ''
        this.newEmployee['number'] = ''
        this.newEmployee['role'] = 'Select Role'
      }
    },
    updateRole () {
      if (this.role !== 'Change Role') {
        this.selectedRole = this.role
        ourEventBus.$emit('updatingRole', this.selectedRole)
      }
    },
    togglePage () {
      ourEventBus.$emit('togglePage')
    },
    updateList () {
      let searchQuery = this.searchInput
      let fullData = this.dataList
      console.log(searchQuery)
      if (searchQuery) {
        console.log('Yes')
        let filteredData = fullData.filter(el => {
          return el.first.toLowerCase().includes(searchQuery.toLowerCase()) || el.last.toLowerCase().includes(searchQuery.toLowerCase())
        })
        console.table(filteredData)
        if (filteredData.length !== 0) {
          ourEventBus.$emit('filteredData', filteredData)
        } else {
          console.error('Nothing to see here')
        }
      } else {
        ourEventBus.$emit('filteredData', 'No data')
      }
    },
    watch () {
      // searchInput (val) {
      //    console.log(val)
      // let searchQuery = val
      // let fullData = dataList
      // let filteredData = fullData.filter(el => {
      //   el['first'].includes(searchQuery) || el['last'].includes(searchQuery)
      // })
      // console.log(filteredData)
      // ourEventBus.$emit('filteredData', filteredData)
    //  }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wholePage{
  background-color: #E5E5E5;
  height: 100vh;
  overflow-y: scroll;
}
.sidebar {
  background-color: #fff;
    position: fixed;
    z-index: 100;
    width: 55px;
    height: 100vh;
    bottom: 0;
    left: 0   ;
    padding-left: 0;
    padding-top: 79px !important;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid #eee;
}
li.active{
  border-left: 3px solid #2BDA53;
}
.navbar{
  background-color: #fff;
  z-index: 200;
  height: 55px !important;
}
.navbar-brand{
  padding: 0 !important;
}
.navbar-brand img{
  height: 30px;
}
.navbar-text, .dropdown{
  font-family: Roboto;
font-weight: 500;
font-size: 15px;
color: #013C61;
}
.navbar-text img{
  height: 30px;
}
.mainBody{
  height: 100vh;
}
/* The following style should be imported from other component */
.mainBody  button{
   border-radius: 3px;
   box-shadow: 0px 7px 15px rgba(43, 218, 83, 0.2);
  width: 200px;
  height: 44px;
}
.inputs-row button{
  height: 38px;
}
.mainBody div.companyName{
  background-color: #fff;
  border-radius: 3px;;
}
input[type=search]{
  background: white url(../assets/search.png) 98% no-repeat;
  background-size: 20px;
}
.pagination{
  font-size: 14px;
}
.right, .left{
  background-color: #2BDA53;
color: #fff;
height: 20px;
  border-radius: 50%;
}
@media only screen and (min-width: 780px){
  .mainBody{
  margin-top: 79px !important;
  margin-left: 146px !important;
  margin-right: 72px !important;
}
}
</style>
