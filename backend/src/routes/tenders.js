const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

// Listado de licitaciones con margen (usa la VIEW tender_margin)
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tender_margin')
            .select('*')
            .order('fecha_adjudicacion', { ascending: false });
        if (error) return res.status(500).json({ error });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno' });
    }
});

// Detalle de una licitacion con sus ordenes y productos
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // obtener licitacion
        const { data: tender, error: e1 } = await supabase
            .from('tender')
            .select('*')
            .eq('id', id)
            .single();
        if (e1) return res.status(404).json({ error: 'Tender no encontrado' });
        // obtener ordenes con join un producto (dos llamadas o usar rpc/view)
        const { data: orders, error: e2 } = await supabase
            .from('tender_order')
            .select('*, product:product_sku (sku, nombre, costo)')
            .eq('tender_id', id);
        if (e2) return res.status(500).json({ error: e2 });
        // calcular margen en Node (opcional)
        const detalle = orders.map(o => ({
            id: o.id,
            product_sku: o.product_sku,
            nombre: o.product ? o.product.nombre : null,
            cantidad: o.cantidad,
            precio_unitario: parseFloat(o.precio_unitario),
            costo_unitario: o.product ? parseFloat(o.product.costo) : null,
            margen_unitario: o.product ? (parseFloat(o.precio_unitario) -
                parseFloat(o.product.costo)) : null,
            margen_total: o.product ? (parseFloat(o.precio_unitario) -
                parseFloat(o.product.costo)) * o.cantidad : null
        }));
        const margen_total = detalle.reduce((s, it) => s + (it.margen_total ||
            0), 0);
        res.json({ tender, detalle, margen_total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno' });
    }
});

module.exports = router;