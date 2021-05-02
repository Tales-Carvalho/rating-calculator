class Utils {
    // Custom RNG function: generates a "random" value 0 <= num < 1
    static randomGenerator = (seed) => ((seed * 5486230734 + 6908969830) % 9853205067) / 9853205067
    
    // Custom shuffle function based on seed
    static shuffle = (array, seed) => array.sort(() => (seed = Utils.randomGenerator(seed) > .5) ? 1 : -1)

    // Imports a JSON file
    static importJson = (callbackFn) => {
        const inputFile = document.createElement("input")
        inputFile.type = "file"
        inputFile.addEventListener("change", (evt) => {
            const file = evt.target.files[0]
            const reader = new FileReader()
            reader.onload = res => callbackFn(JSON.parse(res.target.result))
            reader.readAsText(file)
        }, false)
        inputFile.click()
    }

    // Exports an object data to a JSON file
    static exportJson = (data) => {
        const dataStr = JSON.stringify(data)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = 'data.json'
        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }
}
