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

1. Clone the repository
2. Open `index.html` in your browser
3. Start exploring food reviews and reviews!

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

## Customization

You can customize the platform by:

- Adding more social features
- Implementing backend API
- Adding authentication
- Creating more post types
- Adding search functionality

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Create a pull request

## Support

For support, email radish@example.com or open an issue.

## License

This project is licensed under the MIT License.




## Deployment

This project uses GitHub Actions to deploy to GCP Cloud Run via OIDC (Workload Identity Federation).

### GCP IAM Requirements

Before the deployment workflow can run, the following must be configured in GCP:

1. **Enable required APIs**:

   ```bash
   gcloud services enable \
     iam.googleapis.com \
     iamcredentials.googleapis.com \
     cloudresourcemanager.googleapis.com \
     sts.googleapis.com \
     run.googleapis.com \
     artifactregistry.googleapis.com \
     cloudbuild.googleapis.com \
     --project="${PROJECT_ID}"
   ```

2. **Create a Workload Identity Pool** named `github` in GCP Console → IAM → Workload Identity Pools.

3. **Create a Provider** named `github-actions` in the `github` pool, configured with:
   - Issuer: `https://token.actions.githubusercontent.com`
   - Audience: `//iam.googleapis.com/projects/{PROJECT_ID}/locations/global/workloadIdentityPools/github/providers/github-actions`

4. **Add a Service Account Mapping** with:
   - Service account: `668282322569-compute@developer.gserviceaccount.com`
   - Subject: `repo:radish-llc/radish-llc.github.io:ref:refs/heads/main`
   - Token path: `assertion.sub` (text format)

5. **Grant the service account** the `roles/iam.workloadIdentityUser` role, binding the principal:
   ```
   principal://iam.googleapis.com/projects/668282322569/locations/global/workloadIdentityPools/github/subject/repo:radish-llc/radish-llc.github.io:ref:refs/heads/main
   ```
   Note: Use the **project number** (`668282322569`), not the project ID, in the principal path.

### GitHub Secrets

| Secret | Description |
|---|---|
| `GCP_PROJECT` | The GCP project ID |

### GitHub Variables

| Variable | Description |
|---|---|
| `CLOUD_RUN_NAME` | Name of the Cloud Run service |
| `CLOUD_RUN_ZONE` | GCP zone for deployment (e.g., `us-south1`) |

export PROJECT_ID="project-d5697105-f339-4128-822"

gcloud services enable \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  cloudresourcemanager.googleapis.com \
  sts.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  --project="${PROJECT_ID}"
