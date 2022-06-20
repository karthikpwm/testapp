<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'

import { api } from '../boot/axios';
import { useRoute, useRouter } from 'vue-router'



export default {
  
  setup () { 
    const $q = useQuasar()
        const store = useUserStore()
    const {token, admin,loggedinname} = storeToRefs( store )

  const router = useRouter()
  const login = ref({
    username: '',
    password: ''
  })
 const Reset = () => {
  login.value.username = null,
  login.value.password = null,
   $q.notify({
         type: 'positive',
          message: 'Form Reset' }
      )
 }
  const submitForm =  () => {
     if (!login.value.username ||!login.value.password){
      $q.notify({
         type: 'negative',
          message: 'Username or Password is Incorrect' }
      )
       console.log('error')
     } else {

        api
          .post(`user/login`, {email : login.value.username,password : login.value.password})
          .then(async (res) => {
            
token.value = res.data.token
             admin.value = res.data.user
             loggedinname.value = res.data.user.name
             //console.log(loggedinname.value)
             //console.log(token.value)
             router.push('/user');
          })
          .catch((res) => {
            console.log(res)
            alert(res.response.data.message || 'server not found')
          })
     }
   }

return {
  login,
  submitForm,
  Reset
}
  },
  // setup () {
  //   const $q = useQuasar()

  //   const username = ref(null)
  //   const password = ref(null)
  //   const accept = ref(false)

  //   return {
      
  //     username,
  //     password,
  //     accept,

  //     onSubmit () {
  //       if (accept.value !== true) {
  //         $q.notify({
  //           color: 'red-5',
  //           textColor: 'white',
  //           icon: 'warning',
  //           message: 'You need to accept the license and terms first'
  //         })
  //       }
  //       else {
  //         $q.notify({
  //           color: 'green-4',
  //           textColor: 'white',
  //           icon: 'cloud_done',
  //           message: 'Submitted'
  //         })
  //       }
  //     },

  //     onReset () {
  //       username.value = null
  //       password.value = null
  //       accept.value = false
  //     }
  //   }
  // }
  
}
</script>

<template>

<div class="page-container window-height row justify-center flex items-center ">
  <div class="img row justify-center" style="background-color: white;max-width: 278px;max-height: 372px; border-radius:25px;"  rounded>
<div class="col-12 text-center self-center"> <h6 class="text-h6 text-uppercase q-my-none">LOGIN </h6> </div>
    <q-form
      
      class="q-gutter-md" @submit.prevent="submitForm"
    >
      <q-input
        filled
        v-model="login.username"
        label="Username"
        hint="email id"
        label-color="black"
        debounce="black"
        bg-color="white"
        
      />

      <q-input
        filled
        
        v-model="login.password"
        label="Password"
        hint="password"
        type="password"
        label-color="black"
         debounce="black"
         bg-color="white"
        
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn class="bg-cyan-8 text-grey-1 full-width" label="Login" aria-label="bold" type="submit"  rounded/><br/><br/>
        <q-btn label="Reset" type="reset" flat class="q-ml-md text-grey-1 bg-cyan-8" rounded aria-label="bold" @click="Reset()"   />
      </div>
    </q-form>

  </div>
</div>
</template>
<style>
.img {
  height: 380px;
   width: 80%;
background-image: url("./img/login1.jpg");
background-size: contain;
 background-repeat: no-repeat
 
}
.q-field--filled .q-field__control {
    padding: 0 12px;
    background: #99aab8;
    border-radius: 4px 4px 0 0;
}

.window-height {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    height: 80vh !important;
}
</style>

