// Abre o conteúdo cifrado do Projeto Olhos (Experimentos/olhos-cifrado.js).
// A senha nunca fica no código: ela gera a chave (PBKDF2) que decifra o texto
// (AES-GCM). Senha errada não decifra, então não há o que comparar no código.
(function () {
  function deBase64(t) {
    var bin = atob(t), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u;
  }

  window.abrirOlhos = function (senha) {
    var c = window.OLHOS_CIFRADO;
    if (!senha || !c || !window.crypto || !crypto.subtle) return Promise.resolve(null);
    return crypto.subtle.importKey("raw", new TextEncoder().encode(senha), "PBKDF2", false, ["deriveKey"])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: "PBKDF2", salt: deBase64(c.sal), iterations: c.iteracoes, hash: "SHA-256" },
          base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      })
      .then(function (chave) {
        return crypto.subtle.decrypt({ name: "AES-GCM", iv: deBase64(c.iv) }, chave, deBase64(c.dados));
      })
      .then(function (claro) { return new TextDecoder().decode(claro); })
      .catch(function () { return null; });
  };
})();
