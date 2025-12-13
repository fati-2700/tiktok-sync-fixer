# Script para hacer push a GitHub
# Ejecuta este script en PowerShell: .\push-to-github.ps1

Write-Host "🔄 Agregando cambios..." -ForegroundColor Cyan
git add .

Write-Host "📝 Haciendo commit..." -ForegroundColor Cyan
git commit -m "Fix: Permitir sincronización sin conexión TikTok (modo dummy data)"

Write-Host "🚀 Haciendo push a GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host "✅ Push completado!" -ForegroundColor Green


