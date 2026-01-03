const input = document.getElementById("commandInput");
const output = document.getElementById("output");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value;
    processCommand(command);
    input.value = "";
  }
});

function processCommand(rawCmd) {
  // normalização do comando
  const cmd = rawCmd
    .toLowerCase()
    .replace(/"/g, "") // remove aspas
    .replace(/\s+/g, " ") // remove espaços duplicados
    .trim();

  appendLine(`ORFEU> ${rawCmd}`);

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
    const target = cmd.replace("open ", "");

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
    output.innerText = "";
    return;
  }

  appendLine("COMANDO NÃO RECONHECIDO. DIGITE 'help'.");
}

function appendLine(text) {
  output.innerText += "\n" + text;
  output.scrollTop = output.scrollHeight;
}
