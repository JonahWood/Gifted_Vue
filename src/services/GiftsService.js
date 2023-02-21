import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { theApi } from "./AxiosService.js"


class GiftsService {
    async deleteGift(giftId){
        let giftIndex = AppState.gifts.findIndex(g => g.id == giftId)
        const res = await theApi.delete(`/gifts/${giftId}`)
        AppState.gifts.splice(giftIndex, 1)
    }

async submitGift(formData){
    try {
        let newGift = new Gift(formData)
        const res = await theApi.post('/gifts', newGift)
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
}

async getGifts(){
    const res = await theApi.get('/gifts')
    logger.log('gotten gifts:', res.data)
    AppState.gifts = res.data.map(g => new Gift(g))
}

// FIXME
async giftToggle(giftId){
    const res = await theApi.put(`/gifts/${giftId}`, {opened: true})
    return res
    // debugger
    // let gift = AppState.gifts.find(g => g.giftId == giftId)
    // let giftIndex = AppState.gifts.findIndex(g => g.giftId == giftId)
    // gift.opened = true
    // const res = await theApi.put(`/gifts/${giftId}`, gift)
    // AppState.gifts.splice(giftIndex, 1, res)
}
}

export const giftsService = new GiftsService()