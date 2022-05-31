<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 900px"   class="shadow-2 rounded-borders">
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
          <q-btn flat round dense icon="logout" />
        </q-toolbar>

        <!-- <q-tabs v-model="tab"> -->
          <!-- <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" /> -->
        <!-- </q-tabs> -->
      </q-header>

      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>


export default ({
  data() {
    return {
      countdown: 300, // 5min
    };
  },
  
  setup() {
    return {
      countDown : 30,
      timer:null,
    }
    
  },
  mounted() {
        const stopCountdown = setInterval(() => {
      //console.log("current countdown", this.countdown);
      this.countdown -= 1;
      if (!this.countdown) clearInterval(stopCountdown);
    }, 1000);
  },
  computed : {
    formatedCountdown() {
      return this.countdown;
    },
  },
  methods : {
    countDownTimer : function() {
                if(this.countDown > 0) {
                    this.timer = setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
                else{
                    this.handleAnswerClick(false)
                }
    }   
  }
})
</script>


