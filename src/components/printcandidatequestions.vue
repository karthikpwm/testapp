<template>
  <div class="q-pa-md">
    <div> id is :{{this.id}}</div>
    <q-table
      title="questions for candidate"
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
  name : 'cresult',
  data ()
  {
    return {id:this.$route.params.id}
  },
  setup () {
    const router = useRouter()
    const rows = ref([])
    onMounted(() => {
api
          .get(`analytic/getcandidateqstnmarks`)
          .then(async (res) => {
            
  let resdata = res.data.data

    rows.value = resdata
  console.log(resdata, rows.value)
          })

    })


  const columns = [
    {
      name: 'name',
      required: true,
      label: 'questions',
      field : 'question',
      align: 'left',
      
      style: 'width: 10px',
      sortable: true
    },
    // { name: 'options', align: 'center', label: 'options', field: 'options', sortable: true },
    // { name: 'answer', label: 'answer', field: 'answer',align: 'left', sortable: true },
    { name: 'correct', label: 'correct or wrong',align: 'left', field: 'correct' },
    // { name: 'candidate answer', label: 'candidate answer',align: 'left', field: 'candidateanswer' },
    
  ]
  
    return {
      columns,
      rows,
      
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
