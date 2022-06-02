<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'


export default {
  
  data() {
return {
  login : {
    username: '',
    password: ''
  }
}
  },
  methods: {
   submitForm () {
     if (!this.login.username ||!this.login.password){
       console.log('error')
     } else {
       console.log('login')
     }
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
<div class="q-page-container" style="padding-top: 106px; padding-left: 718px;">
  <div class="q-pa-md" style="background-color: white;max-width: 400px">
<div class="col text-h6 ellipsis flex justify-center"> <h6 class="text-h6 text-uppercase q-my-none">LOGIN FORM </h6> </div>
    <q-form
      
      class="q-gutter-md" @submit.prevent="submitForm"
    >
      <q-input
        filled
        v-model="login.username"
        label="Username"
        hint="userrname"
        
      />

      <q-input
        filled
        
        v-model="login.password"
        label="Password"
        hint="password"
        type="password"
      
        
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn class="full-width" label="Login" type="submit" color="primary" rounded/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</div>
</template>

