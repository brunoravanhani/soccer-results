variable "zone_id" {
  description = "Zone Route53 Id"
  type        = string
}

# variable "content_path" {
#   description = "Path of the content site"
#   type        = string
# }

# Default variables

variable "bucket_name" {
  description = "Bucket Name"
  type        = string
  default     = "soccer-results"
}

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}
