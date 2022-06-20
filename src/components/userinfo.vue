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
    const {user, token, admin,loggedinname} = storeToRefs( store )
    const { candidate_id, company_id } = storeToRefs( store_candiate )
    //console.log("userinfopage",loggedinname.value)
    const onSubmit = () => {
         if (!user.value.name || !user.value.position || !user.value.email || !user.value.mobile) {
          //alert('Invalid')
           console.log('nooo')
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
        
        api.post(`analytic/insertcandidate`, {name : user.value.name,position : user.value.position,email : user.value.email,mobile : user.value.mobile, company_id : admin.value.company_id, timelimit:1200},
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then(res => {
              candidate_id.value = res.data.insert_id
              company_id.value = admin.value.company_id
            
         router.push('/info')  

})
.catch(res => {
  //alert(res.response.data.message || 'server not found')
   $q.notify({
          type: 'negative',
          message: 'server not found' || res.response.data.message
        })
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
<div class="page-container window-height row justify-center items-center" >
  <div class="q-pa-md row justify-center" style="background-color: white;max-width: 400px; border-radius:25px;" rounded>
  <div class="col-12 text-center self-center">
    <h5 class="text-h6 text-uppercase q-my-none" style="font-family:verdana;">Enter Your Details</h5>
    
  </div>
    
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        rounded standout bottom-slots
        v-model="user.name"
        label="Your name "
        hint="Name and surname"
        
        
        lazy-rules
        
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />


<!-- {
  name : this.name,
  uemail : this.emlil
}

{...user} -->

      <q-input
        rounded standout bottom-slots
        type= "text"
        v-model="user.position"
        label="Position"
        lazy-rules
        
        
       
        :rules="[val => val && val.length > 0 || 'Please type something'
          // val => val !== null && val !== '' || 'Please type your age',
          // val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-input
        rounded standout bottom-slots
        type="text"
        v-model="user.email"
        label="Your email id"
        
        
        
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something'
          // val => val !== null && val !== '' || 'Please type your age',
          // val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-input
        rounded standout bottom-slots
        type="text"
        v-model="user.mobile"
        label="Your mobile no"
        lazy-rules
        
        
        
        :rules="[val => val && val.length > 0 || 'Please type something'
          // val => val !== null && val !== '' || 'Please type your age',
          // val => val > 0 && val < 100 || 'Please type a real age'
        ]"
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

