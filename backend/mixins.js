export default {
    methods: {
        saveFile(data, name){
            const blobUrl = window.URL.createObjectURL(new Blob([JSON.stringify(data, null, 4)]))
            const a = document.createElement('a')
            a.style.display = 'none'
            a.download = name
            a.href = blobUrl
            a.click()
        }
    }
}