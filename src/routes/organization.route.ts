import { Router, Request, Response } from 'express';
import { Organization } from '../models/organization.model';

const router = Router();

router.post('/organization', async (req: Request, res: Response) => {
  const { type, id, code } = req.body;

  const organization = await Organization.findOneAndUpdate(
    { id },
    { type, id, code },
    { upsert: true }
  );

  res.json(organization);
});

router.get('/organizations/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const organization = await Organization.findOne({ id }, { _id: 0, __v: 0 });
  res.json(organization);
});

export { router as organizationRouter };
