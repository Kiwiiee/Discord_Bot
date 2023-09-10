
const { Client, GatewayIntentBits ,ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder} = require("discord.js");



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent , GatewayIntentBits.GuildMembers] });

let nomes_usuarios = []

client.on("ready", async (client) => {
  console.log(`Logado como ${client.user.tag}!`);


  const guild = await client.guilds.fetch("1007400774097195098")

  console.log("fetching users");
  let res = await guild.members.fetch();
  res.forEach((member) => {
      
      nomes_usuarios.push(member.user.username)
      console.log(nomes_usuarios);

  });
})


let usuarios = {}

// client.on('messageCreate', async (message) => {
//   const mensagem = message.content; 
//   const conteudo = mensagem.toLowerCase();
//   const comando = conteudo.split(" ")
//   try{    
//     if (comando[0] == "!apostar" && comando[1] == "info"){
//     if(comando[2] == "gen1"){
//     message.channel.send("Aqui estão os pokemons que você pode apostar:")
//     message.channel.send("Gen 1:")
//     message.channel.send("Arcanine" ,{ files: [ 'Gen1/arcanine.png' ] });
//     message.channel.send("Butterfree" ,{ files: [ 'Gen1/butterfree.png' ] });
//     message.channel.send("Doduo" , { files: [ 'Gen1/doduo.png' ] });
//     message.channel.send("Pidgeot" ,{ files: ['Gen1/pidgeot.png' ] });
//     message.channel.send("Slowpoke" ,{ files: ['Gen1/slowpoke.png' ] });

//     }else if(comando[2] == "gen4"){
//     message.channel.send("Aqui estão os pokemons que você pode apostar:")
//     message.channel.send("Gen 4:")
//     message.channel.send({ files: [{ attachment: 'Gen4/Bibarel.png' }] });
//     message.channel.send("Bibarel")
//     message.channel.send({ files: [{ attachment: 'Gen4/Lucario.png' }] });
//     message.channel.send("Lucario")
//     message.channel.send({ files: [{ attachment: 'Gen4/Mothim.png' }] });
//     message.channel.send("Mothim")
//     message.channel.send({ files: [{ attachment: 'Gen4/Skuntank.png' }] });
//     message.channel.send("Skuntank")
//     message.channel.send({ files: [{ attachment: 'Gen4/Staraptor.png' }] });
//     message.channel.send("Staraptor")
//     }else if(comando[2] == "gen7"){
//     message.channel.send("Aqui estão os pokemons que você pode apostar:")
//     message.channel.send("Gen 7:")
//     message.channel.send({ files: [{ attachment: 'Gen7/Drampa.png' }] });
//     message.channel.send("Drampa")
//     message.channel.send({ files: [{ attachment: 'Gen7/Lycanroc.png' }] });
//     message.channel.send("Lycanroc")
//     message.channel.send({ files: [{ attachment: 'Gen7/Mudbray.png' }] });
//     message.channel.send("Mudbray")
//     message.channel.send({ files: [{ attachment: 'Gen7/Ribombee.png' }] });
//     message.channel.send("Ribombee")
//     message.channel.send({ files: [{ attachment: 'Gen7/Trumbeak.png' }] });
//     message.channel.send("Trumbeak")
//     }else{
//       throw new Error("")}}}catch(e){
//       message.channel.send("Informe a gen")
//     }
// })



client.on('messageCreate',  (message) => {

  if (message.mentions.has(client.user.id)) {
    message.channel.send('Olá! Aqui estão meus comandos: \n !conta \n !transferir [valor] [usuario] \n !apostar [valor] [gen] [pokemon] \n !apostar info [gen]\n !retirar [valor] \n !depositar [valor]');
    setInterval(function() {
      message.channel.send("uepa")  
    },190000);

  }
  
  const prefixo = "!"
  const trabalhar = "trabalhar"
  const conta = "conta"
  const mensagem = message.content; 
  const conteudo = mensagem.toLowerCase();
  const autor = message.author.username; 
  const autorID = message.author.id
  let dinheiro = 0
  let poupança = 0

  const comando = conteudo.split(" ")
  console.log(autor , autorID, conteudo)
  // const guild =  client.guilds.fetch("1007400774097195098")
  const data_entrada = message.member.joinedAt

  class CriarUsuario {
    constructor(nome , ID , dinheiro ,  poupança , data_entrada , cooldown_trabalhar){
      this.nome = nome;
      this.ID = ID; 
      this.dinheiro = 0;
      this.data_entrada = data_entrada;
      this.poupança = poupança;
      this.cooldown_trabalhar = false
      this.cooldown = 0
    }
  
  
    trabalhar(){
      // const current_time = Date.now();
      // const cooldown = 120000;



  
      if(this.cooldown_trabalhar == false ){

        console.log(this.nome)
        message.channel.send("trabalhando...")
        .then(() => {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
              }              
    
            let dinheiro_possibilidades = [15,20,50,90]
    
            let dinheiro_ganhado = dinheiro_possibilidades[getRandomInt(4)]
    
            this.dinheiro =  this.dinheiro + dinheiro_ganhado
    
            this.cooldown_trabalhar = true
            this.cooldown = 90000

            let usuario = this.nome

            setTimeout(() => {
              usuarios[usuario].cooldown_trabalhar = false
            } ,90000);
  
       
            setInterval(function() {
              usuarios[usuario].cooldown -= 1000 
              },1000);
  
            setTimeout(() =>  message.channel.send(`Você trabalhou e ganhou ${dinheiro_ganhado} reais`), 6000)
  
 
    
            
      })
        


      }else{ 
      // if(current_time < expiration_time){
      // const time_left = (expiration_time - current_time) / 1000;



      return message.reply(`Por favor espere ${Math.floor(this.cooldown/1000)} segundos para trabalhar`);
  }
  
  }
  
    conta(){
      message.channel.send(`Aqui estão seus dados: \n Nome: ${this.nome} \n ID: ${this.ID} \n Dinheiro: ${this.dinheiro} \n Poupança: ${this.poupança} \n Data de entrada: ${this.data_entrada}`)
    }
  
    transferir(valor , destinatario){

      let user = message.author.username

      // let dinheiro = usuarios[user].dinheiro

      console.log( this.dinheiro, usuarios[user].dinheiro)
      if (valor > this.dinheiro) {
        message.channel.send("Você não tem dinheiro o suficiente!")
      }
      let keys_usuarios = Object.keys(usuarios)

      if(keys_usuarios.includes(destinatario)){
        usuarios[user].dinheiro = usuarios[user].dinheiro - valor
        usuarios[destinatario].dinheiro = parseFloat(usuarios[destinatario].dinheiro) + parseFloat(valor)
        message.channel.send(`Você transferiu ${valor} reais ao usuario ${destinatario}`)
      }else{
        message.channel.send("Este usuário não existe!")
      }
    }
  
  
    depositar_poupança(valor){
      // let dinheiro = this.dinheiro
      
      if (valor >  this.dinheiro) {
        message.channel.send("Você não tem dinheiro o suficiente!")
      }else{
        let user = message.author.username
        this.dinheiro = this.dinheiro -  parseFloat(valor)
        this.poupança = parseFloat(this.poupança) + parseFloat(valor)
        console.log(typeof  this.poupança,typeof valor)

            var value =  parseFloat((((usuarios[this.nome].poupança) * 5)/100)).toFixed(2)
            setInterval(function() {
              usuarios[user].poupança = usuarios[user].poupança + value;
            },9000);

        message.channel.send(`Foi depositado ${valor} a sua poupança`)
      }
  
    }
  
  
    retirar_poupança(valor){
      console.log(valor , this.poupança)
      if (valor >  this.poupança) {
        message.channel.send("Você não tem dinheiro o suficiente!")
      }else{
        this.dinheiro = parseFloat(this.dinheiro) + parseFloat(valor)
        this.poupança = parseFloat(this.poupança) - parseFloat(valor)
        message.channel.send(`Foi retirado ${valor} de sua poupança`)
      }
  
    }
  
  }
  
  class Gen1 extends CriarUsuario{
    constructor(nome , ID , dinheiro ,  poupança , data_entrada){
      super(nome , ID , dinheiro ,  poupança , data_entrada)
    }
  
    apostar(valor , pokemon){
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }      
  
    let usuario = message.author.username


    
    const avestruz = [1,2,3,4]
    const aguia = [5,6,7,8]
    const burro = [9,10,11,12]
    const borboleta = [13,14,15,16]
    const cachorro = [17,18,19,20]
  
  
    let numero_sorteado = getRandomInt(20) + 1
    let animal_sorteado 
  
    if (avestruz.includes(numero_sorteado)){
      message.channel.send("Avestruz ganhou!")
      animal_sorteado = "doduo"
    }else if(aguia.includes(numero_sorteado)){
      message.channel.send("Águia ganhou!")
      animal_sorteado = "pidgeot"
    }else if(burro.includes(numero_sorteado)){
      message.channel.send("Burro ganhou!")
      animal_sorteado = "slowpoke"
    }else if(borboleta.includes(numero_sorteado)){
      message.channel.send("Borboleta ganhou!")
      animal_sorteado = "butterfree"
    }else{
      message.channel.send("Cachorro ganhou!")
      animal_sorteado = "arcanine"
    }
  
  
    if(animal_sorteado == pokemon){
      message.channel.send("Parabéns, você ganhou!!")
      message.channel.send(`Foi adicionado ${valor*2} na sua conta`)
      usuarios[usuario].dinheiro = parseFloat(usuarios[usuario].dinheiro ) + parseFloat(valor*2)
      
    }else{
      try{
      usuarios[usuario].dinheiro -= valor
      message.channel.send(`Que pena, você perdeu ${valor} reais... Não se desanime, uma hora você vai conseguir!`)
      }catch(e){
        message.channel.send(`putes`)
      }
      
      
    }
  
    }
    
  }
  class Gen4 extends CriarUsuario{
    constructor(nome , ID , dinheiro ,  poupança , data_entrada){
      super(nome , ID , dinheiro ,  poupança , data_entrada)
    }
    
  
    apostar(valor , pokemon){
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }      

      let usuario = message.author.username
    
    
    
    const avestruz = [1,2,3,4]
    const aguia = [5,6,7,8]
    const burro = [9,10,11,12]
    const borboleta = [13,14,15,16]
    const cachorro = [17,18,19,20]
  
  
    let numero_sorteado = getRandomInt(20) + 1
    let animal_sorteado = ""
  
    if (avestruz.includes(numero_sorteado)){
      message.channel.send("Avestruz ganhou!")
      animal_sorteado = "skuntank"
    }else if(aguia.includes(numero_sorteado)){
      message.channel.send("Águia ganhou!")
      animal_sorteado = "staraptor"
    }else if(burro.includes(numero_sorteado)){
      message.channel.send("Burro ganhou!")
      animal_sorteado = "bibarel"
    }else if(borboleta.includes(numero_sorteado)){
      message.channel.send("Borboleta ganhou!")
      animal_sorteado = "mothim"
    }else if(cachorro.includes(numero_sorteado)){
      message.channel.send("Cachorro ganhou!")
      animal_sorteado = "lucario"
    }
  
  
    if(animal_sorteado == pokemon){
      message.channel.send("Parabéns, você ganhou!!")
      message.channel.send(`Foi adicionado ${valor*2} na sua conta`)
      usuarios[usuario].dinheiro += (valor*2)
  
    }else{
      message.channel.send(`Que pena, você perdeu ${valor} reais... Não se desanime, uma hora você vai conseguir!`)
      usuarios[usuario].dinheiro -= valor
    }
  
    }
    
  }
  class Gen7 extends CriarUsuario{
    constructor(nome , ID , dinheiro ,  poupança , data_entrada){
      super(nome , ID , dinheiro ,  poupança , data_entrada)
    }
  
    apostar(valor , pokemon){
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }      
    


    let usuario = message.author.username
    
    
    const avestruz = [1,2,3,4]
    const aguia = [5,6,7,8]
    const burro = [9,10,11,12]
    const borboleta = [13,14,15,16]
    const cachorro = [17,18,19,20]
  
  
    let numero_sorteado = getRandomInt(20) + 1
    let animal_sorteado = ""
  
    if (avestruz.includes(numero_sorteado)){
      message.channel.send("Avestruz ganhou!")
      animal_sorteado = "drampa"
    }else if(aguia.includes(numero_sorteado)){
      message.channel.send("Águia ganhou!")
      animal_sorteado = "trumbeak"
    }else if(burro.includes(numero_sorteado)){
      message.channel.send("Burro ganhou!")
      animal_sorteado = "mudbray"
    }else if(borboleta.includes(numero_sorteado)){
      message.channel.send("Borboleta ganhou!")
      animal_sorteado = "ribombee"
    }else if(cachorro.includes(numero_sorteado)){
      message.channel.send("Cachorro ganhou!")
      animal_sorteado = "lycanroc"
    }
  
  
    if(animal_sorteado == pokemon){
      message.channel.send("Parabéns, você ganhou!!")
      message.channel.send(`Foi adicionado ${valor*2} na sua conta`)
      usuarios[usuario].dinheiro = dinheiro + (valor*2)
  
    }else{
      message.channel.send(`Que pena, você perdeu ${valor} reais... Não se desanime, uma hora você vai conseguir!`)
      usuarios[usuario].dinheiro = dinheiro - valor
    }
  
    }
    
  }

    let usuario_criado = new CriarUsuario(autor , autorID, dinheiro, poupança, data_entrada)
    let gen1_u = new Gen1(autor , autorID, dinheiro, poupança, data_entrada)
    let gen4_u = new Gen4(autor , autorID, dinheiro, poupança, data_entrada)
    let gen7_u = new Gen7(autor , autorID, dinheiro, poupança, data_entrada)

    try {
      let keys_usuarios = Object.keys(usuarios)
      let tam = keys_usuarios.length

      if(tam == 0){
        throw new Error("erro")
      }

      let tem_usuario = false
      keys_usuarios.forEach((usuario) =>{
        console.log(usuario ,keys_usuarios)
      if(usuario == usuario_criado.nome){
        tem_usuario = true
        console.log("Usuário já existe")
        usuario_criado = usuarios[usuario];

        
        
      }})
      
      if(tem_usuario == false){
          throw new Error("erro")
      }
    
      
  
      
    }catch(e){
      let user = message.author;
      nomes_usuarios.forEach((usuario) => {
        if(usuario === usuario_criado.nome && !(user.bot)){
          usuarios[usuario] = usuario_criado
          console.log(e , "usuario criado" ,usuarios , usuario , usuario_criado.nome)

        }
      })
      
    }

    first = conteudo[0]

    if (first  == `${prefixo}`){

      if(conteudo === `${prefixo}${trabalhar}`) {

        usuario_criado.trabalhar()
 
      } else if(conteudo === `${prefixo}${conta}`) {
            usuario_criado.conta()
          
    }else if(comando[0] == "!transferir") {
      try{
        console.log(comando[1] , comando[2])
      if (!(comando[2] == undefined)){
        usuario_criado.transferir(comando[1] , comando[2])
      }else {
        throw Error("")
      }}catch (e){
        console.log(e)
        message.channel.send("Informe o usuario e o valor")}
    }

    else if(comando[0] === "!apostar") {
      const gen1 = ["arcanine", "butterfree" , "doduo" , "pidgeot" , "slowpoke"]
      const gen4 = ["bibarel", "lucario" , "mothim" , "stuntank" , "staraptor"]
      const gen7 = ["drampa", "lycanroc" , "mudbray" , "ribombee" , "trumbeak"]
      let usuario = message.author.username
      try{
      if(!(comando[1] > usuarios[usuario].dinheiro)){
        
      if(comando[1] == "info"){
        try{

        
        if (comando[2] == "gen1"){

        message.channel.send("Aqui estão os pokemons que você pode apostar:")
        message.channel.send("Gen 1:")
        message.channel.send("Arcanine \n Butterfree \n Doduo \n Pidgeot \n Slowpoke") 
        message.channel.send({files: [{ attachment: 'Gen1/arcanine.png' }] });
        message.channel.send({ files: [{attachment: 'Gen1/butterfree.png' }] });
        message.channel.send({ files: [{attachment:  'Gen1/doduo.png' }] });
        message.channel.send({ files: [{attachment: 'Gen1/pidgeot.png' }] });
        message.channel.send({ files: [{attachment: 'Gen1/slowpoke.png' }] });

        }else if(comando[2] == "gen4"){
        message.channel.send("Aqui estão os pokemons que você pode apostar:")
        message.channel.send("Gen 4:")
        message.channel.send("Bibarel \n Lucario \n Mothim \n Skuntank \n Staraptor") 
        message.channel.send({ files: [{ attachment: 'Gen4/Bibarel.png' }] });

        message.channel.send({ files: [{ attachment: 'Gen4/Lucario.png' }] });

        message.channel.send({ files: [{ attachment: 'Gen4/Mothim.png' }] });

        message.channel.send({ files: [{ attachment: 'Gen4/Skuntank.png' }] });

        message.channel.send({ files: [{ attachment: 'Gen4/Staraptor.png' }] });

        }else if(comando[2] == "gen7"){
        message.channel.send("Aqui estão os pokemons que você pode apostar:")
        message.channel.send("Gen 7:")
        message.channel.send("Drampa \n Lycanroc \n Mudbray \n Ribombee \n Trumbeak")
        message.channel.send({ files: [{ attachment: 'Gen7/Drampa.png' }] });

        message.channel.send({ files: [{ attachment: 'Gen7/Lycanroc.png' }] });

        message.channel.send({ files: [{ attachment: 'Gen7/Mudbray.png' }] });
   
        message.channel.send({ files: [{ attachment: 'Gen7/Ribombee.png' }] });
     
        message.channel.send({ files: [{ attachment: 'Gen7/Trumbeak.png' }] });
    
        }else{
          throw new Error("")}}catch(e){
          message.channel.send("Informe a gen")
        }
      }else{

      try{

      if (comando[2] === "gen1"){
        if(gen1.includes(comando[3])){
        gen1_u.apostar(comando[1] , comando[3])
      }else{
        message.channel.send("Este pokemon não está disponivel para apostar")
      }
      }else if(comando[2] === "gen4"){
        if(gen4.includes(comando[3])){
          gen4_u.apostar(comando[1] , comando[3])
        }else{
          message.channel.send("Este pokemon não está disponivel para apostar")
        }
      }else if(comando[2] === "gen7"){
        if(gen7.includes(comando[3])){
          gen7_u.apostar(comando[1] , comando[3])
        }else{
          message.channel.send("Este pokemon não está disponivel para apostar")
        }
      }else{
        throw new Error("erro")}}catch(e){
          console.log(e)
        message.channel.send("Informe a gen (gen1, gen4 ou gen7) e o valor válidos")
      }
    }

  }else{
    throw new Error("")
  }
}catch(e){
    message.channel.send("Você não tem dinheiro o suficiente!")
}
    
    }else if(comando[0] == "!retirar"){
      try{
      if(!(comando[1] == undefined)){
      usuario_criado.retirar_poupança(comando[1])
    }else{
      throw new Error(" ")
    }
      }catch(e){
        message.channel.send("informe um valor")
      }

    }else if(comando[0] == "!depositar"){
      try{
        if(!(comando[1] == undefined)){
      usuario_criado.depositar_poupança(comando[1])
    }else{
      throw new Error(" ")
    }
      }catch(e){
        console.log(e)
        message.channel.send("informe um valor")
      }

    }else if(conteudo == "!matar bot"){
      message.channel.send("NAAAAAAAAAAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
      .then(function(){
        throw new Error("hihi")}
      )
      

    }else{
       message.channel.send("Este comando não existe!")
}


    }


});














client.login("MTE0ODA1MDcyNzgyMjk2Mjc5OA.GJMGMJ.i7rIlm6lID1CIWbua2iCkZJn3ZLIK0ku-ZKgC4");




// client.on("messageDelete", msg => {
//   msg.channel.send("Stop deleting messages")
// })





