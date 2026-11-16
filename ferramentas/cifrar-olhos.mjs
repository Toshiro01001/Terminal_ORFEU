// Cifra o conteúdo do Projeto Olhos para Experimentos/olhos-cifrado.js.
// Uso: SENHA='...' node ferramentas/cifrar-olhos.mjs caminho/olhos-aberto.html
// O arquivo de entrada é o trecho em claro (o bloco <div class="crt">...</div>).
// Não envie o arquivo em claro nem a senha ao repositório.
import { readFileSync, writeFileSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";

const ITERACOES = 250000;
const senha = process.env.SENHA;
const entrada = process.argv[2];
if (!senha || !entrada) {
  console.error("Uso: SENHA='...' node ferramentas/cifrar-olhos.mjs olhos-aberto.html");
  process.exit(1);
}
const texto = readFileSync(entrada, "utf8");
const sal = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(senha), "PBKDF2", false, ["deriveKey"]);
const chave = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt: sal, iterations: ITERACOES, hash: "SHA-256" },
  base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
const dados = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, chave, new TextEncoder().encode(texto)));
const b64 = (u) => Buffer.from(u).toString("base64");
const saida = `// Gerado por ferramentas/cifrar-olhos.mjs. Não edite à mão.
window.OLHOS_CIFRADO = {
  iteracoes: ${ITERACOES},
  sal: "${b64(sal)}",
  iv: "${b64(iv)}",
  dados: "${b64(dados)}"
};
`;
const destino = new URL("../Experimentos/olhos-cifrado.js", import.meta.url);
writeFileSync(destino, saida);
console.log("Gravado em Experimentos/olhos-cifrado.js");
