<template>
  <div class="q-pa-md">
    <div style="max-width: auto">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
        <q-tab class="text-purple" name="mails" label="Sign Up" />
        <q-tab class="text-orange" name="alarms" label="Manage Accounts" />
       
      </q-tabs>

      <div class="q-gutter-y-sm" >
        <q-tab-panels
          v-model="tab"
          v-if="arights"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="bg-white text-white text-center"
        >
          <q-tab-panel name="mails">
            <!-- <div class="text-h6">Create New User</div> -->
            <div class="row ">
        <q-card square class="shadow-24" style="width:400px;height:480px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">New User</h4>
           
          </q-card-section>
          <q-card-section>
          <!-- <q-fab
          color="primary" @click="switchTypeForm"
          icon="add"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        >
          <q-tooltip>
          
        </q-tooltip>
        </q-fab> -->
            <q-form class="q-px-sm q-pt-xl" @submit.prevent="submitForm">
              <q-input 
                       ref="email"
                       square 
                       clearable 
                       v-model="signup.email" 
                       type="email"
                       lazy-rules
                       
                       label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input 
                        ref="username"
                      
                        square 
                        clearable 
                        v-model="signup.username"
                        lazy-rules
                        
                       type="username"                                                            
                       label="username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input  
                       ref="password"
                       square 
                       clearable 
                       v-model="signup.password"                                                        
                       
                       lazy-rules
                      
                       label="password">
                
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
              <q-icon 
                                              
                   class="cursor-pointer" />
                </template>
              </q-input>
              <q-input 
                  ref="company"
                  
                  square 
                  clearable 
                  v-model="signup.company"                                                      
                  
                  lazy-rules
                  
                  label="Company">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
           <template v-slot:append>
          <q-icon 
                                             
                  class="cursor-pointer" />
          </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="sign">
            <q-btn  
                   size="md" 
                   color="primary"
                   @click="submitForm"
                   class="text-white"                         
                    label="Sign Up" />
          </q-card-actions>
          <q-card-section 
              
              class="text-center q-pa-sm">
            <p class="text-grey-6"></p>
          </q-card-section>
        </q-card>
      </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-white text-white text-center"
        >
        

          <q-tab-panel name="alarms">
            <!-- <div class="text-h6">Alarms</div> -->
            <div class="q-pa-sm">
    <q-table
      class="my-sticky-header-column-table"
      title="User Details"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body="props">
        <q-tr :props="props">
         <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus  />
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit v-model="props.row.email" title="Update Options" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="password" :props="props">
            {{ props.row.password }}
            <q-popup-edit v-model="props.row.password" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.company_id }}
            <q-popup-edit v-model="props.row.company_id" title="Update Company" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          <q-td key="actions" :props="props" style="width:131px">
              <q-btn color="blue"  icon="edit"  @click="editItem(props.row)" size=sm no-caps></q-btn>
              <q-btn color="red" icon="delete_forever" :disable="!arights"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
            </q-td>
          <!-- <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td> -->
        </q-tr>
      </template>
      </q-table>
  </div>
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
<style scoped>
.row{
  justify-content:center
}
.q-pt-xl {
    padding-top: 20px;
}
.q-px-sm {
    padding-left: 73px;
    padding-right: 74px;
}
.sign{
    padding-left: 55px;
    padding-right: 68px;
}

</style>
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  // height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  // max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { onMounted,ref,computed } from 'vue'
import { useQuasar } from 'quasar'
import { api } from '../boot/axios';

export default {
  setup () {
     const arights = computed(() => {
      
      if(admin.value.usertype === 'admin')
      {
        return true
      } else {
        return false
      }
    })
    const store = useUserStore()
    const { token,admin} = storeToRefs( store )
    const $q = useQuasar()
    const rows = ref([])
    const signup = ref({
      email: '',
    username: '',
    password: '',
    company: '',
    usertype: ''
  })
  const defaultValue = ref( {
    email : '',
    username : '',
    password: '',
    company: '',
    usertype: ''
  })
  const setDefaultValue = () => {
      signup.value = ref(Object.assign({}, defaultValue)) 
      

     }
  console.log(admin)
  const submitForm =  () => { 
    console.log('hai')
   if (!signup.value.username ||!signup.value.password || !signup.value.email || !signup.value.company){
      $q.notify({
         type: 'negative',
          message: 'Fill Required Fields' }
      )
       console.log('error')
     } else {
      console.log(signup.value.username)
           api
          .post(`user/register`,{name : signup.value.username, email: signup.value.email, password:signup.value.password , company_id :signup.value.company, usertype:'user'},
          {
             headers: {
     Authorization: 'Bearer ' + token.value
   }
          }).then(async (res) => {
            getUserDetails()
           setDefaultValue()
            console.log(res)

          }).catch( (res) => {
            console.log(res)
          })
     }
  }
  const getUserDetails = () => {
        //console.log(token)
api
          .get(`user/getuserdetails`,
          {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
          .then(async (res) => {
            
  let resdata = res.data.data
  
  console.log(resdata)
  rows.value = resdata
          })
  }
  onMounted(() => {
      getUserDetails()
  
  })
  const columns = [
  {
    name: 'name',
    required: true,
    label: 'USER NAME',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'email', align: 'center', label: 'E-Mail', field: 'email', sortable: true },
  { name: 'password', label: 'PASSWORD', field: 'password', sortable: true },
  { name: 'company', label: 'COMPANY', field: 'comapany_id' },
 {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
]

    return {
      signup,
      submitForm,
      tab: ref('mails'),
      columns,
      rows,
      arights,
      defaultValue,
      setDefaultValue,
      getUserDetails
    }
  }
}
</script>
