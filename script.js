document.getElementById('start-button').addEventListener('click', function() {
    this.style.display = 'none';
    startFireworks();
});

function startFireworks() {
    const container = document.getElementById('fireworks-container');

    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        container.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 2000);
    }

    setInterval(createFirework, 300);
}