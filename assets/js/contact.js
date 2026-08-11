document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("contactForm"),t=document.getElementById("name"),a=document.getElementById("email"),r=document.getElementById("message"),n=e.querySelector('button[type="submit"]');function s(){let e=!0;return""===t.value.trim()?(i(t,"Name is required"),e=!1):l(t),""===a.value.trim()?(i(a,"Email is required"),e=!1):/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.value.trim())?l(a):(i(a,"Please enter a valid email address"),e=!1),""===r.value.trim()?(i(r,"Message is required"),e=!1):l(r),e}function i(e,t){l(e);let a=document.createElement("div");a.className="error-message text-danger",a.textContent=t,e.classList.add("is-invalid"),e.parentNode.appendChild(a)}function l(e){e.classList.remove("is-invalid");let t=e.parentNode.querySelector(".error-message");t&&t.remove()}e.addEventListener("submit",async i=>{if(i.preventDefault(),n.disabled=!0,n.innerHTML="Sending...",!s()){n.disabled=!1,n.innerHTML="Envoy\xe9";return}try{let l=await fetch("https://chic-chac-fdgybug7fqdcazem.francecentral-01.azurewebsites.net/api/contacts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.value.trim(),email:a.value.trim(),message:r.value.trim()})});if(!l.ok)throw Error("Network response was not ok");await l.json();let d=document.createElement("div");d.className="alert alert-success mt-3",d.textContent="Your message has been sent successfully!",e.appendChild(d),e.reset(),setTimeout(()=>{d.remove()},3e3)}catch(m){console.error("Error:",m);let o=document.createElement("div");o.className="alert alert-danger mt-3",o.textContent="Failed to send message. Please try again.",e.appendChild(o),setTimeout(()=>{o.remove()},3e3)}finally{n.disabled=!1,n.innerHTML="Envoy\xe9"}})});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if(menuToggle) {
        // Reset complet des événements
        menuToggle.replaceWith(menuToggle.cloneNode(true));
        
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function(e) {
            e.stopImmediatePropagation();
            document.querySelector('.mobile-sidebar').classList.add('active');
            document.querySelector('.mobile-menu-overlay').style.display = 'block';
        });
    }
});
document.querySelector('.mobile-menu-close').addEventListener('click', function(e) {
    e.stopPropagation();
    this.style.backgroundColor = 'transparent'; // Force la transparence
    document.querySelector('.mobile-sidebar').classList.remove('active');
    document.querySelector('.mobile-menu-overlay').style.display = 'none';
});