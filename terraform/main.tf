terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.0"
    }
  }
}

# 1. Connect Terraform to Docker Desktop on Windows
provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

# 2. Create a Network so containers can talk
resource "docker_network" "private_network" {
  name = "my_terraform_network"
}

# 3. Redis Database Container
resource "docker_container" "redis" {
  name  = "redis-db"
  image = "redis:alpine"
  
  ports {
    internal = 6379
    external = 6379
  }
  
  networks_advanced {
    name = docker_network.private_network.name
  }
}

# 4. Prometheus Container (Monitoring)
resource "docker_container" "prometheus" {
  name  = "prometheus"
  image = "prom/prometheus:latest"
  
  ports {
    internal = 9090
    external = 9090
  }

  # Maps the local config file into the container
  volumes {
    host_path      = abspath("${path.module}/prometheus.yml")
    container_path = "/etc/prometheus/prometheus.yml"
  }

  networks_advanced {
    name = docker_network.private_network.name
  }
}

# 5. The Application Container
resource "docker_container" "app" {
  name  = "link-shorty-app"
  image = "link-shorty:latest"  # Requires manual build first
  
  ports {
    internal = 3000
    external = 3000
  }
  
  # Inject the database hostname here
  env = [
    "REDIS_HOST=redis-db"
  ]

  networks_advanced {
    name = docker_network.private_network.name
  }
}