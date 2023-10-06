
const inputEl = document.querySelector("#password") // capturando o input da senha 
const upperCaseCheckEl = document.querySelector ("#uppercase-check")
const numberCheckEl = document.querySelector ("#number-check")
const symbolCheckEl = document.querySelector ("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
      let passwordLength = 16 // senha no minimo 16


      function generatePassword() {
        let chars =
          "abcdefghjkmnpqrstuvwxyz" // funçao que gera senha

          const upperCaseChars ="ABCDEFGHJKLMNPQRSTUVWXYZ"
          const numbersChars ="123456789"
          const symbolChars = "?!@&*()[]"

          if(upperCaseCheckEl.checked){
            chars += upperCaseChars
          }
          if(numberCheckEl.checked){
            chars += numbersChars
          }
          if(symbolCheckEl.checked){
            chars += symbolChars
          }


        let password = "" // senha começa null

        for (let i = 0; i < passwordLength; i++) {
          const randomNumber = Math.floor(Math.random() * chars.length) // Math.floor nivela as strings
          password += chars.substring(randomNumber, randomNumber + 1)// substring faz um recorte da string chars
        }

        inputEl.value = password // pegando o valor da senha e colocando no input
        calculateQuality() // toda vez que gera um password a gente calcula se é critico ou safe
        calculateFontSize()
      }

      function calculateQuality(){
        // 20% da barra precisa ser critico e 100% da barra algo safe
        const percent = Math.round((passwordLength / 64 ) * 25 +
         (upperCaseCheckEl.checked ? 15 : 0)+
         (numberCheckEl.checked ? 25 : 0)+
         (symbolCheckEl.checked ? 35 : 0)
         )

        securityIndicatorBarEl.style.width = `${percent}%`

        if(percent > 69 ){
          //safe
          securityIndicatorBarEl.classList.remove('critical')
          securityIndicatorBarEl.classList.remove('warning')
          securityIndicatorBarEl.classList.add('safe')

        }else if (percent > 50) {
          // warning
          securityIndicatorBarEl.classList.remove('critical')
          securityIndicatorBarEl.classList.add('warning')
          securityIndicatorBarEl.classList.remove('safe')
        }else {
          //critical
          securityIndicatorBarEl.classList.add('critical')
          securityIndicatorBarEl.classList.remove('warning')
          securityIndicatorBarEl.classList.remove('safe')
        }

        if(percent >=100 ) {
          securityIndicatorBarEl.classList.add('completed')
        }else{
          securityIndicatorBarEl.classList.remove('completed')
        }
      }

      function calculateFontSize(){
        if(passwordLength > 45) {
          inputEl.classList.remove('font-sm')
          inputEl.classList.remove('font-xs')
          inputEl.classList.add('font-xxs')
        }else if (passwordLength >32) {
          inputEl.classList.remove('font-sm')
          inputEl.classList.add('font-xs')
          inputEl.classList.remove('font-xxs')
        }else if(passwordLength > 22) {
          inputEl.classList.add('font-sm')
          inputEl.classList.remove('font-xs')
          inputEl.classList.remove('font-xxs')
        }else {
          inputEl.classList.remove('font-sm')
          inputEl.classList.remove('font-xs')
          inputEl.classList.remove('font-xxs')
        }
      }

      function copy() {
        navigator.clipboard.writeText(inputEl.value) // codigo que copia algo do navegador
      }

      const passwordLengthEl = document.querySelector("#password-length")// capturando o tamanho da senha
      passwordLengthEl.addEventListener("input", function () { // pegando o evento de input do range 
        passwordLength = passwordLengthEl.value // pegando o valor do tamanho da senha
        document.querySelector("#password-length-text").innerText = passwordLength
        generatePassword()
      })

      upperCaseCheckEl.addEventListener("click", generatePassword)
      numberCheckEl.addEventListener("click", generatePassword)
      symbolCheckEl.addEventListener("click", generatePassword)

      document.querySelector("#copy-1").addEventListener("click", copy) // capturando o id do button e capturando o evento click do copiar e colar

      document.querySelector("#copy-2").addEventListener("click", copy) // capturando o id do button e capturando o evento click do copiar e colar

      document.querySelector('#renew').addEventListener("click", generatePassword)

      generatePassword()
      
