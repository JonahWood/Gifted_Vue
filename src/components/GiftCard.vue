<template>
    <img :src="gift.url ? gift.url : 'https://cdn-icons-png.flaticon.com/512/61/61457.png'" :alt="gift.tag" class="img-fluid rounded selectable" @click="giftToggle(gift.id)">
    <!-- <img :src="gift.url" :alt="gift.tag" class="img-fluid rounded"> -->
    <h6>
        {{ gift.tag }} <button class="btn btn-outline-danger" @click="deleteGift(gift.id)">delete</button>
    </h6>
</template>


<script>
import { Gift } from '../models/Gift.js';
import { giftsService } from '../services/GiftsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: {
        gift: { type: Gift }
    },
    setup(){
        return {
            // FIXME
            async giftToggle(giftId){
                try {
                    await giftsService.giftToggle(giftId)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            },
            async deleteGift(giftId){
                try {
                    await giftsService.deleteGift(giftId)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
img{
    height: 300px;
    width: 300px;
}
</style>