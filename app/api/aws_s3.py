# # from .config import Config
# import logging
# import boto3
# import botocore
# from botocore.exceptions import ClientError
# from app.config import Config
# import os

# # s3 = boto3.client('s3',
# #                     aws_access_key_id='AKIA6HDEKGP5KIODKSFK',
# #                     aws_secret_access_key= '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',
# #                     aws_session_token='secret token here'
# #                      )
# # BUCKET_NAME='instapaw'
# s3 = boto3.client(
#    "s3",
#    aws_access_key_id=Config.S3_KEY,
#    aws_secret_access_key=Config.S3_SECRET
# )

# def upload_file_to_s3(file, bucket_name, acl="public-read"):

#     try:

#         s3.upload_fileobj(
#             file,
#             bucket_name,
#             file.filename,
#             ExtraArgs={
#                 "ACL": acl,
#                 "ContentType": file.content_type
#             }
#         )

#     except Exception as e:
#         # This is a catch all exception, edit this part to fit your needs.
#         print("Something Happened: ", e)
#         return e
#     return f"{Config.S3_LOCATION}{file.filename}"


# def public_file_upload(file_name, bucket="instapaw"):
#     """Upload a file to an S3 bucket and return file url
#     :param file_name: File to upload
#     :param bucket: Bucket to upload to
#     :return: url of new file
#     """
#     object_name = os.path.basename(file_name)

#     # Upload the file
#     s3_client = boto3.client('s3')
#     try:
#         s3_client.upload_file(
#             file_name,
#             bucket,
#             object_name,
#             ExtraArgs={'ACL': 'public-read'}
#             )

#         # get public url of newly created obj
#         config = botocore.client.Config(signature_version=botocore.UNSIGNED)

#         object_url = boto3.client('s3', config=config).generate_presigned_url('get_object', ExpiresIn=0, Params={'Bucket': bucket, 'Key': object_name})

#         return object_url
#     except ClientError as e:
#         logging.error(e)
#         return False
