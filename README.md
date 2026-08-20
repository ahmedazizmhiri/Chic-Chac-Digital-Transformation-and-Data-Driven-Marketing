<p align="center">
  <img
    src="assets/img/logo/logo-chicchac.webp"
    alt="Chic Chac"
    width="160"
  />
</p>

<h1 align="center">Chic Chac — B2C Website</h1>

<p align="center">
  Responsive B2C web experience for a men's hair salon, combining customer journeys,
  local SEO, service presentation, interactive booking UX and frontend catalog experiences.
</p>

<p align="center">
  <strong>Live demo:</strong>
  https://chic-chac.netlify.app/
</p>

---

## Overview

Chic Chac is a customer-facing web project developed for a men's hair salon in Noisy-le-Grand, France.

The project focuses on the digital customer journey around the salon: discovering the brand, exploring services and pricing, viewing the portfolio, preparing a booking, browsing the product experience and contacting the business.

This repository preserves the **B2C frontend** of the project as a professional portfolio case study.

The historical administration/back-office source is not part of this repository.

---

## Business Context

The website was designed to provide Chic Chac with a structured digital presence capable of supporting several customer-facing objectives:

- present the salon, services, expertise and pricing;
- improve local digital visibility;
- provide responsive navigation across desktop and mobile;
- guide visitors toward reservation and contact journeys;
- showcase hairstyle and barbering work through a visual portfolio;
- present a product-catalog experience;
- structure business information for search engines.

The result is a multi-page B2C experience centered on usability, local discovery and customer conversion paths.

---

## My Contribution

My work on the project included:

- B2C frontend integration and customization;
- responsive page implementation;
- customer journey design;
- reservation interface implementation;
- contact journey implementation;
- frontend product-catalog experience;
- service and pricing presentation;
- portfolio and gallery integration;
- mobile navigation behavior;
- local SEO implementation;
- Schema.org structured data integration;
- sitemap and robots configuration;
- frontend validation and interaction logic;
- deployment preparation;
- legacy backend decoupling and archival hardening.

The current public version has been intentionally adapted into a safe frontend case study after the historical backend services became unavailable.

---

## Main User Journeys

### Home

The landing page introduces the Chic Chac brand, salon expertise, services, pricing and key calls to action.

It acts as the primary entry point toward the service, portfolio, booking, shop and contact experiences.

### About

The About experience presents the salon's professional positioning, expertise and team-oriented content.

### Services

A dedicated service journey presents the main haircut, beard and grooming services together with supporting commercial information.

### Portfolio

The portfolio provides a visual showcase of the salon's work and supports the brand's customer-facing presentation.

### Booking Demo

The original project included a backend-connected reservation workflow.

Because the historical backend is no longer part of the active project, the public repository now contains an **interactive frontend booking demonstration**.

The demo preserves:

- form interaction;
- field validation;
- service selection;
- date selection;
- time selection;
- booking UX;
- confirmation messaging.

No reservation is transmitted to a backend from the archived demo.

### Product Catalog Demo

The historical product catalog also depended on a backend service.

The current version preserves the frontend catalog experience in demonstration mode while making it explicit that the historical product backend is not connected.

No product transaction, cart checkout or payment operation is performed.

### Contact

The contact form performs client-side validation and prepares an e-mail through the visitor's local mail client.

The website does not submit contact-form data to a project backend.

---

## Frontend Architecture

The project uses a traditional multi-page frontend architecture.

```text
Chic-Chac-Website/
│
├── index.html
├── about.html
├── services.html
├── shop.html
├── portfolio.html
├── reservation.html
├── contact.html
├── robots.txt
├── sitemap.xml
│
└── assets/
    ├── css/
    ├── fonts/
    ├── img/
    ├── js/
    └── scss/
```

Each main customer journey is represented by a dedicated HTML page while shared styling, JavaScript behavior, images and frontend dependencies are organized under `assets/`.

---

## Technology Stack

| Area | Technologies |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, SCSS |
| Responsive UI | Bootstrap |
| Frontend logic | JavaScript |
| DOM / legacy UI ecosystem | jQuery |
| UI interactions | SweetAlert2 |
| Sliders & galleries | Slick, Owl Carousel, Magnific Popup |
| Icons | Font Awesome, Flaticon |
| SEO | Meta tags, Schema.org, sitemap.xml, robots.txt |
| Analytics | Google Analytics |
| Maps | Google Maps embed |
| Deployment | Netlify |
| Version control | Git / GitHub |

The project intentionally remains a lightweight frontend application rather than introducing a modern framework that is unnecessary for the archived B2C scope.

---

## Local SEO

Local search visibility was an important part of the implementation.

The project includes SEO-oriented elements such as:

- page-specific titles and descriptions;
- geographic metadata;
- salon location information;
- structured business information;
- Schema.org `HairSalon` data;
- service microdata;
- telephone and contact information;
- semantic headings;
- image alternative text;
- canonical metadata;
- sitemap configuration;
- robots configuration;
- social profile references.

The implementation demonstrates how frontend development and local digital visibility can be combined within a customer-facing business website.

---

## Responsive Experience

The interface was designed for both desktop and mobile browsing.

Responsive behavior includes:

- adaptive layouts;
- mobile navigation;
- responsive service sections;
- flexible gallery presentation;
- mobile-friendly calls to action;
- responsive forms;
- touch-friendly customer journeys.

---

## Archived Backend Strategy

The original project used backend services for some operational workflows.

Those historical services are no longer connected to this repository.

Instead of leaving broken or misleading integrations in the public version, the repository was cleaned and converted into a controlled frontend case study.

Current behavior:

| Feature | Current status |
|---|---|
| Main B2C website | Active frontend |
| Responsive navigation | Active |
| Services | Active |
| Portfolio | Active |
| Local SEO implementation | Present |
| Booking interface | Interactive demo |
| Booking backend | Not connected |
| Product catalog | Frontend demo |
| Product backend | Not connected |
| Contact form | Local e-mail preparation |
| Contact backend | Not used |
| Payments / checkout | Not implemented |
| Administration / back office | Not included |

This keeps the repository technically understandable for reviewers without pretending that unavailable historical infrastructure is still operational.

---

## Privacy & Data Handling

The archived frontend has been cleaned to avoid sending booking, catalog or contact information to obsolete project APIs.

In the current public version:

- the booking demo performs local frontend validation only;
- booking data is not submitted to the historical backend;
- the product demo performs no product API request;
- no checkout or payment transaction occurs;
- the contact journey prepares an e-mail through the visitor's own mail client.

This makes the deployed demonstration appropriate for portfolio and technical-review purposes.

---

## Running Locally

Because this is a static frontend project, no application server or database is required for the current demo.

Clone the repository:

```bash
git clone https://github.com/mhiriaziz13-gif/Chic-Chac-Website.git
cd Chic-Chac-Website
```

You can then serve the directory using any static HTTP server.

For example with Python:

```bash
python -m http.server 8000
```

Then open the local server in your browser.

A VS Code extension such as Live Server can also be used.

---

## Project Status

**Status:** Archived B2C project / live frontend demonstration.

The public version is maintained primarily as a professional case study demonstrating:

- frontend implementation;
- customer-experience design;
- responsive web development;
- local SEO;
- digital business presence;
- frontend form validation;
- legacy-system decoupling;
- safe archival of a previously backend-connected web application.

---

## Repository Scope

This repository contains the preserved **B2C website only**.

It does not contain the historical administration/back-office application.

The absence of the back-office source is intentional in the current portfolio version and no reconstructed administrative system is presented as part of this repository.

---

## License & Third-Party Components

This repository is published as a professional portfolio case study.

No project-level open-source license is granted by this repository.

Third-party libraries, frameworks, fonts, icons and other dependencies remain subject to their respective licenses and terms.

---

## Author

**Ahmed Aziz Mhiri**

Digital Transformation • Marketing & Commercial Analytics • Business Intelligence • Automation

Portfolio:  
https://ahmedaziz-portfolio.vercel.app/

LinkedIn:  
https://www.linkedin.com/in/ahmed-aziz-mhiri/