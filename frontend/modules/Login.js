// import validator from 'validator'
// export default class Login {
//     constructor(fromClass) {
//         this.form = document.querySelector(fromClass)
//         this.p = document.querySelector('p[class="text-center lead"]')
//     }
//     init() {
//         this.events()
//     }
//     events() {
//         if (!this.form) return
//         this.form.addEventListener('submit', e => {
//             e.preventDefault()
//             this.validate(e)
//         })
//     }
//     validate(e) {
//         const el = e.target
//         const emailInput = el.querySelector('input[name="email"]')
//         const passwordInput = el.querySelector('input[name="password"]')
//         let error = false
//         if (!validator.isEmail(emailInput.value)) {
//             //this.showMessages('E-mail inválido.')
//             alert('E-mail inválido.')
//             error = true
//         }
//         if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
//             //this.showMessages('Senha precisa ter de 3 a 50 caracteres.')
//             alert('Senha precisa ter de 3 a 50 caracteres.')
//             error = true
//         }
//         this.cleanUp()
//         if (!error) el.submit()
//     }
//     // showMessages(msg) {
//     //     const el = document.createElement('div')
//     //     el.classList = "alert alert-danger my-3"
//     //     el.innerText = msg
//     //     this.p.appendChild(el)
//     // }
//     // cleanUp() {

//     //     //window.location.reload()
//     // }
// }