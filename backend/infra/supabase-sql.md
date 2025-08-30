-- Tabla tender (licitación)
CREATE TABLE IF NOT EXISTS tender (
id TEXT PRIMARY KEY,
nombre_cliente TEXT NOT NULL,
fecha_adjudicacion DATE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
-- Tabla product
CREATE TABLE IF NOT EXISTS product (
sku BIGINT PRIMARY KEY,
nombre TEXT NOT NULL,
costo NUMERIC(12,2) NOT NULL CHECK (costo >= 0),
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
-- Tabla tender_order (detalle de adjudicación)
CREATE TABLE IF NOT EXISTS tender_order (
id VARCHAR(150) PRIMARY KEY,
tender_id TEXT NOT NULL REFERENCES tender(id) ON DELETE CASCADE,
product_sku BIGINT NOT NULL REFERENCES product(sku) ON DELETE RESTRICT,
cantidad INTEGER NOT NULL CHECK (cantidad > 0),
precio_unitario NUMERIC(12,2) NOT NULL, -- precio aplicado en la licitación
created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
-- VIEW para calcular margen por licitación (útil para listar)
CREATE OR REPLACE VIEW tender_margin AS
SELECT
t.id AS tender_id,
t.nombre_cliente,
t.fecha_adjudicacion,
SUM( (o.precio_unitario - p.costo) * o.cantidad )::NUMERIC(14,2) AS
margen_total
FROM tender t
JOIN tender_order o ON t.id = o.tender_id
JOIN product p ON o.product_sku = p.sku
GROUP BY t.id, t.nombre_cliente, t.fecha_adjudicacion