document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("reservation-form"),t=e.querySelector('button[type="submit"]'),a=document.getElementById("date"),r=document.getElementById("hour"),i=document.getElementById("minute"),n=document.getElementById("phone");function l(){let e=new Date(a.value),t=new Date;return t.setHours(0,0,0,0),e.setHours(0,0,0,0),!(e<t)||(a.value="",d("error","Veuillez s\xe9lectionner une date valide \xe0 partir d'aujourd'hui."),!1)}function o(){let e=new Date(a.value),t=new Date,n=parseInt(r.value),l=parseInt(i.value);if(e.toDateString()===t.toDateString()){let o=new Date,s=new Date(e);if(s.setHours(n,l,0,0),s<=o)return r.value="",i.value="",d("error","Veuillez s\xe9lectionner une heure future."),!1}return!0}function s(){if(document.getElementById("reservationModal"))return;let e=`
            <div class="modal fade" id="reservationModal" tabindex="-1" role="dialog" aria-labelledby="reservationModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="reservationModalLabel">Notification</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="reservationModalBody">
                            <!-- Modal content will be dynamically inserted here -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        `,t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t.firstChild)}function d(e,t){s();let a=document.getElementById("reservationModalBody"),r=document.getElementById("reservationModalLabel");if(!a||!r){alert(t);return}r.textContent="success"===e?"R\xe9servation Confirm\xe9e":"Erreur",a.innerHTML=`
            <div class="text-center">
                <i class="fas fa-${"success"===e?"check":"times"}-circle text-${"success"===e?"success":"danger"} mb-3" style="font-size: 3rem;"></i>
                <p>${t}</p>
            </div>
        `;let i=document.getElementById("reservationModal");window.jQuery&&$("#reservationModal").modal?$("#reservationModal").modal("show"):i?(i.style.display="block",i.classList.add("show")):alert(t)}async function u(e,t){try{let a=await fetch("https://chic-chac-fdgybug7fqdcazem.francecentral-01.azurewebsites.net/api/reservations");if(!a.ok)throw Error("Impossible de v\xe9rifier les disponibilit\xe9s");return!(await a.json()).some(a=>a.date===e&&a.time===t)}catch(r){throw console.error("Error checking availability:",r),Error("Erreur de v\xe9rification de disponibilit\xe9")}}async function c(e){let t=await fetch("https://chic-chac-fdgybug7fqdcazem.francecentral-01.azurewebsites.net/api/reservations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw Error((await t.json()).error||"Erreur lors de la r\xe9servation");return await t.json()}let v,m,h,f,b,x,p,g;s(),n.addEventListener("input",function(e){this.value=this.value.replace(/\D/g,"").slice(0,10)}),a.addEventListener("change",function(){l(),r.value="",i.value=""}),r.addEventListener("change",function(){a.value&&o()}),i.addEventListener("change",function(){a.value&&o()}),e.addEventListener("submit",async function(s){s.preventDefault(),t.disabled=!0,t.innerHTML=`
            <div class="loader-container">
                <div class="loader"></div>
                V\xe9rification en cours...
            </div>
        `;try{var v,m;let{fullName:h,phone:f,service:b,date:x,hour:p,minute:g}=function e(){let t=document.getElementById("full-name").value.trim(),l=n.value.trim(),o=document.getElementById("service").value,s=a.value,d=r.value,u=i.value;if(t.length<2)throw Error("Veuillez entrer un nom valide.");if(!/^\d{10}$/.test(l))throw Error("Num\xe9ro de t\xe9l\xe9phone invalide. Utilisez 10 chiffres.");if(!o)throw Error("Veuillez s\xe9lectionner un service.");if(!s)throw Error("Veuillez s\xe9lectionner une date.");if(!d||!u)throw Error("Veuillez s\xe9lectionner une heure et des minutes.");return{fullName:t,phone:l,service:o,date:s,hour:d,minute:u}}();if(!l()||!o())throw Error("Veuillez v\xe9rifier la date et l'heure s\xe9lectionn\xe9es.");let y=`${(v=p).padStart(2,"0")}:${(m=g).padStart(2,"0")}`;if(!await u(x,y))throw Error("Ce cr\xe9neau est d\xe9j\xe0 r\xe9serv\xe9. Veuillez choisir un autre horaire.");await c({name:h,phone:f,date:x,time:y,service:b}),d("success",`Votre r\xe9servation a \xe9t\xe9 confirm\xe9e !<br>D\xe9tails :<br>Date : ${x}<br>Heure : ${y}`),e.reset()}catch(w){d("error",w.message)}finally{t.disabled=!1,t.innerHTML=`
                <i class="fas fa-calendar-check"></i> Confirmer ma r\xe9servation
            `}}),f=`${v.getFullYear()}-${String(v.getMonth()+1).padStart(2,"0")}-${m=String((v=new Date).getDate()).padStart(2,"0")}`,a.setAttribute("min",f),g=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-${x=String((b=new Date(v.getFullYear(),v.getMonth()+3,v.getDate())).getDate()).padStart(2,"0")}`,a.setAttribute("max",g);let y=document.createElement("style");y.textContent=`
        .loader-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3D2B1F;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `,document.head.appendChild(y)});
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