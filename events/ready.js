const client = require('../index.js')

client.on('ready', async () => {
    console.log("✅ - Logado em " + client.user.username + " com sucesso!")
    let idoi = 'online' //idle, dnd, online, invisible
    let atividade = `PLAYING` //WATCHING, LISTENING, PLAYING, STREAMING
    let tempo = 5000 // tempo de troca em milisegundos
    let activities = [`Altere isso em events/ready.js`];

    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: atividade }), tempo);
    client.user.setStatus(`${idoi[Math.floor(Math.random() * idoi.length)]}`)
})
