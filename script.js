const input = document.getElementById("commandInput");
const output = document.getElementById("output");
 
// chave da sessão e "tela padrão" (banner + opções que vieram no HTML)
const STORAGE_KEY = "orfeu_terminal_output";
const DEFAULT_SCREEN = output.innerText;
 
// ao carregar a página: se houver sessão salva nesta aba, restaura;
// caso contrário, mantém o banner padrão (que já mostra as opções)
(function restoreSession() {
  let saved = null;
  try {
    saved = sessionStorage.getItem(STORAGE_KEY);
  } catch (e) {
    saved = null;
  }
  if (saved && saved.trim() !== "") {
    output.innerText = saved;
  }
  output.scrollTop = output.scrollHeight;
})();
 
function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, output.innerText);
  } catch (e) {
    /* armazenamento indisponível: ignora silenciosamente */
  }
}
 
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value;
    processCommand(command);
    input.value = "";
  }
});
 
// clicar em qualquer ponto da tela mantém o cursor no terminal
document.addEventListener("click", function () {
  input.focus();
});
 
function processCommand(rawCmd) {
  // normalização do comando
  const cmd = rawCmd
    .toLowerCase()
    .replace(/"/g, "") // remove aspas
    .replace(/\s+/g, " ") // remove espaços duplicados
    .trim();
 
  appendLine(`ORFEU> ${rawCmd}`);
 
  if (cmd === "") {
    return;
  }
 
  if (cmd === "help") {
    appendLine("COMANDOS DISPONÍVEIS:");
    appendLine("ls                  - listar diretórios");
    appendLine("open arquivos       - acessar ARQUIVOS");
    appendLine("open experimentos   - acessar EXPERIMENTOS");
    appendLine("open cobaias        - acessar COBAIAS");
    appendLine("clear               - limpar terminal");
    appendLine("");
    appendLine("DIRETÓRIOS DISPONÍVEIS:");
    appendLine("[ ARQUIVOS ]");
    appendLine("[ EXPERIMENTOS ]");
    appendLine("[ COBAIAS ]");
    return;
  }
 
  if (cmd === "ls") {
    appendLine("ARQUIVOS/");
    appendLine("EXPERIMENTOS/");
    appendLine("COBAIAS/");
    return;
  }
 
  if (cmd.startsWith("open ")) {
    const target = cmd.replace("open ", "").trim();
 
    switch (target) {
      case "arquivos":
        window.location.href = "Arquivos/arquivos.html";
        return;
 
      case "experimentos":
        window.location.href = "Experimentos/experimento.html";
        return;
 
      case "cobaias":
        window.location.href = "Cobaias/cobaias.html";
        return;
 
      default:
        appendLine("DESTINO NÃO ENCONTRADO.");
        return;
    }
  }
 
  if (cmd === "clear") {
    // limpa o histórico, mas mantém o banner com as opções
    output.innerText = DEFAULT_SCREEN;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    output.scrollTop = output.scrollHeight;
    return;
  }
 
  appendLine("COMANDO NÃO RECONHECIDO. DIGITE 'help'.");
}
 
function appendLine(text) {
  output.innerText += "\n" + text;
  output.scrollTop = output.scrollHeight;
  persist();
}

