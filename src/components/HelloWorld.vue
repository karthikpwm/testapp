<script>
import { ref, onMounted } from 'vue'
import {useUserStore} from "../store/user"
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import moment from "moment";
import "moment-duration-format";

export default {
  data() {
    return {
      countdown: 1200, // 5min
    };
  },
  setup () {
     const $q = useQuasar()
  // $q.loading.hide()
        const store = useUserStore();
       const router = useRouter()
    function hello () {
      return 'gdfgf'
    }
    const submitResult = ref([])
    const numberToChar = (number) => {
      if(number === null) {
        return null
      }
      return String.fromCharCode(number+65)
    }

    const {  questions, userAnswers } = storeToRefs(store);
    const slideOption = ref([])
    const slide = ref(0)
    onMounted( async () => {
        //$q.loading.show()

      await store.getQuestion()
      let i = 0;
      slide.value = questions.value[0].question_id
      slideOption.value = questions.value.map((x) => { 
        i++;
        return {'label' : i, 'value' : x.question_id }
      })
        $q.loading.hide()

    })

    return {
      currentQuestion: 0,
      slideOption,
      userAnswers,
      numberToChar,
      questions,
      hello,
      submitResult,
      slide,
        onSubmit (evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [ name, value ] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submitResult.value = data
      },
      finish(){
        $q.loading.show()
        // quwstion_id, uswr_id, uuid, create date time, ans
        // // 
        // user ans -> mysql -> 9/10
        console.log(userAnswers.value)
        router.push('/result');
        $q.loading.hide()

          
      },
      
  
     myFunction() {
alert("radio selected");
}
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
      const sec = parseInt(this.countdown, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
      
    },
  },
  
}
</script>
<template>
<div class="col q-pa-md text-h6 flex text-align: center"> Time Left : {{formatedCountdown}}</div>
<div class="q-pa-md">
  <!-- <b-card-text>
      Question No.{{currentQuestion + 1}} of {{questions.length}}
    </b-card-text> -->
<q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="primary"
      class="rounded-borders"
      height="600px"
    >
    <q-carousel-slide v-for="(question) in questions" :key="question.question_id"  :name="question.question_id" class="column no-wrap" >

      <q-icon name="1" color="primary" size="56px" />
        <div class="q-mt-md text-center">
         <q-card class="" full width >
    <q-card-section>
      {{question.question}}
    </q-card-section>
    <q-separator inset/>
    <template v-for="(option, index) in question.options" :key="index"  >
        <q-card-actions >
          <q-card-section flat> {{numberToChar(index)}} :  {{option}}</q-card-section>
        </q-card-actions>
        <q-separator  inset/>
      </template>
    <q-form @submit="onSubmit" class="q-gutter-md" @onchange="myFunction()">
      <q-radio name="selected" v-for="(_, index) in question.options" :key="index" v-model="userAnswers[question.question_id]" :val="index" :label="numberToChar(index)" type="submit"/>

    <div class="q-px-sm">
      Your selection is: <strong>{{ numberToChar(userAnswers[question.question_id]) }}</strong>
    </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div> -->
    </q-form>
    <q-card v-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2" >
     
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </q-card>
        </div>
    </q-carousel-slide>

    
</q-carousel>
<div class="row justify-center" style="background-color:white">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="slideOption"
      />
    </div >
    <div style="background-color:white" ><q-btn label="Finish" @click="finish()" color="primary"/></div>
</div>
</template>

<style lang="sass" scoped>
.my-card
  width: 500%
  height: 500%
  max-width: 550px
</style>