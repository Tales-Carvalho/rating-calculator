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
        selectElement.matchId = matchId
        selectElement.className = 'form-control'
        selectElement.addEventListener('change', (evt) => {
            const id = evt.currentTarget.matchId
            this.tourney.matches[id].result = evt.currentTarget.value
            this.generateStandings()
        })
        for (let key in Match.possibleResults) {
            selectElement.innerHTML += '<option value="' + key +'">'
                + Match.possibleResults[key] + '</option>'
        }
        return selectElement
    }
    
    generateMatches = () => {
        this.tourney = new Tourney(this.formPlayers.getPlayersList(), this.randomSeedInput.value)
        const h2 = document.createElement('h2')
        h2.innerHTML = 'Matches'
        const table = document.createElement('table')
        table.className = 'table table-hover'
        const thead = table.createTHead()
        thead.innerHTML = '<tr><th>Match Number</th><th>White Player</th><th>Result</th>\
            <th>Black Player</th></tr>'
        const tbody = table.createTBody()
        for (let id in this.tourney.matches) {
            const match = this.tourney.matches[id]
            const row = tbody.insertRow()
            row.insertCell().innerText = Number(id) + 1
            row.insertCell().innerText = match.playerWhite.name
            row.insertCell().appendChild(this.resultSelectTemplate(id))
            row.insertCell().innerText = match.playerBlack.name
        }
        this.tourneyMatchesDiv.innerHTML = ''
        this.tourneyMatchesDiv.appendChild(h2)
        this.tourneyMatchesDiv.appendChild(table)
        this.generateStandings()
    }

    generateStandings = () => {
        const scores = this.tourney.getStandings()

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
            row.insertCell().innerText = score.playerName
            row.insertCell().innerText = score.score
            row.insertCell().innerText = score.winsBlack
            row.insertCell().innerText = score.winsWhite
            row.insertCell().innerText = score.draws
        }
        this.tourneyStandingsDiv.innerHTML = ''
        this.tourneyStandingsDiv.appendChild(h2)
        this.tourneyStandingsDiv.appendChild(table)
    }
}
