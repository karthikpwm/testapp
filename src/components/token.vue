<template>
  <div>
    <guestuser v-if="verify" />
    <!-- <errorpage v-else /> -->
  </div>
</template>
<script>

import { onMounted, ref } from 'vue'
import { api } from '../boot/axios';
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import guestuser from './../components/guestUserDetails.vue'
import errorpage from '../components/errorPageNotFound.vue'

export default ({
  setup() {
    const verify = ref(false)
    const route = useRoute();
    const store = useUserStore()
    const {company_id} = storeToRefs( store )
    onMounted(() => {
      api.get('/token/jwtverify/'+ route.params.token)
        .then( res => {
          verify.value = true
         company_id.value = res.data.verify.company_id
          //console.log(verify,company_id, 'working')
        })
        .catch(res => {
          console.log(res)
        })
    })
    return {
      verify,
      company_id,
    }
  },
  components: {
    guestuser,
    errorpage
  },
})
</script>
<style scoped>

</style>