<template>
  <div class="q-pa">
    <q-layout view="hHh Lpr lff" container style="background-color:#f2f2f2;height: 969px"    class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"  />
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->

          <q-toolbar-title>Common Aptitude Test</q-toolbar-title>
          <div class="q-mr-sm"> 
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
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >

        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container >
        
        <router-view> </router-view>
        
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { storeToRefs } from 'pinia';
import { useUserStore } from './store/user'
import { ref } from 'vue'
import { api } from './boot/axios'
import { useRoute, useRouter } from 'vue-router'
const menuList = [
  {
    icon: 'inbox',
    label: 'Log In',
    separator: true,
    path : 'cresult',
    component : () => import('./components/candidateresults.vue')
  },
  {
    icon: 'send',
    label: 'Sign Up',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Result',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]
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
        token.value = ''
         router.push('/');
        
         
      }
    return {
      
      drawer: ref(false),
      menuList,
      countDown : 30,
      timer:null,
      logout
      
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

