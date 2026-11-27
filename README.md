# Radish - Social Media for Food & Restaurant Reviews

A social media platform for sharing food reviews, restaurant recommendations, and building relationships based on food preferences.

## Overview

Radish is a social media platform that connects food lovers through:

- **Food Reviews**: Share your best food experiences
- **Restaurant Reviews**: Rate and review restaurants
- **Relationships**: Build connections based on food preferences
- **Communities**: Join food-related communities

## Features

- Create posts with food and restaurant reviews
- Share photos of your food experiences
- Rate restaurants with star ratings
- Build relationships with other foodies
- Join food-focused communities
- Search for restaurants and reviews
- Polls for food preferences

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- Responsive design for mobile and desktop

## Getting Started

### Local Development

1. Clone the repository
2. Open `index.html` in any browser
3. Start exploring food reviews and reviews!

### Running with Docker

#### Prerequisites

- Docker installed on your machine
- Docker Compose installed (optional, for easier management)

#### Build and Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t radish-llc .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 radish-llc
   ```

3. Access the application at `http://localhost:8080`

#### Using Docker Compose

1. Build and run using Docker Compose:
   ```bash
   docker-compose up
   ```

2. Access the application at `http://localhost:8080`

3. To stop the services:
   ```bash
   docker-compose down
   ```

> **Note**: The current Dockerfile uses nginx to serve the static files. The application is designed as a static site with HTML, CSS, and JavaScript.

## File Structure

```
radish-llc.github.io/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── radish.png        # Main logo
├── radish_icon.png   # Icon logo
└── README.md         # Project documentation
```

## Troubleshooting

gcloud compute ssl-certificates describe radish-media-cert \
   --global --format="get(name,managed.status,maanged.domainStatus)"

## Email

- **Contact Email**: [david@radish-media.com](mailto:david@radish-media.com)

## Customization

gcloud run services logs read radish-media --region=us-south1 --limit=30

### Reserving Static IP

gcloud compute addresses describe radish-media-ip --format="get(address)" --global

gcloud compute network-endpoint-groups create radish-media-lb-neg \
    --region=us-south1 \
    --network-endpoint-type=serverless \
    --cloud-run-service=radish-media

#### Create Serverless Network Group and Backend Service

gcloud compute network-endpoint-groups create radish-media-lb-neg \
    --region=us-south1 \
    --network-endpoint-type=serverless \
    --cloud-run-service=radish-media

gcloud compute backend-services create radish-media-lb-backend \
    --load-balancing-scheme=EXTERNAL_MANAGED \
    --protocol=HTTP \
    --global

gcloud compute backend-services add-backend radish-media-lb-backend \
    --global \
    --network-endpoint-group=radish-media-lb-neg \
    --network-endpoint-group-region=us-south1

gcloud compute url-maps create radish-media-url-map \
    --default-service=radish-media-lb-backend

gcloud compute ssl-certificates create radish-media-cert \
    --domains=radish-media.com \
    --global

gcloud compute target-https-proxies create radish-media-https-proxy \
    --url-map=radish-media-url-map \
    --ssl-certificates=radish-media-cert

gcloud compute forwarding-rules create radish-media-fwd-rules \
    --load-balancing-scheme=EXTERNAL_MANAGED \
    --network-tier=PREMIUM \
    --address=radish-media-ip \
    --global \
    --target-https-proxy=radish-media-https-proxy \
    --ports=443


gcloud run services update radish-media \
    --ingress=internal-and-cloud-load-balancing \
    --region=us-south1