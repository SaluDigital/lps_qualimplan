@echo off
echo ============================================================
echo QUALIMPLAN — Building Production Version
echo ============================================================

REM 1. Create build folder
if exist build rd /s /q build
mkdir build

REM 2. Transpile and Minify JSX files to JS
echo [1/4] Transpiling and Minifying scripts...
call npx -y esbuild icons.jsx --outfile=build/icons.js --loader:.jsx=jsx --minify
call npx -y esbuild sections-1.jsx --outfile=build/sections-1.js --loader:.jsx=jsx --minify
call npx -y esbuild sections-2.jsx --outfile=build/sections-2.js --loader:.jsx=jsx --minify
call npx -y esbuild sections-3.jsx --outfile=build/sections-3.js --loader:.jsx=jsx --minify
call npx -y esbuild app.jsx --outfile=build/app.js --loader:.jsx=jsx --minify

REM 3. Minify CSS
echo [2/4] Minifying CSS...
call npx -y esbuild styles.css --outfile=build/styles.css --minify

REM 4. Copy Assets
echo [3/4] Copying assets...
copy logo.png build\ >nul
copy video1.mp4 build\ >nul
copy pacientes.mp4 build\ >nul
if exist *.webp copy *.webp build\ >nul
if exist *.png copy *.png build\ >nul
if exist *.jpg copy *.jpg build\ >nul

REM 5. The index.html is copied from index-prod.html
echo [4/4] Finalizing build...
copy index-prod.html build\index.html >nul

echo.
echo ============================================================
echo BUILD COMPLETE!
echo All files are in the 'build' folder.
echo You can upload the contents of the 'build' folder to your server.
echo ============================================================
