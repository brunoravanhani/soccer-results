terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.24.0"
    }
  }
  required_version = "~> 1.2"

  backend "s3" {
    bucket         = "bruno-ravanhani-site-terraform"
    key            = "soccer-results/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "soccer-results-terraform"
  }
}
