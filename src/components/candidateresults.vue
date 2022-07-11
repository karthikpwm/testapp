<template>
<div class="q-pa-sm row justify-center">
    <!-- <q-btn  @click="deletecan()" color="primary" label="delete"/> -->
  </div>
  <div class="q-pa-md">
    <q-table
      title="Marks scored by candidate out of 10"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[15]"
      @row-click="onRowClick" 
    />
  </div>
  
</template>

<script>
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user'
import { onMounted, ref } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
export default {
  setup () {
    const $q = useQuasar()
    const store = useUserStore()
    const { token,admin} = storeToRefs( store )
    const router = useRouter()
    const rows = ref([])
    onMounted(() => {
      $q.loading.show({
          message: 'Loading...pls wait..',
          boxClass: 'text-white',
          spinnerColor: 'white',
          spinnerSize: 60
        })
      //console.log(token)
api
          .get(`analytic/getmarks`,
          {
  headers: {
    Authorization: 'Bearer ' + token.value
  }
}).then(async (res) => {        
  let resdata = res.data.data
  $q.loading.hide()
  // resdata.forEach(element => {
  //   let pp = 1200
  //  let ab = pp - element.time
  //  const timeLeft = ab;
  //     const minutes = Math.floor(timeLeft / 60);
  //     let seconds = timeLeft % 60;

  //     if (seconds < 10) {
  //       seconds = `0${seconds}`;
  //     }

  //    let cd = `${minutes}:${seconds}`;
  //   console.log(cd)
  // });
  
  let qw = 0;
  resdata = resdata.map(function (val) {
         
     const pp = 1200
     if(val.time === 0)
     {
      val.time =1200
     }       
     else {
    val.qw = pp - val.time
    const timeLeft = val.qw;
       const minutes = Math.floor(timeLeft / 60);
       let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
       
      val.timetaken = `${minutes}:${seconds}`;
         //console.log('sum',val.timetaken,resdata)
         console.log(admin.value.company_id)
         var result = resdata.filter(obj=> obj.company_id == admin.value.company_id);
 //console.log(result);
        rows.value = result
     }
         })
         console.log(rows.value)
    //rows.value = resdata




}).catch( (res)=> {
$q.loading.hide()
})

    })
   


  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name of the candidate',
      field : 'name',
      align: 'left',
      style: 'width: 300px',
      sortable: true
    },
    { name: 'marks scored', align: 'center', label: 'Marks', field: 'totalcorrect', sortable: true },
    { name: 'time', label: 'Time taken', field: 'timetaken',align: 'center', sortable: true },
    { name: 'date', label: 'Date', field: 'date',align: 'center', sortable: true },
    { name: 'email', label: 'Email',align: 'center', field: 'email' },
    { name: 'mobile', label: 'Mobile',align: 'center', field: 'mobile' },
    { name: 'ctc', label: 'Last CTC',align: 'center', field: 'ctc' },
    { name: 'pincode', label: 'Pincode',align: 'center', field: 'pincode' },
    
  ]

  const onRowClick = (_, row) => {
    let windowFeatures = "left=200,top=200,width=920,height=520";
      //let route = router.push('/printcanquestions/'+row.candidate_id,
      let route = router.resolve({ path: '/printcanquestions/'+row.candidate_id,
       
  headers: {
    Authorization: 'Bearer ' + token.value
  }
})
      //console.log(windowFeatures,'kkk')
      window.open(route.href, "mozillaWindow", windowFeatures);

      //router.push('/printcanquestions/'+row.candidate_id,
//       {
//   headers: {
//     Authorization: 'Bearer ' + token.value
//   }
// })

  }
  
    return {
      columns,
      onRowClick,
      rows,
       deletecan() {
         //console.log('working')

         api
        .delete(`analytic/deletecan`, {
          headers: {
             Authorization: 'Bearer ' + token.value
          }
      }).then(res => { 
         router.push('/welcome')
      })
      
     }
    }
  },
   methods: {

}
}
</script>
