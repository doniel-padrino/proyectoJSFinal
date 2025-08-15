$(document).ready(function () {
  // Menú hamburguesa
  $('#menu-toggle').click(function () {
    $('#nav-links').toggleClass('active');
  });

  // Cargar JSON en el <aside>
  $.getJSON('js/datos.json', function (data) {
    let contenido = '<h3>Información Actualizada</h3>';
    $.each(data.temas, function (i, item) {
      contenido += `<h4>${item.titulo}</h4><p>${item.descripcion}</p>`;
    });
    $('#info-json').html(contenido);
  });
});