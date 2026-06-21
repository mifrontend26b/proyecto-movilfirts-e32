import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Menú Desplegable( tipo hambuergueza)
    const btn = document.getElementById('menu-btn');
    const nav = document.querySelector('nav ul');
    btn?.addEventListener('click', () => nav?.classList.toggle('active'));

    // Formulario de Pedidos (Integración al Backend)
    const form = document.getElementById('formPedido');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            cantidad: document.getElementById('cantidad').value,
            detalles: document.getElementById('detalles').value
        };

        try {
            const res = await fetch('http://localhost:3000/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resJson = await res.json();
            alert('Pedido recibido: ' + resJson.id);
            form.reset();
        } catch (error) {
            console.error('Error de red:', error);
            alert('Servidor no conectado.');
        }
    });
});