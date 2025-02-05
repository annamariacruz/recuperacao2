function validarFormulario(event) {
    event.preventDefault();

    // Seleção de elementos
    const nome = document.getElementById("nome").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const birthday = document.getElementById("birthday").value;
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmasenha").value;
    const classificacao = parseInt(document.getElementById("classificacao").value);
    const robloxAno = document.querySelector('input[name="roblox_ano"]:checked');
    const erros = [];

    // Validação do Nome
    if (!validarNome(nome)) {
        erros.push("Nome deve conter pelo menos duas palavras e começar com maiúscula");
    }

    // Validação do Nickname
    if (!validarNickname(nickname)) {
        erros.push("Nickname não pode ser composto apenas por números");
    }

    // Validação de Data de Nascimento
    if (!validarIdade(birthday)) {
        erros.push("Você deve ter pelo menos 13 anos para se cadastrar");
    }

    // Validação de E-mail
    if (!validarEmail(email)) {
        erros.push("Formato de e-mail inválido");
    }

    // Validação de Senha
    if (!validarSenha(senha)) {
        erros.push("Senha deve ter: 8+ caracteres, 1 maiúscula, 1 minúscula e 1 número");
    }

    // Confirmação de Senha
    if (senha !== confirmaSenha) {
        erros.push("As senhas não coincidem");
    }

    if (classificacao !== 10) {
        erros.push("A classificação indicativa correta do Roblox é 10+");
    }

    // Validação Ano Roblox
    if (!validarAnoRoblox(robloxAno)) {
        erros.push("Resposta incorreta sobre o ano de criação do Roblox");
    }

    // Exibição de erros
    if (erros.length > 0) {
        alert("ERROS ENCONTRADOS:\n\n" + erros.join("\n• "));
        return false;
    }

    alert("Formulário enviado com sucesso!");
    return true;
}

// Funções de Validação
function validarNome(nome) {
    return /^[A-ZÀ-Ÿ][a-zçà-ÿ]+\s([A-ZÀ-Ÿ][a-zçà-ÿ]+){1,}$/.test(nome);
}

function validarNickname(nickname) {
    return !/^\d+$/.test(nickname) && nickname.length >= 3;
}

function validarIdade(birthday) {
    if (!birthday) return false;
    
    const dataNascimento = new Date(birthday);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const diferencaMeses = hoje.getMonth() - dataNascimento.getMonth();
    
    return idade > 13 || 
          (idade === 13 && 
          (diferencaMeses > 0 || 
          (diferencaMeses === 0 && hoje.getDate() >= dataNascimento.getDate())));
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(senha);
}

function validarAnoRoblox(robloxAno) {
    return robloxAno && robloxAno.value === "2006";
}

// Atualização dinâmica do range
document.getElementById('vol').addEventListener('input', function(e) {
    document.getElementById('volumeOutput').value = e.target.value;
});

// Validação em tempo real da classificação
document.getElementById('classificacao').addEventListener('change', function(e) {
    if (parseInt(e.target.value) !== 10) {
        this.setCustomValidity('A classificação deve ser 10');
    } else {
        this.setCustomValidity('');
    }
});

// Validação em tempo real da data de nascimento
document.getElementById('birthday').addEventListener('change', function(e) {
    if (!validarIdade(e.target.value)) {
        this.setCustomValidity('Você precisa ter pelo menos 13 anos');
    } else {
        this.setCustomValidity('');
    }
});