// --- Guardar comentario ---
function submitComment() {
    const name = document.getElementById('comment-name').value;
    const rating = document.getElementById('comment-rating').value;
    const comment = document.getElementById('comment-text').value;
  
    if (!name || !comment) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }
  
    const newComment = {
      id: Date.now(),                  // ID único
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };
  
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
  
    document.getElementById('comment-form').reset();
    displayComments();
  }
  
  // --- Pintar comentarios en pantalla (sin cambiar tu estructura visual) ---
  function displayComments() {
    const commentsContainer = document.getElementById('comments-container');
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
  
    // Dar ID a comentarios antiguos que no lo tengan (para que también se puedan borrar)
    let needsSave = false;
    comments = comments.map(c => {
      if (!c.id) { c.id = Date.now() + Math.floor(Math.random() * 1000); needsSave = true; }
      return c;
    });
    if (needsSave) localStorage.setItem('comments', JSON.stringify(comments));
  
    // Más recientes primero (por fecha)
    comments.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    commentsContainer.innerHTML = comments.map(c => `
      <div class="testimonial-item" data-id="${c.id}">
        <div class="rating mb-3">
          ${Array(parseInt(c.rating)).fill('<i class="bi bi-star-fill"></i>').join('')}
        </div>
        <p>"${c.comment}"</p>
        <div class="client-info d-flex align-items-center mt-4">
          <div>
            <h6 class="mb-0">${c.name}</h6>
            <span>${c.date}</span>
          </div>
        </div>
  
        <!-- Botón pequeñito debajo (no toca tu layout) -->
        <div class="text-center mt-3">
          <button type="button" class="comment-delete" title="Eliminar" aria-label="Eliminar"
                  onclick="deleteComment(${c.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
  
  // --- Eliminar comentario por ID ---
  function deleteComment(id) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(c => c.id !== id);
    localStorage.setItem('comments', JSON.stringify(comments));
    displayComments();
  }
  
  // Inicializar
  document.addEventListener('DOMContentLoaded', displayComments);
  