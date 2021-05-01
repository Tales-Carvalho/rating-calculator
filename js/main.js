// TODO: Player class is not used yet, but will be used in the future for rating calculation
class Player {
    constructor (name, birthDate, city, initialRating = 1500) {
        this.name = name
        this.birthDate = birthDate
        this.city = city
        this.rating = initialRating
    }
}

// Custom RNG function: generates a "random" value 0 <= num < 1
const randomGenerator = (seed) => ((seed * 5486230734 + 6908969830) % 9853205067) / 9853205067

// Custom shuffle function based on seed
const shuffle = (array, seed) => array.sort(() => (seed = randomGenerator(seed) > .5) ? 1 : -1)

fPlayers = new FormPlayers('tourneyPlayers', 'tourneyAddPlayer', 'tourneyRemovePlayer')
fMatches = new FormMatches('randomSeedInput', 'generateMatches', 
    'tourneyMatches', 'tourneyStandings', fPlayers)
