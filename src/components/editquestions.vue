<template>
  <div class="q-pa-md">
    <div style="max-width: auto">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
      <q-tab class="text-orange" name="questions" label="questions" />
      <!-- <q-tab class="text-teal" name="category" label="New Category" /> -->
        
      </q-tabs>
      <div class="q-gutter-y-sm" >
        <q-tab-panels
          v-model="tab"
          transition-prev="scale"
          transition-next="scale"
          class="bg-white text-white text-center"
        >
      
      <q-tab-panel name="questions">
            
      <q-table
      title="List Of Questions"
      :data="resdata"
      :rows="rows"
      auto-width
      wrap-cells
      :columns="columns"
      row-key="question"
      binary-state-sort
      :rows-per-page-options="[10]"
    >
     <template v-slot:top>
          <!-- <q-btn dense color="secondary" label="Add Question" @click="show_dialog = !show_dialog" no-caps></q-btn><br/> -->
          <q-btn dense color="primary" label="Add new Question" @click="show_dialog1 = !show_dialog1" no-caps></q-btn>
          
        <div class="q-pa-md q-gutter-md">
        <q-dialog v-model="show_dialog">
        <q-card>
          <q-card-section style="width: 623px">
            <div class="text-h6">Edit question</div>
          </q-card-section>

          <q-card-section style="width: 621px">
            <div class="row" style="width: 600px">
              <q-input v-model="editedItem.question" autogrow label="Question" style="width: 400px"></q-input>
              </div>
            <div class="row">
            <q-input v-model="editedItem.options" autogrow label="options" style="width: 400px"></q-input> 
            </div>
           <!-- <div class="row"><q-input v-model="editedItem.answeralpha" label="answer"></q-input></div> -->
           <div class="row"  ><q-select style="width: 400px" v-model="editedItem.answeralpha" :options="answeroptions" label="Answer" emit-value map-options/></div>
           <!-- <div class="row"><q-input v-model="editedItem.company_id" label="company"></q-input></div> -->
           <!-- <div class="row"><q-select style="width: 400px" v-model="editedItem.companynew" :options="companyoptions" label="Company" emit-value map-options/></div> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="SAVE" color="primary" v-close-popup @click="addRow()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
          </div>  <br/>
            
        <div class="q-pa-sm q-gutter-md">
        <q-dialog v-model="show_dialog1" @before-show="setDefaultFind()" >
        <q-card class="qcard row justify-center">
          <q-card-section style="width: 623px">
            <div class="text-h6">Add New Question</div>
          </q-card-section>

          <q-card-section style="width: 621px">
            <div class="row justify-center" style="width: 600px">
              <q-input v-model="additem.question" autogrow label="Question" style="width: 360px"></q-input>
              </div>
              <!-- {{finds}} --><br/>
            <div class="row justify-center" v-for="(_,index) in finds.options" :key="index">
            <!-- {{finds[index]}} -->
            <q-input v-model="finds.options[index]" autogrow label="Options" style="width: 350px" > </q-input>
            </div>
            <div class="row justify-center" style="padding-top:3px">
            <q-btn color="primary" @click="addnewitem()" >
            Add Option
            </q-btn></div>
           <!-- <div class="row"><q-input v-model="editedItem.answeralpha" label="answer"></q-input></div> -->
           <div class="row justify-center"  ><q-select style="width: 250px" v-model="additem.answeralpha" :options="answeroptions" label="Answer" emit-value map-options/></div>
           <div class="row justify-center"  ><q-select style="width: 250px" v-model="additem.category" :options="categoryoptions" label="Company" emit-value map-options/></div>
           <!-- <div class="row"><q-input v-model="editedItem.company_id" label="company"></q-input></div> -->
           <!-- <div class="row justify-center"><q-select style="width: 250px" disable v-model="additem.companynew" :options="companyoptions" label="Company" emit-value map-options/></div> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="SAVE" color="primary" v-close-popup @click="addRow()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
          </div>
          
          
      </template>
      <!-- <template v-slot:top-right>
       <q-btn dense color="secondary" label="Add new Question" @click="show_dialog1 = !show_dialog1" no-caps></q-btn>
        
      </template> -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="question" :props="props">
            {{ props.row.question }}
            <!-- <q-popup-edit v-model="props.row.question" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus  />
            </q-popup-edit> -->
          </q-td>
          <q-td key="options" :props="props">
            {{ props.row.options }}
            <!-- <q-popup-edit v-model="props.row.options" title="Update Options" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit> -->
          </q-td>
          <q-td key="answer" :props="props">
            {{ props.row.answeralpha }}
            <!-- <q-popup-edit v-model="props.row.answeralpha" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit> -->
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.companynew }}
            <!-- <q-popup-edit v-model="props.row.companynew" title="Update Company" buttons persistent v-slot="scope">
              <q-input type="number" v-model="scope.value" dense autofocus hint="Use buttons to close" />
            </q-popup-edit> -->
          </q-td>
          <q-td key="actions" :props="props" style="width:131px">
              <q-btn color="blue"  icon="edit"  @click="editItem(props.row)" size=sm no-caps></q-btn>
              <q-btn color="red" icon="delete_forever"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
            </q-td>
          <!-- <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td> -->
        </q-tr>
      </template>
    </q-table>
          </q-tab-panel>
          </q-tab-panels>
          <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-white text-black text-center"
        >
        <q-tab-panel name="category">
          <q-table
      title="categories"
      :data="resdata"
      :rows="rows1"
      auto-width
      wrap-cells
      :columns="columns"
      row-key="question"
      binary-state-sort
      :rows-per-page-options="[10]"
    >
            <template v-slot:top>
             <q-btn dense color="primary" label="Add new Category" @click="show_dialog2 = !show_dialog2" no-caps></q-btn>{{categoryname}}
             <div class="q-pa-md q-gutter-md">
                <q-dialog v-model="show_dialog2">
        <q-card>
          <q-card-section style="width: 523px">
            <div class="text-h6">Category</div>
          </q-card-section>

          <q-card-section style="width: 421px">
            <div class="row" style="width: 400px">
              <q-input v-model="categoryname" autogrow label="Category Name" style="width: 200px"></q-input>
              </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="SAVE" color="primary" v-close-popup @click="addCategory()" ></q-btn>
          </q-card-actions>
          </q-card>
    </q-dialog>
             </div>
            </template>
           
          </q-table>

          </q-tab-panel>
          </q-tab-panels>
          
          </div>
    </div>
    
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { useCompanyStore } from '../store/company'
import {onMounted, ref } from 'vue'
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
import { AddressbarColor } from 'quasar';


export default {
  data()
{
  
  return {
  
  
  }
},
  setup () {
    const store = useUserStore()
    const store2 = useCompanyStore()
    const { token,admin} = storeToRefs( store )
    const {company} = storeToRefs(store2)
    const router = useRouter()
    var show_dialog = ref(false)
    var show_dialog1 = ref(false)
    var show_dialog2 = ref(false)
    var editedIndex = ref(-1)
    var categoryname = ref()
    const categoryoptions = ref([])
    const finds = ref({})
    const numberToChar = (number) => {
      if(number === null) {
        return null
      }
      return String.fromCharCode(number+65)
    }
    const isNumber = (char) => {
  return /^\d$/.test(char);
}
    var editedItem = ref([ {
        question: '',
        options: '',
        answer: '',
        answeralpha: '',
        company_id: '',
        companynew : '',
        category: ''
      }])
    var additem = ref([ {
        question: '',
        options: '',
        answer: '',
        answeralpha: '',
        company_id: '',
        companynew : '',
        category: ''
      }])
      const defaultItem = ref({
        question: '',
        options: [],
        answeralpha: '',
        companynew: null,
        
      })
      const addnewitem = () => {
        //console.log("looooo")
        //console.log(additem)
        finds.value.options.push('')
      }
     const setDefaultItem = () => {
      editedItem.value = ref(Object.assign({}, defaultItem)) 
      editedIndex.value = -1

     }
    const rows = ref([])
    const setDefaultFind = () => {
       additem.value = Object.assign({}, defaultItem.value)
      //console.log('working', defaultItem.value)
      finds.value = Object.assign({}, defaultItem.value)
      finds.value.options = finds.value.options.splice(0, finds.value.options.length)
    }
    const clearinputvalue = () => {
       additem.value = Object.assign({}, defaultItem.value)
      //  finds.value.options.splice(0, options.length)
      finds.value.options = finds.value.options.splice(0, finds.value.options.length)
      //console.log(finds.value.options)
    }
    const getQuestion = () => {
      api
          .get(`analytic/getallqstns`,
          {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
          .then(async (res) => {
            
  let resdata = res.data.data
  resdata.map(function(val) {
    val.answeralpha = numberToChar(val.answer)
    
      val.companynew = company.value.name
    
      
    
  })
  //console.log(resdata)
    var result=resdata.filter(obj=> obj.company_id == admin.value.company_id);
 //console.log(result);
 //console.log(company.value.name)
  //rows.value = resdata
  rows.value = result
          })

    }
     onMounted(() => {
      getcategorydetails();
      getQuestion();      
      //console.log(token)
  })
 
const addRow = () => {
    //console.log(editedItem.value)
    //console.log(editedIndex.value)
    //console.log(editedItem.value.answeralpha)
    //console.log(editedItem.value.companynew)
   
    // let alphaanswer = editedItem.value.answeralpha
    // alphaanswer = numberToChar(alphaanswer)
    // console.log(alphaanswer)
    if(editedIndex.value > -1)
    {
       let changecompany = isNumber(editedItem.value.companynew)
    let newcompany = ref()
    let newanswer = ref()
    //console.log('haaai',changecompany)
    if(changecompany == false)
    {
      // newcompany.value = numberToChar(editedItem.value.companynew)
      if(editedItem.value.companynew === 'PWM')
      {
        newcompany.value = 1
       // console.log('pwm coming', newcompany.value)
      }
      else if (editedItem.value.companynew === 'SHAKTHI'){
         newcompany.value = 2
         //console.log('shakthi coming', newcompany.value)
      }
    }
    else {
     newcompany.value = editedItem.value.companynew
     //console.log('original coming', newcompany.value)
    }
    let changeanswer = isNumber(editedItem.value.answeralpha)
    if(changeanswer == false){
        // newanswer.value = numberToChar(editedItem.value.answeralpha)
        if(editedItem.value.answeralpha === 'A')
        {
          newanswer.value = 0
        }
        else if(editedItem.value.answeralpha === 'B')
        {
          newanswer.value = 1
        }
        else if(editedItem.value.answeralpha === 'C')
        {
          newanswer.value = 2
        }
        else if(editedItem.value.answeralpha === 'D')
        {
           newanswer.value = 3
        }
    }
    else 
    {
      newanswer.value = editedItem.value.answeralpha
    }
      api.put(`analytic/editqstn/${editedItem.value.question_id }`, {question : editedItem.value.question,options: editedItem.value.options, answer: newanswer.value,company_id:admin.value.company_id},
      {
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then(() => {
  setDefaultItem();
  getQuestion();
 }).catch((res) => {
           
            // console.log(res)
            
           })
    }
    else{
     let ab = finds.value.options
     let up =  ab.lastIndexOf("")
     //console.log(up)
      if( additem.value.question != '' && up == -1 && additem.value.answeralpha != '' )
      {
   
   
   
    // const split_string = ab.split(" ");
    //  console.log(split_string)
     let adc = JSON.stringify(ab)
    // let newanswer = numberToChar(editedItem.value.answeralpha)
    //console.log(additem.value)
    api.post('analytic/insertqstn', {question :additem.value.question ,options:adc,answer : additem.value.answeralpha,company_id: admin.value.company_id},
    {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
.then(() => {
  clearinputvalue();
  getQuestion();
})
.catch((res) => {
            
            console.log(res)
            
          })
    }
    else {
      alert('Empty Fields are not allowed')
    }
    }
    
//       if (editedIndex > -1) {
//         Object.assign(this.data[editedIndex], editedItem);
//       } else {
//         console.log(editedItem);
//       }
//       this.close()
    
}
const deleteItem = (item) => {
  editedItem.value = Object.assign({}, item);
 // const index = data.indexOf(item);
      confirm("Are you sure you want to delete this question?") &&
       api.delete(`analytic/deleteqstn/${editedItem.value.question_id }`,
       {
   headers: {
     Authorization: 'Bearer ' + token.value
   }
 }).then((res) => {
  getQuestion();
 })
 .catch((res) => {
            
             //console.log(res)
            
           })
       
}
const editItem = (item) => {
//console.log(item)
      editedIndex.value = rows.value.indexOf(item)
       //console.log(editedIndex)
       editedItem.value = Object.assign({}, item);
       
      show_dialog.value = true
      //console.log(editedItem )
}
const close = () => {
   //this.show_dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
}
const addCategory = () => {
  api.post('user/addcategory',{category : categoryname.value, company_id : admin.value.company_id,}
  ).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
  console.log(categoryname.value)
} 
const getcategorydetails = () => {
    api.get("user/getcompdetails",
    {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
      .then(res => {
        var result = res.data.data.filter(obj => obj.company_id == admin.value.company_id);
        categoryoptions.value = result.map((x) => { 
        
        return {'label' : x.name, 'value' : x.company_id }
      })
        //allcompdet.value = res.data.data
       //company.value = allcompdet.value
//         var inner = res.data.data.map(function(e) {
//   return e;
// });

//     //console.log(inner);
//     company.value = inner
//         console.log(company.value)
      }).catch((res) => {
        //console.log(res)
      })
  }
const columns = [
  {
    name: 'question',
    required: true,
    label: 'Questions',
    align: 'left',
    field: 'question',
    
    sortable: true
  },
  { name: 'options', align: 'center', label: 'Options', field: 'options', sortable: true },
  { name: 'answer', label: 'Answer', field: 'answeralpha',align:'center' },
  { name: 'company', label: 'Company', field: 'companynew' },
   {
          name: "actions",
          label: "Actions",
          field: "actions", align: 'center',headerStyle:'width:100px'
        }
]
return {
  tab: ref('questions'),
  show_dialog,
  show_dialog1,
  show_dialog2,
  categoryname,
  columns,
  rows,
  addRow,
  deleteItem,
  setDefaultFind,
  editItem,
  close,
  numberToChar,
  editedItem ,
  additem,
  editedIndex,
  defaultItem,
  setDefaultItem,
  isNumber,
  finds,
  addnewitem,
  clearinputvalue,
  addCategory,
  getcategorydetails,
  categoryoptions,
  answeroptions: [
        {
          label: 'A',
          value: '0',         
        },
        {
          label: 'B',
          value: '1', 
        },
        {
          label: 'C',
          value: '2',
        },
        {
          label: 'D',
          value: '3',
        },
      ],
      companyoptions: [
        {
          label: 'PWM',
          value: '1'
        },
        {
          label: 'SHAKTHI',
          value: '2'
        }
      ]
}

},

}
</script>
<style scoped>
.qcard {
  max-width:625px
}
</style>