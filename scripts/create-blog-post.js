/**
 * Script para crear posts de blog vía API
 *
 * Uso:
 *   node scripts/create-blog-post.js
 *
 * El script te pedirá los datos del post interactivamente
 */

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

async function createPost() {
  console.log('=== Crear Nuevo Post de Blog ===\n');

  // Obtener datos del post
  const title = await question('Título: ');
  const description = await question('Descripción (resumen corto): ');
  const tags = await question('Tags (separados por coma): ');
  const readTime = await question('Tiempo de lectura (ej: "5 minutos") [opcional]: ');

  console.log('\nAhora escribe el contenido del post en Markdown.');
  console.log('Cuando termines, escribe "FIN" en una línea separada.\n');

  const contentLines = [];
  let line;
  while ((line = await question('')) !== 'FIN') {
    contentLines.push(line);
  }

  const content = contentLines.join('\n');

  // Obtener credenciales
  const username = await question('\nUsuario (default: admin): ') || 'admin';
  const password = await question('Password: ');

  // Preparar datos
  const postData = {
    title,
    description,
    content,
    tags: tags.split(',').map(t => t.trim()).filter(t => t),
  };

  if (readTime) {
    postData.readTime = readTime;
  }

  // Crear credenciales Base64
  const credentials = Buffer.from(`${username}:${password}`).toString('base64');

  // Hacer request
  console.log('\nCreando post...');

  try {
    const response = await fetch('http://localhost:4321/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('\n✅ Post creado exitosamente!');
      console.log('Slug:', result.post.slug);
      console.log('URL:', `http://localhost:4321/blog/${result.post.slug}`);
    } else {
      console.error('\n❌ Error al crear post:');
      console.error(result.error || result.message);
    }
  } catch (error) {
    console.error('\n❌ Error de conexión:', error.message);
    console.error('¿Está el servidor corriendo en puerto 4321?');
  }

  rl.close();
}

createPost().catch(error => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
