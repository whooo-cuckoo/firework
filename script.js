// 初始化场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('fireworks-container').appendChild(renderer.domElement);

// 设置相机位置
camera.position.z = 50;

// 创建烟花粒子
const particles = [];
function createFirework() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const color = new THREE.Color();
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        vertices.push(x * 10, y * 10, z * 10);
        color.setHSL(Math.random(), 1.0, 0.5);
        colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.2, vertexColors: true });
    const firework = new THREE.Points(geometry, material);
    firework.position.set(Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25);
    scene.add(firework);
    particles.push(firework);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    particles.forEach((particle, index) => {
        particle.position.y += 0.1;
        if (particle.position.y > 50) {
            scene.remove(particle);
            particles.splice(index, 1);
            createFirework();
        }
    });
    renderer.render(scene, camera);
}

// 初始化烟花
for (let i = 0; i < 10; i++) {
    createFirework();
}

// 开始动画
animate();

// 窗口大小调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});