function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var data = {
        "username": username,
        "password": password
    };

    fetch('http://191.252.178.166:8080/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            throw new Error('Não Autorizado');
        } else {
            throw new Error('Erro na requisição');
        }
    })
    .then(result => {
        window.location.href = 'sucesso.html?message=' + encodeURIComponent(result.message);
    })
    .catch(error => {
        console.error('Erro na requisição:', error.message);
        document.getElementById("errorMessage").innerText = error.message;
    });
}
document.getElementById("loginForm").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
});