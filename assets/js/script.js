async function getpfp(id) {
    try {
        const response = await fetch(`https://avatar-cyan.vercel.app/api/pfp/${id}/image`, {
            method: 'GET',
            redirect: 'follow'
        });
        return response.url;
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        return null;
    }
}

async function updateProfilePicture() {
    const id = '451335202342436866';
    const profilePictureUrl = await getpfp(id);

    if (profilePictureUrl) {
        const profilePictureElement = document.querySelector('.profile-picture');
        profilePictureElement.src = profilePictureUrl;
    } else {
        console.error('Failed to update profile picture: URL is null');
    }
}

function navigate(event, sectionId) {
    event.preventDefault();

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    history.pushState(null, null, '#' + sectionId);

    document.querySelectorAll('nav a').forEach(navLink => {
        navLink.classList.remove('selected');
    });
    const selectedNavLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    if (selectedNavLink) {
        selectedNavLink.classList.add('selected');
    }
}

function handleHashChange() {
    const sectionId = location.hash.replace('#', '') || 'home';
    navigate({ preventDefault: () => { } }, sectionId);
}

function calculateRotation(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    return {
        rotateX: (deltaY / centerY) * 10,
        rotateY: (deltaX / centerX) * 10
    };
}

function handleMouseMove(event, element) {
    const {rotateX, rotateY} = calculateRotation(event, element);

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function handleMouseEnter(element) {
    element.style.transition = 'none';
}

function handleMouseLeave(element) {
    element.style.transition = 'transform 0.5s ease-in-out';
    element.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

window.addEventListener('load', () => {
    handleHashChange();
    updateProfilePicture();

    const profilePicture = document.querySelector('.profile-picture');
    profilePicture.addEventListener('mousemove', (event) => {
        handleMouseMove(event, profilePicture)
    });
    profilePicture.addEventListener('mouseleave', () => {
        handleMouseLeave(profilePicture)
    });
    profilePicture.addEventListener('mouseenter', () => {
        handleMouseEnter(profilePicture)
    });

    /*
    const displayImages = document.querySelectorAll('.art');

    displayImages.forEach(image => {
        image.addEventListener('mousemove', (event) => {
            handleMouseMove(event, image)
        });
        image.addEventListener('mouseleave', () => {
            handleMouseLeave(image)
        });
        image.addEventListener('mouseenter', () => {
            handleMouseEnter(image)
        });
    });*/
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const starCount = 40;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height, 
            size: Math.random() * 3 + 1,
            opacity: Math.random(),
            twinkleSpeed: Math.random() * 0.01 + 0.01
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0) {
                star.twinkleSpeed *= -1;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(drawStars);
    }

    drawStars();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

window.addEventListener('hashchange', handleHashChange);