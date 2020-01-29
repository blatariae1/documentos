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
            listFiles(cpfValue);
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

function listFiles(cpfValue)
{
    document.getElementById('tituloDocumento').innerHTML = 'Certificado de: '+cpfValue;
    var storage = firebase.storage();
    var arquivos;
    var nomeArquivos = [];
    var linksArquivos = [];
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos)
    {
        arquivos = todosArquivos.items;
        console.log(arquivos);
        
        for(let i = 0; i < arquivos.length; i++)
        {
            nomeArquivos.push(arquivos[i].name);
            storage.ref(cpfValue+'/'+nomeArquivos[i]).getDownloadURL().then(function(url)
            {
                console.log(url);
            });        
        }            
    });
}

function next(cpfValue)
{
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    
}

function back()
{
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCPF").value='';
}