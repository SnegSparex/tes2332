const generateRandomId = () => Math.random().toString(36).substring(2, 9);
const generateRandomPhone = () => `+1 (555) ${Math.floor(100+Math.random()*900)}-${Math.floor(1000+Math.random()*9000)}`;

const RenderAbout = () => {
    document.querySelector('#content').innerHTML = `
        <div class="fade-in">
            <h1>Expert Solutions for Modern Web</h1>
            <p>Our infrastructure ID: ${generateRandomId()}</p>
            <p>This Single Page Application utilizes asynchronous state management and serverless deployment models to ensure high availability and performance.</p>
        </div>
    `;
};

const RenderGallery = () => {
    let images = '';
    for(let i=0; i<9; i++) {
        images += `<img src="https://picsum.photos/800/800?random=${i+20}" loading="lazy" alt="Project Image">`;
    }
    document.querySelector('#content').innerHTML = `
        <h1>Project Gallery</h1>
        <div class="gallery-grid">${images}</div>
    `;
};

const RenderContact = () => {
    document.querySelector('#content').innerHTML = `
        <div class="contact-box">
            <h1>Contact Us</h1>
            <p>Support Line: ${generateRandomPhone()}</p>
            <form id="contact-form">
                <input type="text" id="name" placeholder="Full Name" required minlength="3">
                <input type="email" id="email" placeholder="Email Address" required>
                <textarea id="message" rows="4" placeholder="Your Message" required minlength="10"></textarea>
                <div class="captcha-row">
                    <input type="checkbox" id="captcha" required>
                    <label for="captcha">I verify that I am not a robot</label>
                </div>
                <button type="submit" class="submit-btn">Verify and Send</button>
            </form>
            <div id="status" style="margin-top: 1rem; text-align: center; font-weight: 600;"></div>
        </div>
    `;

    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('status');
        status.style.color = "#10b981";
        status.innerText = "Processing request...";
        setTimeout(() => {
            status.innerText = "Message transmitted successfully.";
            e.target.reset();
        }, 1500);
    });
};

const handleRoute = () => {
    const search = window.location.search;
    if (search.includes('gallery')) RenderGallery();
    else if (search.includes('contact')) RenderContact();
    else RenderAbout();
};

document.querySelector('#about-link').addEventListener('click', () => {
    history.pushState({}, "", "?about");
    handleRoute();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    history.pushState({}, "", "?gallery");
    handleRoute();
});

document.querySelector('#contact-link').addEventListener('click', () => {
    history.pushState({}, "", "?contact");
    handleRoute();
});

document.querySelector('#theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target.tagName === 'IMG' && e.target.closest('.gallery-grid')) {
        modal.style.display = 'flex';
        document.getElementById('modal-img').src = e.target.src;
    }
    if (e.target.id === 'modal-close' || e.target.id === 'modal') {
        modal.style.display = 'none';
    }
});

window.onpopstate = handleRoute;
handleRoute();