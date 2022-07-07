<script>
import { storeToRefs } from 'pinia'
import { useQuasar,QSpinnerFacebook } from 'quasar'
// import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useCandidateStore } from '../store/candidate'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../boot/axios';
import { onBeforeUnmount } from 'vue'

export default {
  data() {
       
  },
  setup () {
    const $q = useQuasar()
    let timer
    // 2 min -> 1 min -> unmo b -> c -> c -> b mo -> ch
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
      
    })
    const route = useRoute()
  const router = useRouter()
  // const form = ref(null);
    const store = useUserStore()
    const store_candiate = useCandidateStore()
    const {user, token, admin,loggedinname,company_id} = storeToRefs( store )
    const { candidate_id,company1_id } = storeToRefs( store_candiate )
    //console.log("userinfopage",loggedinname.value)
    const onSubmit = () => {
         if (!user.value.name || !user.value.position || !user.value.email || !user.value.mobile) {
          //alert('Invalid')
           //console.log('nooo')
           $q.notify({
          type: 'negative',
          message: 'Must Enter All Fields.'
        })
          // $q.notify({
          //   color: 'red-5',
          //   textColor: 'white',
          //   icon: 'warning',
          //   message: 'You need to accept the license and terms first'
          // })
       }
      else {
        $q.loading.show({
          message: 'Some important <b>process</b> is in progress.<br/><span class="text-primary">Hang on...</span>',
          html: true
        })
        api.post(`guest/newregister`, {name : user.value.name,position : user.value.position,email : user.value.email,mobile : user.value.mobile, company_id : company_id.value, timelimit:1200},
        {
  // headers: {
  //   Authorization: 'Bearer ' + token.value
  // }
}).then(res => {
              candidate_id.value = res.data.insert_id
              company1_id.value = company_id.value
             token.value = res.data.token
             //console.log(candidate_id.value)
            $q.loading.hide()
         router.push('/guestinfo')  

})
.catch(res => {
  
  //alert(res.response.data.message || 'server not found')
   $q.notify({
          type: 'negative',
          message: 'server not found' || res.response.data.message
        })
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
       // $q.loading.hide()
})
      }
    }
    return {
      user,
      onSubmit,
      onReset () {
        // form reset
        
        
      }
    }
  },
}
</script>

<template>
<div class="page-container window-height row justify-center items-center bg-image" >
  <div class="q-pa-md row justify-center" style="background-color: white;max-width: 370px; border-radius:25px;" rounded>
  <div class="col-12 text-center self-center">
    <h5 class="text-h6 text-uppercase q-my-none" style="font-family:verdana; font-weight: 100;">Enter Your Details</h5>
    
  </div>
    
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        
        v-model="user.name"
        label="Your name "
        hint="Name and surname"
        
        
        
        
        
      />


<!-- {
  name : this.name,
  uemail : this.emlil
}

{...user} -->

      <q-input
        
        type= "text"
        v-model="user.position"
        label="Position"
        
      />

      <q-input
        
        type="text"
        v-model="user.email"
        label="Your email id"
        
      />

      <q-input
        
        type="text"
        v-model="user.mobile"
        label="Your mobile no"
        lazy-rules
        
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn  class="full-width bg-cyan-8 text-grey-1" label="Submit" @click="onSubmit()" rounded/>
        <!-- <q-btn label="Start test" @click="goToHome()" color="primary"/> -->
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>

  </div>
</div>
</template>

<style>


.bg-image {
  position: relative;
    background-image: url();
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>