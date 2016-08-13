function validaNombre(nombre) {
    var name = limpiaEntradas($(nombre).val().trim());
    if (name && !/\d/g.test(name)) {
        $(nombre).css("border", "2px solid #01f814");
        return true;
    }
    else {
        if (name == "") {
            $(nombre).val("");
            $(nombre).prop("placeholder", "Por favor, introduzca su nombre");
            $(nombre).css("border", "2px solid #f80101");
            return false;
        }
        else {
            if (/\d/g.test(name)) {
                $(nombre).val("");
                $(nombre).prop("placeholder", "Por favor, no incluya números");
                $(nombre).css("border", "2px solid #f80101");
                return false;
            }
        }
    }
}

function validaApellido(apellido) {
    var surname = limpiaEntradas($(apellido).val().trim());
    if (surname && !/\d/g.test(surname)) {
        $(apellido).css("border", "2px solid #01f814");
        return true;
    }
    else {
        if (surname == "") {
            $(apellido).val("");
            $(apellido).prop("placeholder", "Por favor, introduzca sus apellidos");
            $(apellido).css("border", "2px solid #f80101");
            return false;
        }
        else {
            if (/\d/g.test(surname)) {
                $(apellido).val("");
                $(apellido).prop("placeholder", "Por favor, no incluya números");
                $(apellido).css("border", "2px solid #f80101");
                return false;
            }
        }
    }
}

function validaCumple(fecha) {
    var hoy = new Date();
    var nacido = fecha.valueAsDate || fecha[0].valueAsDate;
    var mes = nacido.getMonth();
    var dia = nacido.getDate();
    var ano = nacido.getFullYear();
    if (mes > 11 || mes < 0 || dia > 31 || dia < 1 || ano > hoy.getFullYear()) {
        $("head").append('<style>input[type="date"]:before{content: "La fecha introducida contiene errores";}</style>');
        $(fecha).css("border", "2px solid #f80101");
        return false;
    }
    else {
        var edad = new Date(ano + 18, mes, dia);
        if (edad > hoy) {
            $("head").append('<style>input[type="date"]:before{content: "Debe usted ser mayor de edad (18 años)";}</style>');
            $(fecha).css("border", "2px solid #f80101");
            return false;
        }
        else {
            var topeEdad = new Date(ano + 100, mes, dia);
            if (topeEdad < hoy) {
                $("head").append('<style>input[type="date"]:before{content: "Perdone, ¿Es usted Matulasen?...";}</style>');
                $(fecha).css("border", "2px solid #f80101");
                return false;
            }
            else {
                var edadReal = hoy.getFullYear() - ano;
                $("head").append('<style>input[type="date"]:before{content: "Edad estimada: ' + edadReal + ' años";}</style>');
                $(fecha).css("border", "2px solid #01f814");
                return true;
            }
        }
    }
}

function validaEmail(email) {
    var correo = limpiaEntradas($(email).val().trim());
    if (!correo || correo == "") {
        $(email).prop("placeholder", "Por favor, introduzca su email");
        $(email).css("border", "2px solid #f80101");
        return false;
    }
    else {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo)) {
            $(email).css("border", "2px solid #01f814");
            return true;
        }
        else {
            $(email).prop("placeholder", "Por favor, revise el formato de su email");
            $(email).css("border", "2px solid #f80101");
            return false;
        }
    }
}

function validaTlfn(telefono) {
    var tlfn = limpiaEntradas($(telefono).val().trim().replace(/\s/g, ""));
    if (!tlfn || tlfn == "") {
        $(telefono).prop("placeholder", "Por favor, introduzca su teléfono");
        $(telefono).css("border", "2px solid #f80101");
        return false;
    }
    else {
        if (!/^\d{9}$/.test(tlfn)) {
            $(telefono).prop("placeholder", "Por favor, revise el formato del teléfono");
            $(telefono).css("border", "2px solid #f80101");
            return false;
        }
        else {
            $(telefono).css("border", "2px solid #01f814");
            return true;
        }
    }
}

function validaConsulta() {
    var opciones = $("input[name='consulta']");
    for (i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            $("#placeholderConsulta").text("Desea información relacionada con:");
            $("#campoOpciones").css("border", "2px solid #01f814");
            return true;
        }
    }
    $("#campoOpciones").css("border", "2px solid #f80101");
    $("#placeholderConsulta").text("Por favor, elija al menos una opción:");
    return false;
}

function validaPregunta(pregunta) {
    var pregunta = limpiaEntradas($(pregunta).val().trim());
    if (pregunta && !pregunta == "") {
        $("#preguntas").css("border", "2px solid #01f814");
    }
    else {
        $("#preguntas").css("border", "2px solid white");
    }
    return true;
}

function validaMailing() {
    var opciones = $("input[name='mailing']");
    for (i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            $("#subscripcion").css("border", "2px solid #01f814");
            return true;
        }
    }
    $("#subscripcion").css("border", "2px solid #f80101");
    return false;
}

function limpiaEntradas(entrada) {
    var simbologia = ["<", ">", "/", "$", "(", ")", "+", "*", "%", "&", ";", "[", "]", "{", "}", '"', ":", "_", "'", "^", "¨", "=", "¿", "!", "¡", "?", "·", "~", "#", "º", "ª"];
    $.each(simbologia, function(indice, simbolo){
        if (entrada.indexOf(simbolo) != -1) {
            entrada = entrada.split(simbolo).join("");
        };
    });
    return entrada;
}

function validaFormulario() {
    if (validaNombre($("#nombre")) && validaApellido($("#apellidos")) && validaCumple($("#cumple")) && validaEmail($("#email")) && validaTlfn($("#tlfn")) && validaConsulta() && validaPregunta($("#preguntas")) && validaMailing()) {
        return true;
    }
    else {
        return false;
    }
}

$(function() {
    $("#nombre").blur(function(){validaNombre(this);});
    $("#apellidos").blur(function(){validaApellido(this);});
    $("#cumple").blur(function(){validaCumple(this);});
    $("#email").blur(function(){validaEmail(this);});
    $("#tlfn").blur(function(){validaTlfn(this);});
    $("input[name='consulta']").change(function(){validaConsulta();});
    $("#preguntas").blur(function(){validaPregunta(this);});
    $("input, #preguntas").focus(function() {
        $(this).prop("placeholder", "");
        $(this).select();
    });
    $("input[name='mailing']").change(function(){validaMailing();});
    $("#subscriptor").focusin(function(){validaMailing();});
    $("#subscriptor").click(function(){validaMailing();});
})