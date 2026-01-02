// 1. Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. FAQ Accordion Logic
const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
}

// 3. Fetch Text Logic (UPDATED)
async function fetchText(fileName) {
    const modal = document.getElementById('textModal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    // --- NEW: Dictionary for proper Titles ---
    const properTitles = {
        'terms': 'Terms & Conditions',
        'refunds': 'Returns & Refunds',
        'privacy': 'Privacy Policy',
    };

    modal.style.display = "block";
    
    // Check if we have a proper name in our list, otherwise just make it uppercase
    if (properTitles[fileName]) {
        modalTitle.innerText = properTitles[fileName];
    } else {
        modalTitle.innerText = fileName.toUpperCase();
    }
    
    modalBody.innerText = "Loading content...";

    try {
        const response = await fetch(`assets/txt/${fileName}.txt`);
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();
        modalBody.innerText = text;
    } catch (error) {
        console.error(error);
        modalBody.innerText = "⚠️ Error loading text.";
    }
}

// 4. Close Modal Logic
function closeModal() {
    document.getElementById('textModal').style.display = "none";
}
window.onclick = function(event) {
    const modal = document.getElementById('textModal');
    if (event.target == modal) modal.style.display = "none";
}