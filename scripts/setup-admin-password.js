#!/usr/bin/env node

/**
 * Script para configurar el password del usuario admin
 * Uso: node scripts/setup-admin-password.js <password>
 */

import bcrypt from 'bcryptjs'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

async function setupAdminPassword(password) {
  if (!password || password.length < 6) {
    console.error('❌ Error: Password debe tener al menos 6 caracteres')
    process.exit(1)
  }

  try {
    // Leer archivo de usuarios
    const usersPath = join(process.cwd(), 'data', 'users.json')
    const usersData = await readFile(usersPath, 'utf-8')
    const users = JSON.parse(usersData)

    // Encontrar usuario admin
    const admin = users.find((u) => u.username === 'admin')

    if (!admin) {
      console.error('❌ Error: Usuario admin no encontrado')
      process.exit(1)
    }

    // Generar hash del password
    console.log('🔐 Generando hash del password...')
    const hash = await bcrypt.hash(password, 10)

    // Actualizar password hash
    admin.passwordHash = hash

    // Guardar cambios
    await writeFile(usersPath, JSON.stringify(users, null, 2), 'utf-8')

    console.log('✅ Password del usuario admin actualizado exitosamente')
    console.log(`
📋 Credenciales:
   Username: ${admin.username}
   Password: ${password}

⚠️  IMPORTANTE: Guarda estas credenciales en un lugar seguro
    `)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Obtener password de argumentos de línea de comandos
const password = process.argv[2]

if (!password) {
  console.log(`
Uso: node scripts/setup-admin-password.js <password>

Ejemplo:
  node scripts/setup-admin-password.js mi-password-super-seguro

Requisitos:
  - Password debe tener al menos 6 caracteres
  `)
  process.exit(1)
}

setupAdminPassword(password)
