```bash
# Mini Sistema de Gestión de Licitaciones Internas

Este proyecto contiene **backend en Node.js + Supabase** y **frontend en Angular 20 Standalone + Angular Material** para gestionar licitaciones públicas, productos y órdenes.

## Backend (Node.js + Supabase)

### Estructura

backend/
├── index.js
├── routes/
│ ├── tenders.js
│ ├── products.js
│ └── orders.js
└── services/
└── supabaseClient.js


### Instalación

1. Navega a la carpeta del backend:

cd backend

    Instala las dependencias:

npm install

Configuración

Crea un archivo .env en la raíz del proyecto y agrega las credenciales de Supabase:

SUPABASE_URL=<tu_url_supabase>
SUPABASE_KEY=<tu_anon_or_service_key>
PORT=4000

Ejecutar

    Para iniciar el servidor:

node index.js

    O para usar nodemon y evitar reinicios manuales:

npx nodemon index.js

Endpoints de ejemplo

    GET /api/tenders – Lista de licitaciones.

    GET /api/products – Lista de productos.

    GET /api/orders – Lista de órdenes.

    POST /api/tenders – Crear licitación.

    POST /api/products – Crear producto.

    POST /api/orders – Crear orden.

Frontend (Angular 20 Standalone + Angular Material)
Estructura

frontend/
├── src/app/
│   ├── app.ts
│   ├── core/api.service.ts
│   ├── shared/material.ts
│   ├── tenders/
│   │   ├── tenders-list.ts
│   │   └── tenders-detail.ts
│   └── products/
│       ├── products-list.ts
│       └── products-form.ts
└── main.ts

Instalación

    Navega a la carpeta del frontend:

cd frontend

    Instala las dependencias:

npm install

Ejecutar

    Para iniciar el servidor de desarrollo:

ng serve -o

    El frontend se conecta al backend en http://localhost:4000/api. Si tu backend corre en otra URL, ajusta ApiService.base.

Componentes
TendersListComponent

    Listado de licitaciones.

TenderDetailComponent

    Detalle de licitación y agregar productos.

ProductListComponent

    Listado de productos.

ProductFormComponent

    Formulario para crear producto.

Características

    Angular Standalone (sin NgModules).

    Angular Material UI.

    Reactive Forms para formularios.

    Validaciones:

        Precio > Costo.

        Cantidad mínima de 1.

    Cálculo de márgenes:

        Margen unitario y total.
