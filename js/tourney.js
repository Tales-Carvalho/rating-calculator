class Tourney {
    constructor (players, randomSeed = 1, date = new Date(), matches = []) {
        this.players = players
        this.matches = matches
        if (this.matches.length == 0) {
            // Generate matches
            const matchIds = Tourney.possibleMatches[this.players.length]
            Utils.shuffle(this.players, randomSeed)
            for (const m of matchIds) {
                this.matches.push(new Match(this.players[m[0]-1], this.players[m[1]-1]))
            }
        }
        this.date = date
    }

    getStandings = () => {
        const scores = []
        for (const p of this.players) {
            scores.push({
                playerName: p.name,
                score: 0,
                winsBlack: 0,
                winsWhite: 0,
                draws: 0
            })
        }

        for (const m of this.matches) {
            const scoreWhite = scores.find(s => s.playerName === m.playerWhite.name)
            const scoreBlack = scores.find(s => s.playerName === m.playerBlack.name)
            if (m.result == 'W') {
                scoreWhite.score += 1
                scoreWhite.winsWhite += 1
            }
            if (m.result == 'D') {
                scoreWhite.score += 0.5
                scoreBlack.score += 0.5
                scoreWhite.draws += 1
                scoreBlack.draws += 1
            }
            if (m.result == 'L') {
                scoreBlack.score += 1
                scoreBlack.winsBlack += 1
            }
        }

        scores.sort((a, b) => b.winsBlack - a.winsBlack)
        scores.sort((a, b) => b.score - a.score)
        return scores
    }

    static possibleMatches = {
        2: [[1, 2]],
        3: [[1, 2], [1, 3], [2, 3]],
        4: [[1, 2], [3, 4], [1, 3], [2, 4], [4, 1], [2, 3]],
        5: [[1, 2], [3, 4], [1, 3], [2, 5], [5, 1], [2, 4], [4, 1], [5, 3], [3, 2], [4, 5]]
    }
}