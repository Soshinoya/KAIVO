export default class Countries {

    static getCountries = async () => {
        const response = await fetch('/Database/countries.json')
        const data = await response.json()
        return data
    }

}