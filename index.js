import express from 'express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import XRegExp from 'xregexp';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.use(cors({
//     origin: 'https://wavespeed.ai' 
// }));
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

async function getKeywordMap() {
    const jsonPath = path.join(__dirname, 'internal/keyword_map.json');
    console.log(`Loading wavespeed keyword_map data from: ${jsonPath}`);
    const content = await readFile(jsonPath, 'utf-8');
    return JSON.parse(content);
}

function toSnake(text) {
    let s = text.toLowerCase();
    s = XRegExp.replace(s, XRegExp('[^\\p{L}\\p{N}]+', 'g'), '_');
    return s.replace(/^_+|_+$/g, '');
}

app.get('/api/keyword_map', async (req, res) => {
    try {
        const data = await getKeywordMap();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load keyword map' });
    }
});

app.get('/api/feature{/:keyword}', async (req, res) => {
    try {
        const keyword = req.params.keyword || 'remove_objects_from_photos';

        const keywordMapData = await getKeywordMap();
        const target = keywordMapData[keyword];

        if (!target) {
            return res.status(404).json({ error: 'Keyword not found' });
        }

        const jsonName = `${toSnake(target.keyword)}_${target.language}`;
        const jsonPath = path.join(__dirname, 'internal/feature', `${jsonName}.json`);

        console.log(`Loading wavespeed feature-${jsonName}- data from: ${jsonPath}`);

        const content = await readFile(jsonPath, 'utf-8');
        res.json(JSON.parse(content));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Node.js Backend running on http://0.0.0.0:${PORT}`);
});