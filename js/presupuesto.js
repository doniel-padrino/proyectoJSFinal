    const form = document.getElementById("formPresupuesto");
    const totalSpan = document.getElementById("total");

    $(document).ready(function () {
        // Menú hamburguesa
        $('#menu-toggle').click(function () {
            $('#nav-links').toggleClass('active');
        });
    })
    
    // Función para calcular total
    function calcularTotal() {
        let total = parseFloat(document.getElementById("producto").value);

        document.querySelectorAll(".extra:checked").forEach(e => {
            total += parseFloat(e.value);
        });

        const plazo = parseInt(document.getElementById("plazo").value);
        if (plazo >= 12) total *= 0.9;
        if (plazo >= 24) total *= 0.8;

        totalSpan.textContent = total.toFixed(2);
    }

    // Eventos para recalcular
    document.querySelectorAll("#producto, #plazo, .extra").forEach(el => {
        el.addEventListener("input", calcularTotal);
    });

    // Validación en vivo
    const validarCampo = (id, regex, errorId) => {
        const campo = document.getElementById(id);
        const error = document.getElementById(errorId);
        campo.addEventListener("input", () => {
            if (!regex.test(campo.value.trim())) {
                campo.style.borderColor = "#dc3545";
                error.style.display = "block";
            } else {
                campo.style.borderColor = "#28a745";
                error.style.display = "none";
            }
        });
    };

    validarCampo("nombre", /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{1,15}$/, "errorNombre");
    validarCampo("apellido", /^[A-Za-zÁÉÍÓÚáéíóúñÑ]{1,40}$/, "errorApellido");
    validarCampo("telefono", /^[0-9]{9}$/, "errorTelefono");
    validarCampo("email", /^[A-Za-z0-9._%+-]{1,20}@[A-Za-z0-9]{1,10}\.[A-Za-z]{1,6}$/, "errorEmail");

    // Validación final al enviar
    form.addEventListener("submit", function(e) {
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]{1,15}$/.test(nombre) ||
            !/^[A-Za-zÁÉÍÓÚáéíóúñÑ]{1,40}$/.test(apellido) ||
            !/^[0-9]{9}$/.test(telefono) ||
            !/^[A-Za-z0-9._%+-]{1,20}@[A-Za-z0-9]{1,10}\.[A-Za-z]{1,6}$/.test(email)) {
            alert("Por favor, corrige los errores antes de enviar.");
            e.preventDefault();
        } else if(!document.getElementById("condiciones").checked){
            alert("Debes aceptar las condiciones para enviar el formulario");
            e.preventDefault();
        }
        else {
            alert("Formulario enviado correctamente.");
        }
    });

    // Inicializar cálculo
    calcularTotal();