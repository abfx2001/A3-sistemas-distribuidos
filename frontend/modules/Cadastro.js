export default class Cadastro {
  constructor(fromClass) {
    this.form = document.querySelector(fromClass)
  }

  init() {
    this.events()
  }

  events() {
    this.form[5].addEventListener('click', e => {
      e.preventDefault()
      const cepValue = this.form[4].value
      pesquisaCep(cepValue)
      async function pesquisaCep(cepValue) {
        const response = await fetch(`https://cdn.apicep.com/file/apicep/${cepValue}.json`);
        const jsonData = await response.json();
        setLocal(jsonData.address);
      }
    })
    
    function setLocal (local){
      let localValue = document.querySelector(".local")
      localValue.value = local
    }    
  }

}