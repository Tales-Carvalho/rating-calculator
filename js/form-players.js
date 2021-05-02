class FormPlayers {
    constructor (
        playersFormId,
        butAddId,
        butRemoveId,
        players,
        numPlayers = 4,
        minPlayers = 2,
        maxPlayers = 5
    ) {
        this.playersForm = document.getElementById(playersFormId)
        this.butAdd = document.getElementById(butAddId)
        this.butRemove = document.getElementById(butRemoveId)
        this.numPlayers = numPlayers
        this.minPlayers = minPlayers
        this.maxPlayers = maxPlayers
        this.players = players
        this.butAdd.addEventListener('click', this.addPlayer)
        this.butRemove.addEventListener('click', this.removePlayer)
        for (let i = 1; i < this.numPlayers + 1; i++) {
            this.playersForm.appendChild(this.playerInput(i))
        }
    }

    playerInput = (id) => {
        const label = document.createElement('label')
        label.setAttribute('for', 'playerNameInput' + id)
        label.innerHTML = 'Player ' + id
        const select = document.createElement('select')
        select.name = 'playerNameInput' + id
        select.className = 'form-control'
        select.innerHTML = '<option value="">Select Player</option>'
        for (let playerId in this.players) {
            const player = this.players[playerId]
            select.innerHTML += '<option value=' + id + '>' + player['name'] + '</option>'
        }
        const p = document.createElement('p')
        p.appendChild(label)
        p.appendChild(select)
        return p
    }
    
    addPlayer = () => {
        this.playersForm.appendChild(this.playerInput((this.numPlayers++) + 1))
        this.butRemove.disabled = false
        if (this.numPlayers == this.maxPlayers) {
            this.butAdd.disabled = true
        }
    }
    
    removePlayer = () => {
        this.playersForm.removeChild(this.playersForm.lastElementChild)
        this.numPlayers--
        this.butAdd.disabled = false
        if (this.numPlayers == this.minPlayers) {
            this.butRemove.disabled = true
        }
    }
    
    getPlayersList = () => {
        let playersList = []
        for (const input of this.playersForm.elements) {
            playersList.push(this.players[input.value - 1])
        }
        return playersList
    }
}
