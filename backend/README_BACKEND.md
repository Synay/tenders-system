# Backend — Mini Sistema de Licitaciones (Node.js + Supabase)

## Requisitos
- Node.js (>=16)
- Cuenta y proyecto Supabase

## 1) Crear esquema en Supabase
1. Entra al panel de Supabase -> SQL Editor
2. Copia y pega el contenido de `infra/supabase-sql.md` y ejecútalo.

## 2) Configurar variables de entorno
1. Copia `.env.example` a `.env` y completa `SUPABASE_URL` y `SUPABASE_KEY` (service_role para el seed).

## 3) Instalar dependencias
```bash
npm install
```

## 4) Cargar datos de ejemplo
```bash
npm run seed
```

## 5) Levantar servidor en modo dev
```bash
npm run dev
# o
npm start
```

## 6) Endpoints principales
- GET `/api/tenders` -> lista con margen (vista `tender_margin`)
- GET `/api/tenders/:id` -> detalle con ordenes y productos
- POST `/api/tenders` -> crear licitacion con items:
  ```json
  {
    "tender": { "id": "ID-123", "nombre_cliente": "Cliente X", "fecha_adjudicacion": "2025-08-01" },
    "items": [ { "product_sku": "SKU1", "cantidad": 10, "precio_unitario": 120.5 } ]
  }
  ```
- GET `/api/products` -> listar productos
- POST `/api/products` -> crear producto
- POST `/api/orders` -> crear orden individual

## 7) Notas
- No subas tu `SUPABASE_KEY` (service_role) a repositorio público.
- Las validaciones críticas están en el backend (precio > costo, no en la licitación vacía, existencia de referencias)