# import boto3
# import botocore
# from ..config import Config


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

import boto3
import os
import uuid


BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "jfif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET_ACCESS_KEY")
)


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
