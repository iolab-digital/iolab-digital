import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION || "nyc3",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET || "",
  },
  forcePathStyle: false,
});

const BUCKET = process.env.DO_SPACES_BUCKET || "iolab-digital";
const CDN_URL = process.env.DO_SPACES_CDN_URL || "https://iolab-digital.nyc3.digitaloceanspaces.com";

/**
 * Upload a file to DigitalOcean Spaces
 */
export async function uploadFile(
  file: Buffer,
  key: string,
  contentType: string,
  acl: "public-read" | "private" = "public-read"
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: contentType,
      ACL: acl,
    })
  );

  return `${CDN_URL}/${key}`;
}

/**
 * Upload a portfolio image
 */
export async function uploadPortfolioImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const key = `portfolio/${Date.now()}-${filename}`;
  return uploadFile(file, key, contentType);
}

/**
 * Upload a blog image
 */
export async function uploadBlogImage(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const key = `blog/${Date.now()}-${filename}`;
  return uploadFile(file, key, contentType);
}

/**
 * Upload a general image (team, backgrounds, etc.)
 */
export async function uploadImage(
  file: Buffer,
  folder: string,
  filename: string,
  contentType: string
): Promise<string> {
  const key = `${folder}/${Date.now()}-${filename}`;
  return uploadFile(file, key, contentType);
}

/**
 * Delete a file from DigitalOcean Spaces
 */
export async function deleteFile(key: string): Promise<void> {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

/**
 * Extract the key from a full CDN URL
 */
export function getKeyFromUrl(url: string): string {
  return url.replace(`${CDN_URL}/`, "");
}
