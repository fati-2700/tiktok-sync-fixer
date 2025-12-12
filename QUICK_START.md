# ⚡ Inicio Rápido - Todo en 3 Pasos

## 🎯 Paso 1: Inicializar Git Local

Abre PowerShell en esta carpeta y ejecuta:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial commit: TikTok Sync Fixer MVP"
```

## 🌐 Paso 2: Crear Repositorio en GitHub

1. **Abre:** https://github.com/new
2. **Nombre del repositorio:** `tiktok-sync-fixer`
3. **Descripción:** `Sincronización de inventario entre Shopify y TikTok Shop`
4. **Visibilidad:** Elige Public o Private
5. **⚠️ IMPORTANTE:** NO marques ninguna opción (README, .gitignore, license)
6. **Clic en:** "Create repository"

## 🚀 Paso 3: Subir Código a GitHub

Después de crear el repo, GitHub te mostrará una página con instrucciones. 

**Ejecuta estos comandos** (reemplaza `TU-USUARIO` con tu usuario de GitHub):

```powershell
git remote add origin https://github.com/TU-USUARIO/tiktok-sync-fixer.git
git push -u origin main
```

### 🔐 Si te pide autenticación:

GitHub ya no acepta contraseñas. Necesitas un **Personal Access Token**:

1. Ve a: https://github.com/settings/tokens
2. Clic en: "Generate new token (classic)"
3. Nombre: `tiktok-sync-fixer`
4. Permisos: ✅ `repo` (marca la casilla)
5. Clic en: "Generate token"
6. **Copia el token** (solo se muestra una vez)
7. Úsalo como contraseña cuando git te lo pida

## ✅ Verificación

Ve a: `https://github.com/TU-USUARIO/tiktok-sync-fixer`

Deberías ver todos tus archivos ahí.

## 🎉 ¡Listo!

Ahora puedes:
1. Conectar el repo con Vercel (ver `VERCEL_DEPLOY.md`)
2. Hacer deploy de tu aplicación

