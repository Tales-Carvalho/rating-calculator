class FormPlayers {
    constructor (
        playersFormId,
        butAddId,
        butRemoveId,
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
        this.butAdd.addEventListener('click', this.addPlayer)
        this.butRemove.addEventListener('click', this.removePlayer)
        for (let i = 1; i < this.numPlayers + 1; i++) {
            const inputElement = document.createElement('p')
            inputElement.innerHTML = this.inputTemplate(i)
            this.playersForm.appendChild(inputElement)
        }
    }

    inputTemplate = (id) => '<label for="playerNameInput' + id + '">Player ' + id + '</label>\
        <input type="text" class="playerNameInput form-control" id="playerNameInput' + id + '">'
    
    addPlayer = () => {
        const inputElement = document.createElement('p')
        inputElement.innerHTML = this.inputTemplate((this.numPlayers++) + 1)
        this.playersForm.appendChild(inputElement)
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
            playersList.push(input.value)
        }
        return playersList
    }
}
