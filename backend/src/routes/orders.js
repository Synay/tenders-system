const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

router.post('/', async (req, res) => {
    const { tender_id, product_sku, cantidad, precio_unitario } = req.body;

    if (!tender_id || !product_sku || !cantidad || !precio_unitario) {
        return res.status(400).json({ error: 'Faltan campos' });
    }

    // validar existencia de product
    const { data: prod, error: pErr } = await supabase
        .from('product')
        .select('*')
        .eq('sku', product_sku)
        .single();

    if (pErr || !prod) {
        return res.status(400).json({ error: 'Producto no existe' });
    }

    // validar precio > costo (regla de negocio)
    if (Number(precio_unitario) <= Number(prod.costo)) {
        return res.status(400).json({ error: 'precio_unitario debe ser mayor que costo del producto' });
    }

    // validar existencia de tender
    const { data: t, error: tErr } = await supabase
        .from('tender')
        .select('*')
        .eq('id', tender_id)
        .single();

    if (tErr || !t) {
        return res.status(400).json({ error: 'Tender no existe' });
    }

    // generar id = tender_id-product_sku
    const id = `${tender_id}-${product_sku}`;

    const { data, error } = await supabase
        .from('tender_order')
        .insert([{
            id,
            tender_id,
            product_sku,
            cantidad,
            precio_unitario
        }])
        .select();

    if (error) {
        return res.status(500).json({ error });
    }

    res.status(201).json(data[0]);
});

module.exports = router;
