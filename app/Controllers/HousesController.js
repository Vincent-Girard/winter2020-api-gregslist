import { ProxyState } from "../AppState.js"
import { housesService } from "../Services/HousesService.js"

function _drawHouses() {
    console.log(5)
    let houses = ProxyState.houses
    let template = ''
    houses.forEach(house => {
        template += house.Template
    })
    document.getElementById('houses').innerHTML = template
}

export default class HousesController {
    constructor() {
        ProxyState.on("houses", _drawHouses)
        this.getHouses()
    }

    getHouses() {
        try {
            housesService.getHouses()
        } catch (error) {
            console.error(error)
        }
    }

    createHouse() {
        window.event.preventDefault()
        console.log("creating house", 1)
        let form = window.event.target
        let newHouse = {
            bedrooms: form['bedrooms'].value,
            bathrooms: form['bathrooms'].value,
            levels: form['levels'].value,
            imgUrl: form['imgUrl'].value,
            year: form['year'].value,
            price: form['price'].value,
            description: form['description'].value,

        }
        try {
            housesService.createHouse(newHouse)

        } catch (error) {
            console.error(error)
        }
        console.log(7)
        form.reset()
        $("#new-house-modal").modal('hide');
    }
    deleteHouse(id) {
        console.log(id)
        try {
            housesService.deleteHouse(id)

        } catch (error) {
            console.error(error)
        }
    }

    bid(id, price) {
        try {
            housesService.bid(id, price)
        } catch (error) {
            console.error(error)
        }
    }

    getOne() {
        let id = ProxyState.houses[0].id
        housesService.getOne(id)
    }

}