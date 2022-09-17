import mongoose from 'mongoose';

interface OrganizationAttrs {
  type: string;
  id: string;
  code: string;
}

interface OrganizationModel extends mongoose.Model<OrganizationDoc> {
  build(attrs: OrganizationAttrs): OrganizationDoc;
}

interface OrganizationDoc extends mongoose.Document {
  type: string;
  id: string;
  code: string;
}

const OrganizationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

OrganizationSchema.statics.build = (attrs: OrganizationAttrs) => {
  return new Organization(attrs);
};

const Organization = mongoose.model<OrganizationDoc, OrganizationModel>(
  'Organization',
  OrganizationSchema
);

export { Organization };
