
//SETTINGS
const MAX_INPUT_CHAR = 500 //max characters per input (for programming language source code inputs use 10.000 max)



function splitString(str, limit) {
  const words = str.split(/\s/); // separa as palavras por espaços em branco
  const result = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const newLine = currentLine + " " + word;
    if (newLine.length > limit) {
      result.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = newLine;
    }
  }

  if (currentLine !== "") {
    result.push(currentLine.trim());
  }

  return result;
}

async function uploadAction() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.txt'
    input.onchange= ()=> {
        const file = input.files[0]
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = async (event) => {
            const text = event.target.result;
            mensagens = splitString(text, MAX_INPUT_CHAR)
            for (const msg of mensagens) {
                if (msg == "") continue;
                await enterMessage(msg);
            }
        }
    }
    input.click();

}

async function enterMessage(msg) {
    return new Promise(async resolve => {
        console.log("enviando mensagen...")
        textarea.value = msg
        // cria um evento de teclado para simular o Enter
        const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        });

        // dispara o evento de teclado no textarea

        textarea.dispatchEvent(enterEvent);
        await checkCanSend();
        resolve();
    })
}

function checkCanSend() {
    return new Promise( resolve => {
        const intervalId = setInterval(() => {

            const element = document.querySelector('.text-2xl')
            if (!element) {

            console.log("pronto!")
            clearInterval(intervalId); // interrompe o setInterval
            resolve(true)

            }
            else {console.log("checando;")}
        }, 500);
    })
}

// Exemplo de como usar a função
checkCanSend(() => {
  console.log("Botão clicado!");
});

const botao = document.createElement("button")
const textarea = document.querySelector('textarea[tabindex="0"]');
const sendButton = document.querySelector('div.flex.ml-1.md\\:w-full.md\\:m-auto.md\\:mb-2.gap-0.md\\:gap-2.justify-center button.btn')

botao.innerHTML = "Upload"
//add upload button
document.querySelector('.flex.ml-1.md\\:w-full.md\\:m-auto.md\\:mb-2.gap-0.md\\:gap-2.justify-center').appendChild(botao)
botao.addEventListener('click', uploadAction)


