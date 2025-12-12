# Script para inicializar Git y preparar para GitHub
# Ejecuta este script después de crear el repositorio en GitHub

Write-Host "🚀 Configurando Git para TikTok Sync Fixer..." -ForegroundColor Cyan

# Verificar si git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git no está instalado. Por favor instala Git primero." -ForegroundColor Red
    Write-Host "Descarga desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Verificar si ya es un repositorio git
if (Test-Path .git) {
    Write-Host "⚠️  Ya existe un repositorio git en este directorio." -ForegroundColor Yellow
    $continue = Read-Host "¿Deseas continuar? (s/n)"
    if ($continue -ne "s") {
        exit 0
    }
} else {
    Write-Host "📦 Inicializando repositorio git..." -ForegroundColor Green
    git init
}

# Cambiar a rama main
Write-Host "🌿 Configurando rama main..." -ForegroundColor Green
git branch -M main

# Agregar todos los archivos
Write-Host "📝 Agregando archivos..." -ForegroundColor Green
git add .

# Hacer commit inicial
Write-Host "💾 Creando commit inicial..." -ForegroundColor Green
git commit -m "Initial commit: TikTok Sync Fixer MVP"

Write-Host ""
Write-Host "✅ Repositorio local configurado correctamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a https://github.com y crea un nuevo repositorio llamado 'tiktok-sync-fixer'" -ForegroundColor White
Write-Host "2. NO marques 'Add README', 'Add .gitignore', ni 'Choose a license'" -ForegroundColor Yellow
Write-Host "3. Después de crear el repo, ejecuta estos comandos:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/TU-USUARIO/tiktok-sync-fixer.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "   (Reemplaza TU-USUARIO con tu nombre de usuario de GitHub)" -ForegroundColor Yellow
Write-Host ""

