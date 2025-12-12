# 📦 Crear Repositorio en GitHub

## 🚀 Inicio Rápido (Windows)

### Paso 1: Ejecutar Script de Configuración

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
.\setup-github.ps1
```

Este script:
- ✅ Inicializa git
- ✅ Agrega todos los archivos
- ✅ Crea el commit inicial

### Paso 2: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
3. Completa el formulario:
   - **Repository name:** `tiktok-sync-fixer`
   - **Description:** `Sincronización de inventario entre Shopify y TikTok Shop`
   - **Visibility:** 
     - ✅ **Public** (si quieres que sea público)
     - ✅ **Private** (si quieres que sea privado)
   - ⚠️ **NO marques** "Add a README file" (ya tenemos uno)
   - ⚠️ **NO marques** "Add .gitignore" (ya tenemos uno)
   - ⚠️ **NO marques** "Choose a license" (opcional)
4. Haz clic en **"Create repository"**

### Paso 3: Conectar con GitHub

Después de crear el repositorio, GitHub te mostrará comandos. Ejecuta estos (reemplaza `TU-USUARIO`):

```powershell
# Agregar repositorio remoto
git remote add origin https://github.com/TU-USUARIO/tiktok-sync-fixer.git

# Subir código a GitHub
git push -u origin main
```

---

## Opción 1: Desde GitHub Web (Manual)

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
3. Completa el formulario:
   - **Repository name:** `tiktok-sync-fixer`
   - **Description:** `Sincronización de inventario entre Shopify y TikTok Shop`
   - **Visibility:** 
     - ✅ **Public** (si quieres que sea público)
     - ✅ **Private** (si quieres que sea privado)
   - ⚠️ **NO marques** "Add a README file" (ya tenemos uno)
   - ⚠️ **NO marques** "Add .gitignore" (ya tenemos uno)
   - ⚠️ **NO marques** "Choose a license" (opcional)
4. Haz clic en **"Create repository"**

### Paso 2: Conectar Repositorio Local con GitHub

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar git (si no está inicializado)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer primer commit
git commit -m "Initial commit: TikTok Sync Fixer MVP"

# 4. Cambiar nombre de la rama principal a 'main' (si es necesario)
git branch -M main

# 5. Agregar el repositorio remoto de GitHub
# ⚠️ REEMPLAZA 'tu-usuario' con tu nombre de usuario de GitHub
git remote add origin https://github.com/tu-usuario/tiktok-sync-fixer.git

# 6. Subir el código a GitHub
git push -u origin main
```

**Nota:** Si GitHub te pide autenticación:
- Usa un **Personal Access Token** (no tu contraseña)
- O configura **SSH keys** en GitHub

---

## Opción 2: Usando GitHub CLI (gh)

Si tienes GitHub CLI instalado:

```bash
# 1. Inicializar git
git init

# 2. Agregar archivos
git add .

# 3. Primer commit
git commit -m "Initial commit: TikTok Sync Fixer MVP"

# 4. Crear repo y subir código (todo en uno)
gh repo create tiktok-sync-fixer --public --source=. --remote=origin --push
```

---

## Opción 3: Desde Vercel (Automático)

Si prefieres, puedes crear el repo directamente desde Vercel:

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New Project"**
3. Selecciona **"Import Git Repository"**
4. Haz clic en **"Set up GitHub integration"** (si no está conectado)
5. Autoriza Vercel a acceder a GitHub
6. Crea un nuevo repositorio desde Vercel:
   - Nombre: `tiktok-sync-fixer`
   - Vercel lo creará automáticamente en GitHub
   - Luego puedes clonarlo localmente

---

## 🔐 Autenticación con GitHub

### Si te pide usuario/contraseña:

GitHub ya no acepta contraseñas. Necesitas un **Personal Access Token**:

1. Ve a GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Haz clic en **"Generate new token (classic)"**
3. Dale un nombre: `tiktok-sync-fixer`
4. Selecciona permisos:
   - ✅ `repo` (acceso completo a repositorios)
5. Haz clic en **"Generate token"**
6. **Copia el token** (solo se muestra una vez)
7. Úsalo como contraseña cuando git te lo pida

### O configura SSH (Recomendado para largo plazo):

```bash
# 1. Generar SSH key (si no tienes una)
ssh-keygen -t ed25519 -C "tu-email@example.com"

# 2. Copiar la clave pública
cat ~/.ssh/id_ed25519.pub

# 3. Agregar a GitHub:
# Settings → SSH and GPG keys → New SSH key
# Pega la clave y guarda

# 4. Cambiar remote a SSH
git remote set-url origin git@github.com:tu-usuario/tiktok-sync-fixer.git
```

---

## ✅ Verificación

Después de subir el código:

1. Ve a tu repositorio en GitHub: `https://github.com/tu-usuario/tiktok-sync-fixer`
2. Verifica que todos los archivos estén ahí
3. Verifica que `.env.local` NO esté (debe estar en `.gitignore`)

---

## 🚀 Próximo Paso

Una vez que el repositorio esté en GitHub:

1. Ve a `VERCEL_DEPLOY.md`
2. Conecta el repositorio con Vercel
3. Haz el deploy

---

## 🐛 Troubleshooting

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/tu-usuario/tiktok-sync-fixer.git
```

**Error: "failed to push some refs"**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Error: "authentication failed"**
- Usa Personal Access Token en lugar de contraseña
- O configura SSH keys

