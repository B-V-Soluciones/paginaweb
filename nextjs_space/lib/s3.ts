import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createS3Client, getBucketConfig } from "./aws-config";

const s3Client = createS3Client();
const { bucketName, folderPrefix } = getBucketConfig();

export async function generatePresignedUploadUrl(
  fileName: string,
  contentType: string,
  isPublic = false
) {
  const cloudStoragePath = isPublic
    ? `${folderPrefix}public/uploads/${Date.now()}-${fileName}`
    : `${folderPrefix}uploads/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: cloudStoragePath,
    ContentType: contentType,
    ContentDisposition: isPublic ? "attachment" : undefined
  });

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return { uploadUrl, cloudStoragePath };
}

export async function initiateMultipartUpload(
  fileName: string,
  isPublic = false
) {
  const cloudStoragePath = isPublic
    ? `${folderPrefix}public/uploads/${Date.now()}-${fileName}`
    : `${folderPrefix}uploads/${Date.now()}-${fileName}`;

  const command = new CreateMultipartUploadCommand({
    Bucket: bucketName,
    Key: cloudStoragePath,
    ContentDisposition: isPublic ? "attachment" : undefined
  });

  const response = await s3Client.send(command);

  return {
    uploadId: response.UploadId ?? "",
    cloudStoragePath
  };
}

export async function getPresignedUrlForPart(
  cloudStoragePath: string,
  uploadId: string,
  partNumber: number
) {
  const command = new UploadPartCommand({
    Bucket: bucketName,
    Key: cloudStoragePath,
    UploadId: uploadId,
    PartNumber: partNumber
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function completeMultipartUpload(
  cloudStoragePath: string,
  uploadId: string,
  parts: Array<{ ETag: string; PartNumber: number }>
) {
  const command = new CompleteMultipartUploadCommand({
    Bucket: bucketName,
    Key: cloudStoragePath,
    UploadId: uploadId,
    MultipartUpload: { Parts: parts }
  });

  return await s3Client.send(command);
}

export async function getFileUrl(cloudStoragePath: string, isPublic = false) {
  if (isPublic) {
    const region = process.env.AWS_REGION ?? "us-east-1";
    return `https://${bucketName}.s3.${region}.amazonaws.com/${cloudStoragePath}`;
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: cloudStoragePath,
    ResponseContentDisposition: "attachment"
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function deleteFile(cloudStoragePath: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: cloudStoragePath
  });

  return await s3Client.send(command);
}
