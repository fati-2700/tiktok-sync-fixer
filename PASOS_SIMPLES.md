# 📝 Pasos Simples - Copia y Pega

## ✅ Paso 1: Ejecutar Script (Windows)

**Doble clic en:** `iniciar-git.bat`

O abre PowerShell y ejecuta:
```powershell
.\iniciar-git.bat
```

Esto configurará git localmente.

---

## ✅ Paso 2: Crear Repo en GitHub

1. **Abre:** https://github.com/new
2. **Nombre:** `tiktok-sync-fixer`
3. **NO marques nada**
4. **Clic:** "Create repository"

---

## ✅ Paso 3: Copiar y Pegar Estos Comandos

**Reemplaza `TU-USUARIO` con tu usuario de GitHub:**

```powershell
git remote add origin https://github.com/TU-USUARIO/tiktok-sync-fixer.git
git push -u origin main
```

**Si te pide usuario/contraseña:**
- Usuario: tu usuario de GitHub
- Contraseña: usa un **Personal Access Token** (no tu contraseña real)
  - Crea uno en: https://github.com/settings/tokens
  - Permisos: ✅ `repo`

---

## ✅ ¡Listo!

Ve a: `https://github.com/TU-USUARIO/tiktok-sync-fixer`

Deberías ver todos tus archivos.

---

## 🚀 Siguiente Paso

Ahora conecta el repo con Vercel (ver `VERCEL_DEPLOY.md`)

