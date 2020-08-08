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
                  <a class="dropdown-toggle"  type="button" data-toggle="dropdown" data-hover="dropdown"><span class="user-icon"><img src='../assets/Rectangle.png'></span> Hi, {{username}} <span class="caret"></span></a>
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
                <button type="button" class="btn btn-success">Add New</button>
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
                <input type="search" class="col-md-6 form-control" placeholder="Enter staff name here…" >
              </div>
              <div class="col-md-2">
                The pagination
              </div>
            </div>
            <table-component :selectedRole="selectedRole"></table-component>
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
  data () {
    return {
      username: 'Stranger',
      role: '',
      selectedRole: ''
    }
  },
  asyncmounted () {
    // Listen for this event properly
    ourEventBus.$on('userLoggedIn', (info) => {
      this.username = info
    })
  },
  methods: {
    updateRole () {
      if (this.role !== 'Change Role') {
        this.selectedRole = this.role
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#wholePage{
  background-color: #E5E5E5;
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
@media only screen and (min-width: 780px){
  .mainBody{
  margin-top: 79px !important;
  margin-left: 146px !important;
  margin-right: 72px !important;
}
}
</style>
