<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-3 gift-form bg-gradient">
      <form @submit.prevent="submitGift()">
                <label for="tag" class="text-light mb-1">Tag</label>
                <input v-model="editable.tag" type="text" class="form-control mb-3">
                <label for="url" class="text-light mb-1">Url</label>
                <input v-model="editable.url" type="url" class="form-control">
                <button type="submit" class="btn btn-danger mt-5">Submit</button>
      </form>
    </div>
    <div v-for="giftFromTheVFor in gifts" class="col-3 bg-dark text-light p-1 acGift">
      <GiftCard :gift="giftFromTheVFor"/>
    </div>
  </div>
</div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import  Pop  from '../utils/Pop.js';
import { giftsService } from '../services/GiftsService'
import { onMounted, ref } from 'vue';
import { AppState } from "../AppState"
import { computed } from '@vue/reactivity';

export default {
  setup() {
    const editable = ref({})
    async function getGifts() {
      try {
        await giftsService.getGifts()
      } catch (error) {
        Pop.error(error)
        logger.error(error)
      }
    }

    onMounted(() => {
      logger.log('hey hey everybody')
      getGifts()
    })
    return {
      editable,
      gifts: computed(() => AppState.gifts),
      async submitGift(){
        try {
          let formData = editable.value
          await giftsService.submitGift(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gift-form{

  background-color: #152d1997;
  border-radius: 10px;
  // text-shadow: 2px 2px 10px whitesmoke; 
}

.acGift{
  border-bottom: 1px solid #80808099;
  border-left: 1px solid #80808099;
  border-right: 1px solid #80808099;
}

</style>
