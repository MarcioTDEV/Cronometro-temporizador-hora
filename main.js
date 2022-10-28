// let display = document.querySelector("#display")
// let iniciar = document.querySelector("#Iniciar")
// let pausar = document.querySelector("#Pausar")
// let zerar = document.querySelector("#Zerar")
// let mecanismo;

// function timer(){
//     let data = new Date()
//     display.innerHTML = data.getHours() + ":"+data.getMinutes()+":"+data.getSeconds()
// }
// function addSegundos(tempo){
//     let x = (tempo < 10 ? "0"+tempo:tempo)
//     return x
// }
// let x = 1000*60*60*3


// iniciar.addEventListener("click",()=>{
//     clearInterval(mecanismo)
//     mecanismo = setInterval(()=>{
//         let data = new Date(x)
//         display.innerHTML = addSegundos(data.getHours()) + ":"+addSegundos(data.getMinutes())+":"+addSegundos(data.getSeconds())
//         console.log(data)
//         x +=1000
//     },1000);
// })

// pausar.addEventListener("click",()=>{
//     clearInterval(mecanismo)
// })

// zerar.addEventListener("click",()=>{
//     clearInterval(mecanismo)
//     x = 1000*60*60*3
//     display.innerHTML = "00:00:00"
// })



let relogio = setInterval(() => {
    const relogioHora = document.querySelector("[data-relogio='hora']")
    const relogioMinuto = document.querySelector("[data-relogio='minuto']")
    const relogioSegundo = document.querySelector("[data-relogio='segundo']")

    let data = new Date()

    relogioHora.innerHTML = (data.getHours() < 10) ? "0" + data.getHours() : data.getHours()
    relogioMinuto.innerHTML = (data.getMinutes() < 10) ? "0" + data.getMinutes() : data.getMinutes()
    relogioSegundo.innerHTML = (data.getSeconds() < 10) ? "0" + data.getSeconds() : data.getSeconds()
}, 1000)



const cronometroHora = document.querySelector("[data-cronometro='hora']")
const cronometroMinuto = document.querySelector("[data-cronometro='minuto']")
const cronometroSegundo = document.querySelector("[data-cronometro='segundo']")

const cronometroIniciar = document.querySelector("[data-cronometro='iniciar']")
const cronometroPausar = document.querySelector("[data-cronometro='pausar']")
const cronometroZerar = document.querySelector("[data-cronometro='zerar']")

let cronometro;
let cSegundo = 00
let cMinuto = 00
let cHora = 00
cronometroIniciar.addEventListener("click", () => {
    clearInterval(cronometro)
    cronometro = setInterval(() => {
        cSegundo++
        if (cSegundo == 59) {
            cMinuto++
            cSegundo = 0
        }
        if (cMinuto == 59) {
            cHora++
            cMinuto = 0
        }
        cronometroHora.innerHTML = ((cHora < 10) ? "0" + cHora : cHora)
        cronometroMinuto.innerHTML = ((cMinuto < 10) ? "0" + cMinuto : cMinuto)
        cronometroSegundo.innerHTML = ((cSegundo < 10) ? "0" + cSegundo : cSegundo)
    }, 1000)
})
cronometroPausar.addEventListener("click", () => {
    clearInterval(cronometro)
})

cronometroZerar.addEventListener("click", () => {
    clearInterval(cronometro)
    cSegundo = 00
    cMinuto = 00
    cHora = 00

    cronometroHora.innerHTML = "00"
    cronometroMinuto.innerHTML = "00"
    cronometroSegundo.innerHTML = "00"
})

//botoes temp
const iniciar_temp = document.querySelector("[data-temp='iniciar']")
const pausar_temp = document.querySelector("[data-temp='pausar']")
const zerar_temp = document.querySelector("[data-temp='zerar']")

//item display temp
const hora_disp_temp = document.querySelector("[data-temp='hora']")
const min_disp_temp = document.querySelector("[data-temp='minuto']")
const seg_disp_temp = document.querySelector("[data-temp='segundo']")

//displays temp
const display_input = document.querySelector(".display-temp-input")
const display_clock = document.querySelector(".display-temp-clock")

//input temp
const input_hora = document.querySelector("[data-input='hora']")
const input_minuto = document.querySelector("[data-input='minuto']")
const input_segundo = document.querySelector("[data-input='segundo']")
let temporizador;
/*ao clickar no iniciar, se true, mudar display, valores devem ser passados para novo display,
botao iniciar desabilitado */

iniciar_temp.addEventListener("click", () => {
    if (input_segundo.value > 0 || input_minuto.value > 0 || input_hora.value > 0) {
        display_input.setAttribute("class", "none")
        display_clock.removeAttribute("class", "none")
        display_clock.setAttribute("class", "display-temp-clock")

        iniciar_temp.disabled = true
        pausar_temp.disabled = false
        zerar_temp.disabled = false

        let temp_h = input_hora.value
        let temp_m = input_minuto.value
        let temp_s = input_segundo.value

        temporizador = setInterval(() => {

            hora_disp_temp.innerHTML = (temp_h < 10) ? "0" + temp_h : temp_h
            min_disp_temp.innerHTML = (temp_m < 10) ? "0" + temp_m : temp_m
            seg_disp_temp.innerHTML = (temp_s < 10) ? "0" + temp_s : temp_s



            if (temp_s > 0) {
                temp_s--

            }
            else if (temp_s == 0 && temp_m > 0) {
                temp_m--
                temp_s = 59
            }
            else if (temp_s == 0 && temp_m == 0 && temp_h > 0) {
                temp_h--
                temp_m = 60
            }
            else if (temp_s == 0 && temp_m == 0 && temp_h == 0) {
                const audio = document.querySelector("audio")
                audio.play()
                display_input.removeAttribute("class", "none")
                display_input.setAttribute("class", "display-temp-input")
                display_clock.setAttribute("class", "none")
                clearInterval(temporizador)
                
                iniciar_temp.disabled = false
                pausar_temp.disabled = true
                zerar_temp.disabled = true
                alert("Acabou o tempo!")
            }

        }, 1000)

    }
    else {
        alert("Digite um valor para começar")
    }
})

pausar_temp.addEventListener("click", () => {
    clearInterval(temporizador)
    iniciar_temp.disabled = false
    pausar_temp.disabled = true
})

zerar_temp.addEventListener("click", () => {
    clearInterval(temporizador)
    temp_h = 0
    temp_m = 0
    temp_s = 0
    display_input.removeAttribute("class", "none")
    display_input.setAttribute("class", "display-temp-input")
    display_clock.setAttribute("class", "none")
    iniciar_temp.disabled = false
    pausar_temp.disabled = true
    zerar_temp.disabled = true
})