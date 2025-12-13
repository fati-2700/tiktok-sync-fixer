#!/bin/bash
# Script para hacer push a GitHub
# Ejecuta este script: bash push-to-github.sh

echo "🔄 Agregando cambios..."
git add .

echo "📝 Haciendo commit..."
git commit -m "Fix: Permitir sincronización sin conexión TikTok (modo dummy data)"

echo "🚀 Haciendo push a GitHub..."
git push origin main

echo "✅ Push completado!"

