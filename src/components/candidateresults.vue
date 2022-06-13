<template>
<div class="q-pa-sm row justify-center">
    <q-btn  @click="deletecan()" color="primary" label="delete"/>
  </div>
  <div class="q-pa-md">
    <q-table
      title="Marks scored by candidate out of 10"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      @row-click="onRowClick" 
    />
  </div>
  
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const rows = ref([])
    onMounted(() => {
api
          .get(`analytic/getmarks`)
          .then(async (res) => {
            
  let resdata = res.data.data
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
         rows.value = resdata
     }
         })
         console.log(rows.value)
    //rows.value = resdata




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
    { name: 'marks scored', align: 'center', label: 'marks scored', field: 'totalcorrect', sortable: true },
    { name: 'time', label: 'time', field: 'timetaken',align: 'left', sortable: true },
    { name: 'date', label: 'date', field: 'date',align: 'left', sortable: true },
    { name: 'email', label: 'email',align: 'left', field: 'email' },
    { name: 'mobile', label: 'mobile',align: 'left', field: 'mobile' },
    
  ]

  const onRowClick = (_, row) => {
      router.push('/printcanquestions/'+row.candidate_id)
  }
  
    return {
      columns,
      onRowClick,
      rows,
       deletecan() {
         console.log('working')

         api
          .post(`analytic/deletecan`)
      router.go()
    }
    }
  },
   methods: {

}
}
</script>
