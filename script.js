let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const link = document.querySelector('header nav a[href*=' + id + ']')
                if (link) {
                    link.classList.add('active');
                }
            });
        }
    })
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const form = document.getElementById('mail-form');

const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

function showMessage(element) {
    element.classList.remove('hidden');
    element.style.display = 'block';

    setTimeout(() => {
        element.style.display = 'none';
    }, 10000); // A mensagem some após 3 segundos
}

form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const formProps = Object.fromEntries(formData);

    const opcoes = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formProps)
    };

    fetch("https://60bfbc0597295a0017c43b7e.mockapi.io/argon", opcoes)
        .then(response => {
            if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
            return response.json();
        })
        .then(() => {
            ev.target.reset();
            showMessage(successMessage);
        })
        .catch(error => {
            console.error('Erro:', error);
            showMessage(errorMessage);
        });
});