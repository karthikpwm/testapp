<template>
  <div class="q-pa-md">
    <div>Candidate id is {{this.candidateId}}</div>
    
    <q-table
      
      :rows="rows"
      style="width: 1000px"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      @row-click="onRowClick" 
    />
  </div>
</template>
<script>
import { computed, onMounted, ref,getCurrentInstance } from '@vue/runtime-core';
import { api } from '../boot/axios';
import { useRouter } from 'vue-router'
export default {
  name : 'cresult',
  data(){
    return {
      candidateId:this.$route.params.id
      }

  },
  setup () {
    const router = useRouter()
    const rows = ref([])
    
    onMounted(() => {
      let cid = getCurrentInstance().data.candidateId
      console.log(cid)
 api
          .get(`analytic/printcanquestions/${cid}`)
          .then(async (res) => {
            
  let resdata = res.data.data

    rows.value = resdata
    // resdata.forEach(element => {
    //   let abc = element.correct
    //   if(abc === 'correct') {
    //     element.result = 1
    //   }
    //   else {
    //     element
    //   }
    //   console.log(abc)
      
    // });
  console.log(resdata)
          })

    })

  const display = () => {
//  console.log(getCurrentInstance().data.candidateId)
//     api
//           .post(`analytic/printcanquestions/${22}`)
//           .then(async (res) => {
            
//   let resdata = res.data.data

//     rows.value = resdata
    // resdata.forEach(element => {
    //   let abc = element.correct
    //   if(abc === 'correct') {
    //     element.result = 1
    //   }
    //   else {
    //     element
    //   }
    //   console.log(abc)
      
    // });
  // console.log(resdata)
  //         })

  }
  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Questions',
      field : 'question',
      align: 'left',
      sortable: true
    },
    // { name: 'options', align: 'center', label: 'options', field: 'options', sortable: true },
    // { name: 'answer', label: 'answer', field: 'answer',align: 'left', sortable: true },
    { name: 'correct', label: 'Marks',align: 'left', field: 'correct' },
    // { name: 'candidate answer', label: 'candidate answer',align: 'left', field: 'candidateanswer' },
    
  ]
  
    return {
      columns,
      rows,
      display,
      
    }
  },
  //  methods: {
  //   onRowClick (evt, row) {
  //     let windowFeatures = "left=200,top=200,width=920,height=520";
  //     let route = this.$router.resolve({ path: "/calc" });
  //     console.log(windowFeatures,'kkk')
  //     window.open(route.href, "mozillaWindow", windowFeatures);
  //     console.log('clicked on', row.candidate_id)
  //   }
  // }
}
</script>
