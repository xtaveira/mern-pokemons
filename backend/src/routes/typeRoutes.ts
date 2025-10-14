import { Router } from 'express';
import {
    getAllTypes,
    createType,
    updateType,
    deleteType,
} from '../controllers/typeController';

const router = Router();

router.route('/')
    .get(getAllTypes)
    .post(createType);

router.route('/:id')
    .put(updateType)
    .delete(deleteType);

export default router;