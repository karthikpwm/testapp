<template>
<div class="page-container" style="padding-top: 306px; padding-left: 618px;">
  <div class="q-pa-lg row items-start q-gutter-md" >
  <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">Thans for attending the test, Your mark has been sent to your E-mail</div>
        
      </q-card-section>

      <q-separator dark inset />
      <div class="text-subtitle2"> </div>
      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>
</div>
</template>
<script>
export default {
  setup () {
    return {
      lorem: '    Prosperity Wealth Management.'
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 200%
  max-width: 592px
</style>