<%- include('../partials/header.ejs') %>

<main id="main-content" class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">
                    <h2 class="h4 mb-0">Publicar Nueva Noticia</h2>
                </div>
                <div class="card-body">
                    <form action="/noticias/create" method="POST" enctype="multipart/form-data">
                        
                        <div class="mb-3">
                            <label for="title" class="form-label fw-bold">Título de la noticia</label>
                            <input type="text" class="form-control" id="title" name="title" placeholder="Ej: Gran avance en la inclusión laboral" required>
                        </div>

                        <div class="mb-3">
                            <label for="content" class="form-label fw-bold">Contenido / Cuerpo</label>
                            <textarea class="form-control" id="content" name="content" rows="8" placeholder="Escribe aquí el detalle de la noticia..." required></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="image" class="form-label fw-bold">Imagen de portada</label>
                            <input class="form-control" type="file" id="image" name="image" accept="image/*">
                            <div class="form-text">Formatos recomendados: JPG, PNG.</div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <a href="/noticias" class="btn btn-outline-secondary">Cancelar</a>
                            <button type="submit" class="btn btn-success px-5">Publicar Ahora</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<%- include('../partials/footer.ejs') %>