#!/bin/bash
# Script para inicializar Git y preparar para GitHub
# Ejecuta este script después de crear el repositorio en GitHub

echo "🚀 Configurando Git para TikTok Sync Fixer..."

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Por favor instala Git primero."
    exit 1
fi

# Verificar si ya es un repositorio git
if [ -d .git ]; then
    echo "⚠️  Ya existe un repositorio git en este directorio."
    read -p "¿Deseas continuar? (s/n): " continue
    if [ "$continue" != "s" ]; then
        exit 0
    fi
else
    echo "📦 Inicializando repositorio git..."
    git init
fi

# Cambiar a rama main
echo "🌿 Configurando rama main..."
git branch -M main

# Agregar todos los archivos
echo "📝 Agregando archivos..."
git add .

# Hacer commit inicial
echo "💾 Creando commit inicial..."
git commit -m "Initial commit: TikTok Sync Fixer MVP"

echo ""
echo "✅ Repositorio local configurado correctamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a https://github.com y crea un nuevo repositorio llamado 'tiktok-sync-fixer'"
echo "2. NO marques 'Add README', 'Add .gitignore', ni 'Choose a license'"
echo "3. Después de crear el repo, ejecuta estos comandos:"
echo ""
echo "   git remote add origin https://github.com/TU-USUARIO/tiktok-sync-fixer.git"
echo "   git push -u origin main"
echo ""
echo "   (Reemplaza TU-USUARIO con tu nombre de usuario de GitHub)"
echo ""

