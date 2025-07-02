provider "aws" {
  region = var.aws_region
}

locals {
  domain_name = "soccer.ravanhani.com"
  tags = {
    Terraform = "true"
    Context   = "ravanhani-site"
    App       = "soccer-results"
  }
  s3_domain = "${var.bucket_name}.s3.${var.aws_region}.amazonaws.com"
  content_type_map = {
    "js"          = "application/javascript"
    "html"        = "text/html"
    "css"         = "text/css"
    "png"         = "image/png"
    "webp"        = "image/webp"
    "ico"         = "image/ico"
    "xml"         = "text/xml"
    "svg"         = "image/svg+xml"
    "webmanifest" = "application/manifest+json"
  }
}

# Create Certificate & Route53 domain Record

resource "aws_acm_certificate" "cert" {
  domain_name       = local.domain_name
  validation_method = "DNS"

  tags = local.tags

  lifecycle {
    create_before_destroy = false
  }
}

resource "aws_route53_record" "certificate" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = var.zone_id
}

# Creating S3 bucket & Cloudfront Distribution

resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.bucket_name

  tags = local.tags
}

resource "aws_cloudfront_origin_access_control" "oac" {
  depends_on                        = [aws_s3_bucket.s3_bucket]
  name                              = "${var.bucket_name}-oac"
  description                       = "OAC to allow cloudfront access S3"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "no-override"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "CachingOptimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "s3_distribution" {

  depends_on = [aws_cloudfront_origin_access_control.oac]

  origin {
    domain_name              = local.s3_domain
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = local.s3_domain
  }

  aliases             = [local.domain_name]
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Distribution Soccer Results"
  default_root_object = "index.html"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_domain

    cache_policy_id = data.aws_cloudfront_cache_policy.CachingOptimized.id

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 100
    max_ttl                = 100
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {

  depends_on = [aws_cloudfront_distribution.s3_distribution]

  bucket = var.bucket_name
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.s3_bucket.arn}/*",
    ]

    condition {
      test     = "StringLike"
      variable = "AWS:SourceArn"

      values = [
        aws_cloudfront_distribution.s3_distribution.arn
      ]
    }
  }
}

# Upload files to S3

# resource "aws_s3_object" "upload" {
#   for_each   = fileset(var.content_path, "**")

#   bucket = var.bucket_name
#   key    = each.value
#   source = "${var.content_path}/${each.value}"
#   etag   = filemd5("${var.content_path}/${each.value}")
#   content_type = lookup(local.content_type_map, split(".", "${var.content_path}/${each.value}")[1], "text/html")
# }

# Add Route35 Records

resource "aws_route53_record" "A_dist_record" {
  zone_id = var.zone_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "AAAA_dist_record" {
  zone_id = var.zone_id
  name    = local.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}