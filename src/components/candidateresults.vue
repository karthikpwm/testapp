<template>
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

    rows.value = resdata
  console.log(resdata, rows.value)
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
    { name: 'date', label: 'date', field: 'date',align: 'left', sortable: true },
    { name: 'email', label: 'email',align: 'left', field: 'email' },
    { name: 'mobile', label: 'mobile',align: 'left', field: 'mobile' },
    
  ]
  
    return {
      columns,
      rows,
      
    }
  },
   methods: {
    onRowClick (evt, row) {
      let windowFeatures = "left=200,top=200,width=920,height=520";
      let route = this.$router.resolve({ name: "printcanquestions",params: {id : row.candidate_id} });
      console.log(windowFeatures,'kkk')
      window.open(route.href, "mozillaWindow", windowFeatures);
      console.log('clicked on', row.candidate_id)
    }
  }
}
</script>
