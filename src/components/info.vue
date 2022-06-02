 <template>
  <div class="q-pa-sm row items-start q-gutter-md">
    <div class="fixed-center">
    <q-card class="my-card-align=“center”" flat bordered>
      <q-img
        src=""
        img-alt="Image"
        img-top
        style="max-width: 4rem;"
        class="mb-2"
      />

      <q-card-section >
        <div class="text-overline text-orange-9"></div>
        <div class="text-h7 q-mt-sm q-mb-xs">Note</div>
        <div class="text-h6 text-grey-fixed-center">
         You have only 20 minutes for attending 10 aptitude questions. Click start test to begin your test.
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="dark" label="" />
        <q-btn class=" " color="primary" label="Start Test" @click="start()" rounded />

        <q-space />

        <!-- <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        /> -->
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup () {
    const route = useRoute()
  const router = useRouter()
    const start = () =>{
      console.log('hhh')
      router.push('/');

    };
    return {
      expanded: ref(false),
      lorem: '',
      start
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  

.note 
  background-color : #e0e0e0
</style>
