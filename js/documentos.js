function search()
{
    var cpf = document.getElementById('inputCPF').value;
    console.log(cpf);
    validation(cpf);
}

function validation(cpfValue)
{

    var storage = firebase.storage();
    // Retorna uma Promisse que será processada
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1)
        {
            next(cpfValue);
        }
        else
        {
            alert('CPF não Encontrado');
        }
    }).catch(function(error)
    {
        console.log('ERRO', error);
    });
    
}

function next(cpfValue)
{
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumento').innerHTML = 'Certificado de: '+cpfValue;
}

function back()
{
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCPF").value='';
}