const axios = require('axios');
const supabase = require('../services/supabaseClient');
const ENDPOINTS = {
  tender: process.env.SAMPLE_TENDER || 'https://kaiken.up.railway.app/webhook/tender-sample',
  product: process.env.SAMPLE_PRODUCT || 'https://kaiken.up.railway.app/webhook/product-sample',
  order: process.env.SAMPLE_ORDER || 'https://kaiken.up.railway.app/webhook/order-sample'
};

function normalizeId(id) {
  return id.replace(/-/g, "");
}

async function importAll() {
    try {
        // Productos
        const prodRes = await axios.get(ENDPOINTS.product);
        const products = prodRes.data;
        console.log('Productos recibidos:', products.length);
        for (const p of products) {
            const payload = {
                sku: p.sku,
                nombre: p.title,
                costo: p.cost
            };
            // upsert para no duplicar
            await supabase.from('product').upsert(payload, { onConflict: ['sku'] });
        }
        // Licitaciones
        const tRes = await axios.get(ENDPOINTS.tender);
        const tenders = tRes.data;
        console.log('Tenders recibidos:', tenders.length);
        for (const t of tenders) {
            const row = {
                id: normalizeId(t.id),
                nombre_cliente: t.client,
                fecha_adjudicacion: t.delivery_date
            };
            await supabase.from('tender').upsert(row, { onConflict: ['id'] });
        }
        // Ordenes
        const oRes = await axios.get(ENDPOINTS.order);
        const orders = oRes.data;
        console.log('Orders recibidos:', orders.length);
        for (const o of orders) {
            const row = {
                id: o.id,
                tender_id: o.tender_id,
                product_sku: o.product_id,
                cantidad: o.quantity,
                precio_unitario: o.price
            };
            // aquí podríamos validar antes de insertar
            const { error } = await supabase.from('tender_order').insert(row);

            if (error) {
                console.warn("insert order warning", error.message);
            }
        }
        console.log('Import finalizado');
    } catch (err) {
        console.error('Error import:', err.message || err);
    }
}

importAll();