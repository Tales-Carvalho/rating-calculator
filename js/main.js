let players = []
let tourneys = []

const ratingsChart = new Chart(document.getElementById('ratingsChart'), {
    type: 'line',
    data: { datasets: [] },
    options: {
        maintainAspectRatio: false,
        legend: { display: true },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                }
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Ratings'
                }
            }
        },
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'rating'
        }
    }
})

document.getElementById('importJsonData').addEventListener('click', ev => {
    Utils.importJson(data => {
        players = []
        tourneys = []
        for (const p of data.Players) {
            players.push(new Player(p.Name, p.BirthDate, p.City, p.Province, p.Country))
        }
        for (const t of data.Tourneys) {
            const matches = []
            for (const m of t.Matches) {
                matches.push(new Match(players[m.PlayerWhite], players[m.PlayerBlack], m.Result))
            }
            tourneys.push(new Tourney(players, 1, new Date(t.Date), matches))
        }
    })
})

document.getElementById('newTourney').addEventListener('click', ev => {
    const fPlayers = new FormPlayers('tourneyPlayers', 'tourneyAddPlayer',
        'tourneyRemovePlayer', players)
    const fMatches = new FormMatches('randomSeedInput', 'generateMatches', 
        'tourneyMatches', 'tourneyStandings', fPlayers)
    document.getElementById('newTourney').disabled = true
})

const eloVariation = eloDiff => 1 / (1 + Math.exp(-eloDiff * Math.log(10) / 400 ))

document.getElementById('calculateRatings').addEventListener('click', ev => {
    const k = 40

    for (const p of players) {
        p.ratingsHistory = []
        p.ratingsHistory.push({date: new Date('2017-12-01'), rating: p.rating})
    }

    for (const t of tourneys) {
        for (const m of t.matches) {
            const eloVar = eloVariation(m.playerWhite.rating - m.playerBlack.rating)
            m.playerWhite.rating += k * (Match.numberResults[m.result] - eloVar)
            m.playerBlack.rating -= k * (Match.numberResults[m.result] - eloVar)
        }
        for (const p of players) {
            p.ratingsHistory.push({date: t.date, rating: p.rating})
        }
    }

    ratingsChart.data.datasets = []
    
    const colors = palette('tol', players.length).map(hex => '#' + hex)

    for (let i in players) {
        ratingsChart.data.datasets.push({
            data: players[i].ratingsHistory,
            label: players[i].name,
            backgroundColor: colors[i],
            borderColor: colors[i],
            tension: 0.3
        })
    }

    ratingsChart.update()

})
