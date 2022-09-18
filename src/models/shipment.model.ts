import mongoose, { Schema } from 'mongoose';

interface ShipmentAttrs {
  type: string;
  referenceId: string;
  organizations: string[];
  estimatedTimeArrival: Date;
  transportPacks: object;
}

interface ShipmentModel extends mongoose.Model<ShipmentDoc> {
  build(attrs: ShipmentAttrs): ShipmentDoc;
}

interface ShipmentDoc extends mongoose.Document {
  type: string;
  referenceId: string;
  organizations: object[];
  estimatedTimeArrival: Date;
  transportPacks: object;
}

const ShipmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    referenceId: {
      type: String,
      required: true,
    },
    organizations: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Organization',
      },
    ],
    estimatedTimeArrival: {
      type: Date,
      required: false,
    },
    transportPacks: {
      type: { nodes: [] },
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.transportPacks._id
      },
    },
  }
);

ShipmentSchema.statics.build = (attrs: ShipmentAttrs) => {
  return new Shipment(attrs);
};

const Shipment = mongoose.model<ShipmentDoc, ShipmentModel>(
  'Shipment',
  ShipmentSchema
);

export { Shipment };
