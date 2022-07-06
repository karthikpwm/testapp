<template>
<div class="page-container" style="padding-top: 39px">
<div class="row justify-center" style="background-color:white; font-family:'Times New Roman', serif;">
  <h5>Token Generation</h5>
</div>

  <div class="page-container window- row justify-center flex items-center" style="background-color:white;">
    <div class="row justify center" style="max-width: 520px">
    
      <!-- <div class="name" 
      v-for="(applicant, counter) in applicants"
      v-bind:key="counter">
      <span @click="deleteVisa(counter)">x</span> -->
      <!-- <label for="duration">{{counter+1}}. Name:</label> -->
      <!-- <q-input filled v-model="applicant.name" label="Name" /> -->
      <!-- <label for="duration">Email Id:</label> -->
      <!-- <q-input filled v-model="applicant.email" label="Email" />
      </div>

<q-btn @click="addVisa" color="primary"> Add another Details</q-btn>
      
    </div>
    <div> -->
      
    <!-- <div class="q-pb-sm">
      <q-badge color="teal">
        Model: {{ date }}
      </q-badge>
    </div> -->
      <span1>
    <q-input filled v-model="date" outlined hint="From date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary"/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input filled v-model="date1" outlined hint="To date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date1" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date1" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>  </span1><br/>
    <q-input type="textarea" v-model="generatetoken" rows="10" cols="30" outlined clearable >
    
    </q-input>
    <q-btn @click="tokengen" color="primary">generate token</q-btn>
    </div>
  </div>
  </div>
</template>

<script>
import { parse } from '@babel/parser';
import { now } from 'lodash';
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { api } from '../boot/axios';
import { useUserStore } from '../store/user'
import moment from 'moment'
 
  
  export default {
     data(){
    return {
       applicants:[
       {
      name: '',
      email:''
       },
     ],
     
    }
  },
  methods : {
    addVisa(){
      this.applicants.push({
        name:'',
        email: ''
      })
    },
    
    deleteVisa(counter){
      this.applicants.splice(counter,1);
}
  },
    setup () {
      const store = useUserStore()
      
      const generatetoken = ref()
      const { token,admin,company_id} = storeToRefs( store )
      const date = ref(moment().format('YYYY-MM-DD HH:mm '))
      const date1 = ref(moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm '))
      const mask="YYYY-MM-DD HH:mm"
      // date-fsn
      //console.log('compid',company_id.value)
      //console.log('orgnltoken',company_id)
      
     
      const tokengen = () => {
       var abc = Date.parse(date.value)
       var bcd = Date.parse(date1.value)
         //console.log(abc)
      //var cde =  date.value
       //console.log('dddd',cde,date1.value)
      // return date
        api .post(`token/jwt`,{fromDate : abc,toDate : bcd,company_id :company_id.value },
        {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}) 
        .then(async (res) => {
        generatetoken.value ="https://fast-citadel-20623.herokuapp.com/token/test/" + res.data.token 
        //  applicant.name.value = generatetoken
         
         //console.log('newtoken',generatetoken.value)
        })
         .catch((res) => {
            
            console.log(res)
            alert(res.data || 'server not found')
          })
      }
     
      return {
        generatetoken,
        tokengen,
        msg: '',
        text: ref(''),
        date1,
         date
      
      }
    }
  }
  </script>

  <style scoped>
#visa {
  margin: 10px auto;
  max-width: 500px;
  max-height: fit-content;
}
label{
  display: block;
  margin: 20px 0 10px;
}
input {
  font-size: 15px;
  border: 1px double rgb(102, 97, 96) ;
  border-radius: 4px;
}
button {
  font-size: 12px;
 background: rgb(64, 179, 140);
  padding: 0.4rem 1.3rem;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
 margin: 10px;
}
span{
  width: 10px;
  float: right;
  cursor: pointer;
}
span1{
  width: 230px;
  float: right;
  cursor: pointer;
  padding-right: 10px;
}
span:hover{
  color: brown;
}
.name{
  border: 1.5px solid;
  padding:7px;
  margin-bottom: 10px;
}
</style>