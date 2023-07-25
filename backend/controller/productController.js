import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import multer from 'multer';
import sharp from 'sharp';
import dotenv from 'dotenv';

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

//-------------------------------UPLOADING IMAGES---------------------------------------*/

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('image');

export const resizeUserPhoto = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex');

  const buffer = await sharp(req.file.buffer).resize(500, 500).toBuffer();

  req.file.filename = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: req.file.filename,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  next();
});

export const resizeUpdatedUserPhotoWithDB = (db) => {
  return expressAsyncHandler(async (req, res, next) => {
    if (!req.file) return next();

    const product = await db.findById(req.params.id);

    const buffer = await sharp(req.file.buffer).resize(500, 500).toBuffer();

    const params = {
      Bucket: bucketName,
      Key: product.image,
      Body: buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    next();
  });
};

export const CreatProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.create({
    slug: req.body.slug,
    category: req.body.category,
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    countInStock: req.body.countInStock,
    description: req.body.description,
    image: req.file.filename,
  });

  res.send(product);
});

export const deleteProductById = expressAsyncHandler(async (req, res) => {
  const deleteProductById = await Product.findByIdAndDelete(req.params.id);

  const params = {
    Bucket: bucketName,
    Key: deleteProductById.image,
  };

  const command = new DeleteObjectCommand(params);

  await s3.send(command);

  res.send(deleteProductById);
});

export const getProductId = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const getObjectParams = {
    Bucket: bucketName,
    Key: product.image,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 30 });

  product.image = url;

  res.send(product);
});

export const getProductSlug = expressAsyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  const getObjectParams = {
    Bucket: bucketName,
    Key: product.image,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 30 });

  product.image = url;

  res.send(product);
});

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();

  for (const product of products) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: product.image,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 30 });

    product.image = url;
  }

  res.send(products);
});

export const updateProductById = expressAsyncHandler(async (req, res) => {
  const image = () => {
    const awsS3Url = req.body.image;
    const objectKey = awsS3Url.substring(
      awsS3Url.lastIndexOf('/') + 1,
      awsS3Url.indexOf('?')
    );
    return objectKey;
  };

  const updateProductById = await Product.findByIdAndUpdate(req.params.id, {
    slug: req.body.slug,
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    image: req.file ? req.file.filename : image(),
    description: req.body.description,
  });

  res.send(updateProductById);
});
