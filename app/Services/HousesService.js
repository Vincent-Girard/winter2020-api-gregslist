import { ProxyState } from "../AppState.js"
import House from "../Models/House.js"
import { api } from "./AxiosService.js"

class HousesService {

    async getHouses() {
        let res = await api.get("houses")
        console.log(res.data)
        ProxyState.houses = res.data.map(h => new House(h))
    }

    async createHouse(newHouse) {
        let house = await api.post("houses", newHouse)
        console.log(house)

        this.getHouses()
    }

    async deleteHouse(id) {
        let res = await api.delete("houses/" + id)
        console.log(res)

        ProxyState.Houses = ProxyState.houses.filter(house => house.id != id)
    }

    async bid(id, newPrice) {
        let houseData = { price: newPrice }
        let res = await api.put("houses/" + id, houseData)
        console.log(res);
        let oldHouseIndex = ProxyState.houses.findIndex(h => h.id == id)

        let temp = ProxyState.houses
        debugger
        temp.splice(oldHouseIndex, 1, new House(res.data))
        ProxyState.houses = temp
    }

    async getOne(id) {
        let res = await api.get("houses/" + id)
        console.log(res)
    }
}

export const housesService = new HousesService()