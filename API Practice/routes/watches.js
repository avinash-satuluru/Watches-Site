const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const watch = require('../models/watchesmodel')
const mongoose = require('mongoose');


//getting all record
router.get('/', async (req, res) => {
    try {
        const watches = await watch.find()
        res.send(watches)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//getting one record
router.get('/:id', async (req, res) => {
    try {
        const watchData = await watch.findOne({ id: parseInt(req.params.id) }); // Convert string to number
        if (!watchData) {
            return res.status(404).json({ message: "Watch not found" });
        }
        res.json(watchData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/watches/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const watch = await watch.findOne({ id: parseInt(id, 10) });

        if (!watch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        res.json(watch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/name/:name', async (req, res) => {
    try {
        const watchData = await watch.findOne({ name: req.params.name });

        if (!watchData) {
            return res.status(404).json({ message: "Watch not found" });
        }

        res.json(watchData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/gender/:gender', async (req, res) => {
    try {
        const watchData = await watch.find({ gender: req.params.gender });

        if (!watchData) {
            return res.status(404).json({ message: "Watch not found" });
        }

        res.json(watchData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Posting an image
router.post('/images/uploads', upload.single('file'), (req, res) => {
    res.json(req.file)
})

//posting a record
router.post('/', async (req, res) => {

    try {
        // Ensure the request body is an array
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: "Request body must be an array of objects" });
        }

        // Insert multiple records using insertMany()
        const newWatches = await watch.insertMany(req.body);
        res.status(201).json(newWatches);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//updating a record
router.patch('/:id', (req, res) => {

})

//deleting a record
router.delete('/', async (req, res) => {
    try {
        const { ids } = req.body; // Expect an array of IDs in the request body

        // Validate that ids is an array
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'IDs must be a non-empty array' });
        }

        // Convert IDs to numbers (since req.body sends them as strings)
        const numericIds = ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

        if (numericIds.length === 0) {
            return res.status(400).json({ message: 'No valid numeric IDs provided' });
        }

        // Delete multiple records where id is in the numericIds array
        const result = await watch.deleteMany({ id: { $in: numericIds } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No records found for the provided IDs' });
        }

        res.status(200).json({ message: 'Records Deleted', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router