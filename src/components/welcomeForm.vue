<template>
     <div class="full-view">
       <div class="row">
         <div class=" col-md-5 d-xs-none d-none d-lg-block">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="../assets/Model.png" alt="First slide">
      <div class="carousel-caption d-md-block">
    <h5>No Hazzles</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
  </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="../assets/Model.png" alt="Second slide">
      <div class="carousel-caption d-md-block">
    <h5> Hazzles</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
  </div>
    </div>
  </div>
</div>
         </div>
         <div class="col-md-7 d-sm-11 row align-items-center justify-content-center">
           <div class="mt-4 ml-4">
             <h4><strong> Create your free account</strong></h4>
           <p class="small">Already registered? <span class="text-success innerClick">Sign In?</span></p>
           <div class="card shadow" style="width: 500px;">
             <form class="pa-4">
                <div class="form-row">
    <div class="form-group col-md-6">
      <label for="firstName" class="small">First Name</label>
      <input type="text" class="form-control"  v-model="formDetails.firstName" id="firstName" required placeholder="Joshua">
    </div>
    <div class="form-group col-md-6">
      <label for="lastName" class="small">Last Name</label>
      <input type="text" class="form-control"  v-model="formDetails.lastName" id="lastName" required placeholder="Bakare">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress" class="small">Email</label>
    <input type="email"  v-model="formDetails.email" class="form-control" id="userEmail" required placeholder="josh.bakery@gmail.com">
  </div>
  <div class="form-group">
    <label for="userPassword" class="small">Password</label>
    <input type="password" v-model="formDetails.password" class="form-control" id="userPassword" required placeholder="*************">
  </div>
  <div class="justify-content-end row">
    <button type="submit" @click.prevent="submitForm()" class="btn btn-success">Continue</button>
  </div>
             </form>
          </div>
           </div>
           <div class="row w-100 finalLine">
         <p class="col">By siging up, you agree to our <span  class="text-success innerClick">Terms</span> and <span  class="text-success innerClick"> Privacy Policy</span></p>
         <p class="col text-right">© 2019 Tinylabs. All rights reserved.</p>
       </div>
         </div>
       </div>
     </div>
</template>

<script>
export default {
  name: 'welcomeForm',
  data () {
    return {
      formDetails: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
    //  console.log(this.formDetails['firstName'])
      let name = this.formDetails['firstName'] || this.formDetails['lastName']
      if (name) {
        console.log(name)
        this.$router.push({name: 'employeesPage', params: {name}})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.full-view{
 overflow-x: hidden;
 font-family: 'Roboto', sans-serif !important;
}
.carousel-item{
  height: 100vh;
  background-size: cover;
}
h4, h4 + p{
   color: #013C61;
}
.card{
  padding : 50px 56px;
}
span.innerClick:hover{
  cursor: pointer;
  color: #2BDA53;
}
form label{
  color: #6A7E8A;
}
form::last-child{
  padding : 50px 56px;
  background-color: #2BDA53;
  border-radius: 3px;
box-shadow: 0px 7px 15px rgba(43, 218, 83, 0.2);
}
::-webkit-input-placeholder{
 color: #013C61;
}
::-ms-input-placeholder{
 color: #013C61;
}
::placeholder{
  color: #013C61;
}
input.form-control{
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #E6E7EB;
}
input[type=text]{
  background: white url(../assets/face.svg) 98% no-repeat;
  background-size: 20px;
}
input[type=email]{
  background: white url(../assets/at.svg) 98% no-repeat;
  background-size: 15px;
}
input[type=password]{
  background: white url(../assets/eye.svg) 98% no-repeat;
  background-size: 20px;
}
button.btn[type=submit]{
  border-radius: 3px;
  box-shadow: 0px 7px 15px rgba(43, 218, 83, 0.2);
  margin-right: 15px;
  margin-top: 40px;
  width: 200px;
  height: 44px;
}
.finalLine{
  margin-bottom: -30px !important;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.08px;
  color: #6A7E8A;
}
@media only screen and (max-width: 600px){
  div.full-view > .row::first-child {
    display: none;
  }
}
</style>
