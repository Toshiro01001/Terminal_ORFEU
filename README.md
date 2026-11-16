# Terminal ORFEU

## Projeto Olhos (página com senha)

O conteúdo de `Experimentos/olhos.html` fica cifrado em `Experimentos/olhos-cifrado.js` (AES-GCM, com a chave gerada da senha por PBKDF2). A senha não está no código: a página só consegue ler o texto quando a senha certa é digitada, e abrir `olhos.html` direto pelo endereço pede a senha de novo.

Para mudar o texto ou a senha, edite o trecho em claro num arquivo `olhos-aberto.html` no seu computador (ele está no `.gitignore`) e rode:

```bash
SENHA='nova senha' node ferramentas/cifrar-olhos.mjs olhos-aberto.html
```

Desenvolvido por Rodrigo Terroso Junior. O Claude, da Anthropic, foi usado como ferramenta durante o desenvolvimento.
