let currentLocation = { x: 0, y: 0 }; // Default is Living Room

function navigate() {
    const destinationId = document.getElementById('destination').value;
    const destinationRoom = document.getElementById(destinationId);

    // Get destination coordinates
    const destX = parseInt(destinationRoom.dataset.x);
    const destY = parseInt(destinationRoom.dataset.y);

    // Calculate and animate
    const path = calculatePath(currentLocation.x, currentLocation.y, destX, destY);
    drawPath(path);
    animateUser(path);

    // Update current location
    currentLocation = { x: destX, y: destY };
}

function calculatePath(startX, startY, destX, destY) {
    const path = [];
    let x = startX;
    let y = startY;

    while (x !== destX) {
        x += x < destX ? 1 : -1;
        path.push({ x, y });
    }

    while (y !== destY) {
        y += y < destY ? 1 : -1;
        path.push({ x, y });
    }

    return path;
}

function drawPath(path) {
    const container = document.getElementById('path-container');
    container.innerHTML = ''; // Clear previous paths

    path.forEach((step) => {
        const dot = document.createElement('div');
        dot.classList.add('dotted-path');
        dot.style.transform = `translate(${step.x * 160 + 70}px, ${step.y * 160 + 70}px)`;
        container.appendChild(dot);
    });
}

function animateUser(path) {
    const user = document.getElementById('user');

    path.forEach((step, index) => {
        setTimeout(() => {
            user.style.transform = `translate(${step.x * 160}px, ${step.y * 160}px)`;
        }, index * 500); // Smooth transition delay
    });
}
