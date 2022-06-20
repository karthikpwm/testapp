<template>
  <q-layout view="hHh Lpr lff" style="background-color:#f2f2f2" class="shadow-2 rounded-borders">
     

     <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"  />
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->

          <q-toolbar-title>Common Aptitude Test</q-toolbar-title>
          <div class="q-mr-sm"> 
            Logged In As: {{ adminname}}
            <!-- {{formatedCountdown}}  -->
          </div>
          <q-btn flat dense icon="logout" @click="logout()" label="logout" class="text-white 10" aria-label="bold" />
        </q-toolbar>

        <!-- <q-tabs v-model="tab"> -->
          <!-- <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" /> -->
        <!-- </q-tabs> -->
      </q-header>

       <q-drawer
        v-model="drawer"
        
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Log In
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple to="/cresult">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Result
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/login">
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Log Out
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Sign In
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">PWM</div>
            <div></div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user'
// import { ref } from 'vue'
// import { api } from './boot/axios' 
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

export default ({
  data() {
    return {
      
      countdown: 300, // 5min
    };
  },
  
  setup() {
    const drawer = ref(false)
    const store = useUserStore()
    const {token,admin,loggedinname} = storeToRefs( store )
    const router = useRouter()
    const adminname =  loggedinname.value
    //console.log('app page',loggedinname)
    //console.log('app page',token)
    const logout = () => {
        token.value = '',
        admin.value = '',
        window.location.reload()
         router.push('/');
        
         
      }
    return {
      countDown : 30,
      timer:null,
      logout,
      adminname,
      drawer,
     
      
    }
   
  },

  
  
})
</script>
<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em

  & + &
    margin-top: 18px
</style>