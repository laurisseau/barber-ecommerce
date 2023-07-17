import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import {
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
dotenv.config({ path: 'config.env' });

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});


export const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

export const getProductFromCategory = expressAsyncHandler(async (req, res) => {
  const findProducts = await Product.find({ category: req.params.slug });


  for (const product of findProducts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.image,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 30 });

    product.image = url;
  }

  res.send(findProducts);
});
