<template>
  <div class="q-pa">
    <q-layout view="lHh lpr lFf" container style="background-color:#f2f2f2;height: 900px"    class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>PWM Aptitude Test</q-toolbar-title>
          <div class="q-mr-sm"> 
            <!-- {{formatedCountdown}}  -->
          </div>
          <q-btn flat round dense icon="logout" @click="logout()" />
        </q-toolbar>

        <!-- <q-tabs v-model="tab"> -->
          <!-- <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" /> -->
        <!-- </q-tabs> -->
      </q-header>

      <q-page-container >
        
        <router-view/>
        
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from './store/user'
import { useRoute, useRouter } from 'vue-router'
export default ({
  data() {
    return {
      
      countdown: 300, // 5min
    };
  },
  
  setup() {
    const store = useUserStore()
    const {token} = storeToRefs( store )
    const router = useRouter()
    const logout = () => {
        //token.value = ''
        // router.push('/login');
        // console.log('hhh')
      }
    return {
      
      countDown : 30,
      timer:null,
      logout
      
    }
   
  },

  
  
})
</script>


