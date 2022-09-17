import { Router, Request, Response } from 'express';
import { Organization } from '../models/organization.model';
import { Shipment } from '../models/shipment.model';
import { WeightConversionService } from '../services/weight-conversion.service';

const router = Router();

router.post('/shipment', async (req: Request, res: Response) => {
  const {
    type,
    referenceId,
    organizations,
    estimatedTimeArrival,
    transportPacks,
  } = req.body;

  let organizationRefs = [] as any;
  await Promise.all(
    organizations.map(async (orgCode) => {
      const org = await Organization.findOne(
        { code: orgCode },
        { _id: 0, __v: 0 }
      );
      organizationRefs.push(org);
    })
  );

  const shipment = await Shipment.findOneAndUpdate(
    { referenceId },
    {
      organizations: organizationRefs,
      type,
      referenceId,
      estimatedTimeArrival,
      transportPacks,
    },
    { upsert: true }
  );

  res.json(shipment);
});

router.get('/shipments/:referenceId', async (req: Request, res: Response) => {
  const { referenceId } = req.params;
  const shipment = await Shipment.findOne(
    { referenceId },
    { _id: 0, __v: 0, 'transportPacks._id': 0 }
  );

  res.json(shipment);
});

// Available units -> POUNDS, KILOGRAMS, OUNCES
router.get('/shipments/weight/:unit', async (req: Request, res: Response) => {
  const { unit } = req.params;
  const shipments = await Shipment.find();
  const weights = [].concat.apply([], shipments.map(s => (s.transportPacks as any).nodes)).map(x => x.totalWeight);
  const weightConversionService = new WeightConversionService();
  let weightSum = 0;

  for (let weight of weights) {
    weightSum += weightConversionService.calculate(weight.unit, unit, parseFloat(weight.weight));
  }

  res.json({ totalWeight: weightSum.toFixed(2) })
});

export { router as shipmentRouter };
