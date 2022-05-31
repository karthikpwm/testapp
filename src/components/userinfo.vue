<script>
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
// import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
  const router = useRouter()
  // const form = ref(null);
    const store = useUserStore()
    const {user} = storeToRefs( store )
    const onSubmit = () => {
        // if (this.name == null) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })

            // router.push('/'); 

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
<div class="q-page-container" style="padding-top: 106px; padding-left: 518px;">
  <div class="q-pa-md" style="max-width: 400px">
    <h5>Enter Your Details</h5>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
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
        filled
        type= "name"
        v-model="user.position"
        label="Position"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type something'
          // val => val !== null && val !== '' || 'Please type your age',
          // val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      />

      <q-input
        filled
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
        filled
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
        <q-btn label="Start test" @click="onSubmit()" color="primary"/>
        <!-- <q-btn label="Start test" @click="goToHome()" color="primary"/> -->
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
      </div>
    </q-form>

  </div>
</div>
</template>

