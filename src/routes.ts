import { Router } from 'express';
import './database/connection';
import orphanagesController from './controllers/OphanagesController';

import multer from 'multer';
import uploadConfig from './config/upload';

const router = Router();
const upload = multer(uploadConfig);

router.post('/orphanages', upload.array('images'), orphanagesController.create)

router.get('/orphanages', orphanagesController.index)

router.get('/orphanages/:id', orphanagesController.findById)

export default router;