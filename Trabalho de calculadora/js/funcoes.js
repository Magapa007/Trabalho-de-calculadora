function calculandoIMC() {
    var altura = parseFloat(document.getElementById("altura").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var idade = parseInt(document.getElementById("idade").value);

    if (isNaN(altura) || isNaN(peso) || isNaN(idade)) {
        alert('Dados faltando');
        return false;
    }

    var imc = peso / (altura * altura);

    var precoA_basico = 100 + (idade * 10 * (imc / 10));
    var precoA_standard = (150 + (idade * 15)) * (imc / 10);
    var precoA_premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    var fatorComorbidade = obterFatorComorbidade(imc);
    var precoB_basico = 100 + (fatorComorbidade * 10 * (imc / 10));
    var precoB_standard = (150 + (fatorComorbidade * 15)) * (imc / 10);
    var precoB_premium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    document.getElementById("planoA-basico").children[1].innerHTML = "R$ " + precoA_basico.toFixed(2);
    document.getElementById("planoA-standard").children[1].innerHTML = "R$ " + precoA_standard.toFixed(2);
    document.getElementById("planoA-premium").children[1].innerHTML = "R$ " + precoA_premium.toFixed(2);

    document.getElementById("planoB-basico").children[1].innerHTML = "R$ " + precoB_basico.toFixed(2);
    document.getElementById("planoB-standard").children[1].innerHTML = "R$ " + precoB_standard.toFixed(2);
    document.getElementById("planoB-premium").children[1].innerHTML = "R$ " + precoB_premium.toFixed(2);

    var tabelaRecomendada = document.getElementById("tabelaRecomendadaConteudo");
    tabelaRecomendada.innerHTML = ""; 

    var menorPreco = Math.min(precoA_basico, precoA_standard, precoA_premium, precoB_basico, precoB_standard, precoB_premium);

    if (menorPreco === precoA_basico) {
        adicionarLinhaTabelaRecomendada("Empresa A", "Básico", menorPreco.toFixed(2));
    } else if (menorPreco === precoA_standard) {
        adicionarLinhaTabelaRecomendada("Empresa A", "Standard", menorPreco.toFixed(2));
    } else if (menorPreco === precoA_premium) {
        adicionarLinhaTabelaRecomendada("Empresa A", "Premium", menorPreco.toFixed(2));
    } else if (menorPreco === precoB_basico) {
        adicionarLinhaTabelaRecomendada("Empresa B", "Básico", menorPreco.toFixed(2));
    } else if (menorPreco === precoB_standard) {
        adicionarLinhaTabelaRecomendada("Empresa B", "Standard", menorPreco.toFixed(2));
    } else {
        adicionarLinhaTabelaRecomendada("Empresa B", "Premium", menorPreco.toFixed(2));
    }

    document.getElementById("tabelaPlanos").style.display = "block";
    document.getElementById("tabelaRecomendada").style.display = "block";
}

function adicionarLinhaTabelaRecomendada(empresa, plano, preco) {
    var tabelaRecomendada = document.getElementById("tabelaRecomendadaConteudo");
    var novaLinha = tabelaRecomendada.insertRow(tabelaRecomendada.rows.length);
    
    var celulaEmpresa = novaLinha.insertCell(0);
    celulaEmpresa.innerHTML = empresa;

    var celulaPlano = novaLinha.insertCell(1);
    celulaPlano.innerHTML = plano;

    var celulaPreco = novaLinha.insertCell(2);
    celulaPreco.innerHTML = "R$ " + preco;
}

function obterFatorComorbidade(imc) {
    if (imc < 18.5) {
        return 10; 
    } else if (imc < 24.9) {
        return 1; 
    } else if (imc < 29.9) {
        return 6; 
    } else if (imc < 34.9) {
        return 10; 
    } else if (imc < 39.9) {
        return 20; 
    } else {
        return 30; 
    }
}
