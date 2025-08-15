        $(document).ready(function () {
            // Menú hamburguesa
            $('#menu-toggle').click(function () {
                $('#nav-links').toggleClass('active');
            });
        })
        
        // Coordenadas de la empresa
        const empresaLat = 28.134405;
        const empresaLng = -15.433549;

        // Inicializar el mapa
        const map = L.map('map').setView([empresaLat, empresaLng], 14);

        // Cargar tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'OpenStreetMap'
        }).addTo(map);

        // Marcador de la empresa
        const empresaMarker = L.marker([empresaLat, empresaLng]).addTo(map)
            .bindPopup("<b>Mi Negocio</b><br>Av. Ejemplo 123, Ciudad<br>+34 600 123 456")
            .openPopup();

        // Al hacer click en el marcador, resaltar los datos
        empresaMarker.on('click', () => {
            document.getElementById('info').scrollIntoView({ behavior: 'smooth' });
        });

        // Intentar obtener ubicación del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const userLat = pos.coords.latitude;
                const userLng = pos.coords.longitude;

                // Marcador del usuario
                const userMarker = L.marker([userLat, userLng], {color: 'blue'}).addTo(map)
                    .bindPopup("Tú estás aquí").openPopup();

                // Dibujar ruta con OSRM
                L.Routing.control({
                    waypoints: [
                        L.latLng(userLat, userLng),
                        L.latLng(empresaLat, empresaLng)
                    ],
                    routeWhileDragging: false,
                    createMarker: () => null // Ocultar marcadores extra de la ruta
                }).addTo(map);

            }, err => {
                alert("No se pudo obtener tu ubicación");
            });
        } else {
            alert("Tu navegador no soporta geolocalización");
        }