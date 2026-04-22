@echo off
echo Iniciando o servidor local para Qualimplan...
echo O site abrira em http://localhost:3000
start http://localhost:3000
npx serve -l 3000 .
pause
