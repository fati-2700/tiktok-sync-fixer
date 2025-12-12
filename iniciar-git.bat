@echo off
echo ============================================
echo  Configurando Git para TikTok Sync Fixer
echo ============================================
echo.

REM Verificar si git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git no esta instalado.
    echo Descarga Git desde: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/4] Inicializando repositorio git...
git init
if errorlevel 1 (
    echo ERROR: No se pudo inicializar git
    pause
    exit /b 1
)

echo [2/4] Configurando rama main...
git branch -M main

echo [3/4] Agregando archivos...
git add .
if errorlevel 1 (
    echo ERROR: No se pudieron agregar archivos
    pause
    exit /b 1
)

echo [4/4] Creando commit inicial...
git commit -m "Initial commit: TikTok Sync Fixer MVP"
if errorlevel 1 (
    echo ERROR: No se pudo crear el commit
    pause
    exit /b 1
)

echo.
echo ============================================
echo  ¡Repositorio local configurado!
echo ============================================
echo.
echo PROXIMOS PASOS:
echo.
echo 1. Ve a: https://github.com/new
echo 2. Nombre: tiktok-sync-fixer
echo 3. NO marques ninguna opcion
echo 4. Clic en "Create repository"
echo.
echo Despues ejecuta estos comandos (reemplaza TU-USUARIO):
echo.
echo    git remote add origin https://github.com/TU-USUARIO/tiktok-sync-fixer.git
echo    git push -u origin main
echo.
echo ============================================
pause

