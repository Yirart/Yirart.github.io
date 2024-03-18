const releaseDate = new Date('2024-04-01T00:00:00');

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = releaseDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.querySelector('.countdown').innerHTML = `<span class="countdown-item">${days}j</span> <span class="countdown-item">${hours}h</span> <span class="countdown-item">${minutes}m</span> <span class="countdown-item">${seconds}s</span>`;
}

updateCountdown();
setInterval(updateCountdown, 1000);


const countdown = document.querySelector('.countdown');
const featuresList = document.querySelector('.features-list');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        if (entry.target === countdown) {
            countdown.style.animation = "fadeInUp 0.8s ease-out forwards";
        } else if (entry.target === featuresList) {
            featuresList.style.animation = "fadeInUp 0.8s ease-out forwards";
        }
        observer.unobserve(entry.target);
    }
  });
});

observer.observe(countdown);
observer.observe(featuresList);


const canvas = document.querySelector('.features-section canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;

const starCount = 250;
const stars = [];

class Star
{
    constructor()
    {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.speed = Math.random() * 0.5 + 0.5;
        this.brightness = Math.random();
        this.directionX = Math.random();
        this.directionY = Math.random();
        this.lifetime = Math.random() * 1000;
    }

    update()
    {
        this.y += this.speed * this.directionY * 1.2;
        this.x += this.speed * this.directionX * 2;
        this.brightness += Math.random() * 0.1 - 0.05;
        this.lifetime--;

        if (this.brightness < 0 || this.x >= window.innerWidth || this.y >= window.innerHeight)
        {
            const index = stars.indexOf(this);
            stars.splice(index, 1);
            stars.push(new Star());
        }

        else if (this.brightness > 1)
            this.brightness = 1;

        if (this.lifetime <= 0)
            this.brightness -= 0.01;
    }

    draw()
    {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fillRect(this.x, this.y, this.brightness * 2, this.brightness * 2);
    }
}

for (let i = 0; i < starCount; i++)
    stars.push(new Star());


function animate()
{
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < starCount; i++)
    {
        stars[i].update();
        stars[i].draw();
    }
    requestAnimationFrame(animate);
}

animate();