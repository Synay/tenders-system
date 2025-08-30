const express = require('express');
const router = express.Router();
const supabase = require('../services/supabaseClient');

// List
router.get('/', async (req, res) => {
    const { data, error } = await
        supabase.from('product').select('*').order('nombre');
    if (error) return res.status(500).json({ error });
    res.json(data);
});

// Create
router.post('/', async (req, res) => {
    const { sku, nombre, costo } = req.body;
    if (!sku || !nombre) return res.status(400).json({ error: 'Faltan campos' });
    if (Number(costo) <= 0) return res.status(400).json({
        error: 'costo debe ser mayor que 0'
    });
    const { data, error } = await supabase.from('product').insert([{
        sku,
        nombre, 
        costo
    }]).select();
    if (error) return res.status(500).json({ error });
    res.status(201).json(data[0]);
});
module.exports = router;