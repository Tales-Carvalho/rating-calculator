class FormMatches {
    constructor (
        randomSeedInputId,
        butGenerateId,
        tourneyMatchesDivId,
        tourneyStandingsDivId,
        formPlayers
    ) {
        this.randomSeedInput = document.getElementById(randomSeedInputId)
        this.tourneyMatchesDivId = tourneyMatchesDivId
        this.tourneyMatchesDiv = document.getElementById(tourneyMatchesDivId)
        this.tourneyStandingsDiv = document.getElementById(tourneyStandingsDivId)
        this.butGenerate = document.getElementById(butGenerateId)
        this.formPlayers = formPlayers
        this.butGenerate.addEventListener('click', this.generateMatches)
    }

    resultSelectTemplate = (matchId) => {
        const selectElement = document.createElement('select')
        selectElement.name = 'resultMatch' + matchId
        selectElement.className = 'form-control'
        selectElement.addEventListener('change', this.generateStandings)
        for (let key in FormMatches.possibleResults) {
            selectElement.innerHTML += '<option value="' + key +'">'
                + FormMatches.possibleResults[key] + '</option>'
        }
        return selectElement
    }
    
    generateMatches = () => {
        this.players = this.formPlayers.getPlayersList()
        this.matches = FormMatches.possibleMatches[this.players.length]
        // TODO: this shuffle does not seem reliable. Investigate.
        shuffle(this.players, this.randomSeedInput.value)
        const h2 = document.createElement('h2')
        h2.innerHTML = 'Matches'
        const table = document.createElement('table')
        table.className = 'table table-hover'
        const thead = table.createTHead()
        thead.innerHTML = '<tr><th>Match ID</th><th>White Player</th><th>Result</th>\
            <th>Black Player</th></tr>'
        const tbody = table.createTBody()
        let id = 1
        for (const match of this.matches) {
            const row = tbody.insertRow()
            row.insertCell().innerText = id
            row.insertCell().innerText = this.players[match[0]-1]
            row.insertCell().appendChild(this.resultSelectTemplate(id++))
            row.insertCell().innerText = this.players[match[1]-1]
        }
        this.tourneyMatchesDiv.innerHTML = ''
        this.tourneyMatchesDiv.appendChild(h2)
        this.tourneyMatchesDiv.appendChild(table)
        this.generateStandings()
    }

    getResultsList = () => {
        const selectElements = this.tourneyMatchesDiv.querySelectorAll('select')
        let resultsList = []
        for (const selectElement of selectElements) {
            resultsList.push(selectElement.value)
        }
        return resultsList
    }

    generateStandings = () => {
        const scores = []
        for (let i = 0; i < this.players.length; i++) {
            scores.push({
                playerId: i,
                score: 0,
                winsBlack: 0,
                winsWhite: 0,
                draws: 0
            })
        }

        const results = this.getResultsList()
        for (let i = 0; i < this.matches.length; i++) {
            const whitePlayerId = this.matches[i][0]-1
            const blackPlayerId = this.matches[i][1]-1
            const result = results[i]
            if (result == 'W') {
                scores[whitePlayerId].score += 1
                scores[whitePlayerId].winsWhite += 1
            }
            if (result == 'D') {
                scores[whitePlayerId].score += 0.5
                scores[blackPlayerId].score += 0.5
                scores[whitePlayerId].draws += 1
                scores[blackPlayerId].draws += 1
            }
            if (result == 'L') {
                scores[blackPlayerId].score += 1
                scores[blackPlayerId].winsBlack += 1
            }
        }

        scores.sort((a, b) => b.winsBlack - a.winsBlack)
        scores.sort((a, b) => b.score - a.score)

        const h2 = document.createElement('h2')
        h2.innerHTML = 'Standings'
        const table = document.createElement('table')
        table.className = 'table table-hover'
        const thead = table.createTHead()
        thead.innerHTML = '<tr><th>Ranking</th><th>Player Name</th><th>Score</th>\
            <th>Victories as Black</th><th>Victories as White</th><th>Draws</th></tr>'
        const tbody = table.createTBody()
        let rank = 1
        for (const score of scores) {
            const row = tbody.insertRow()
            row.insertCell().innerText = rank++
            row.insertCell().innerText = this.players[score.playerId]
            row.insertCell().innerText = score.score
            row.insertCell().innerText = score.winsBlack
            row.insertCell().innerText = score.winsWhite
            row.insertCell().innerText = score.draws
        }
        this.tourneyStandingsDiv.innerHTML = ''
        this.tourneyStandingsDiv.appendChild(h2)
        this.tourneyStandingsDiv.appendChild(table)
    }

    static possibleMatches = {
        2: [[1, 2]],
        3: [[1, 2], [1, 3], [2, 3]],
        4: [[1, 2], [3, 4], [1, 3], [2, 4], [4, 1], [2, 3]],
        5: [[1, 2], [3, 4], [1, 3], [2, 5], [5, 1], [2, 4], [4, 1], [5, 3], [3, 2], [4, 5]]
    }
    
    static possibleResults = {
        '0': 'No result',
        'W': '1-0',
        'D': '0.5-0.5',
        'L': '0-1'
    }
}
