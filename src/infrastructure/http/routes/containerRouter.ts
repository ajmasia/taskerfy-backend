import { Router } from 'express';
import { addContainer } from '../../../application/controllers/containerController';

import { authenticate } from '../middelwares/authMiddelware';

const router = Router();

router.post('/', authenticate, addContainer);

export default router;
