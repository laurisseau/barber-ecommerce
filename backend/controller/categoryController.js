import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

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

  for (const category of categories) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: category.image,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 30 });

    category.image = url;
  }

  res.send(categories);
});

export const createCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.create({
    name: req.body.name,
    slug: req.body.slug,
    image: req.file.filename,
  });

  res.send(category);
});

export const updateCategoryById = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const image = () => {
    const awsS3Url = req.body.image;
    const objectKey = awsS3Url.substring(
      awsS3Url.lastIndexOf('/') + 1,
      awsS3Url.indexOf('?')
    );
    return objectKey;
  };

  const updateCategoryById = await Category.findByIdAndUpdate(req.params.id, {
    slug: req.body.slug,
    name: req.body.name,
    image: req.file ? req.file.filename : image(),
  });

  const getCategoryById = await Category.findById(req.params.id);

  const getObjectParams = {
    Bucket: bucketName,
    Key: getCategoryById.image,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 30 });

  getCategoryById.image = url;

  res.send(getCategoryById);
});

export const getCategoryById = expressAsyncHandler(async (req, res) => {
  const getCategoryById = await Category.findById(req.params.id);

  const getObjectParams = {
    Bucket: bucketName,
    Key: getCategoryById.image,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 30 });

  getCategoryById.image = url;

  res.send(getCategoryById);
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
