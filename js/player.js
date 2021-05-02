class Player {
    constructor (name, birthDate, city, province, country, initialRating = 1500) {
        this.name = name
        this.birthDate = birthDate
        this.city = city
        this.province = province
        this.country = country
        this.rating = initialRating
    }
}