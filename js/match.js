class Match {
    constructor (playerWhite, playerBlack, result = '0') {
        this.playerWhite = playerWhite
        this.playerBlack = playerBlack
        this.result = result
    }

    static possibleResults = {
        '0': 'No result',
        'W': '1-0',
        'D': '0.5-0.5',
        'L': '0-1'
    }

    static numberResults = {
        'W': 1,
        'D': 0.5,
        'L': 0
    }
}
