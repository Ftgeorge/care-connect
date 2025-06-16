# CareConnect: AI-Powered Healthcare Assistant

CareConnect is a comprehensive healthcare application designed to assist users with symptom checking, provide preventive recommendations, and offer doctors a streamlined dashboard for managing appointments and patient information. Leveraging AI, CareConnect aims to provide quick and accurate preliminary health insights.

## Features

*   **AI-Powered Symptom Checker:** Users can input symptoms and medical history to receive an AI-generated analysis, including potential conditions, severity, and personalized recommendations.
*   **Preventive Recommendations:** Based on symptom analysis, the AI provides actionable preventive health measures.
*   **User and Doctor Roles:** Secure login system with distinct dashboards for patients and doctors.
*   **Patient Dashboard:** (To be further developed, currently redirects to symptom checker)
*   **Doctor Dashboard:**
    *   **Overview:** Quick glance at key metrics and recent activities.
    *   **Appointments Management:** View and manage appointments in both list and calendar formats.
    *   **Patient Management:** (To be developed)
*   **Responsive Design:** Optimized for various devices.

## Live demo

*   **Live Website Url:** `http://care-connect-a9y5.vercel.app/`

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/care-connect.git
    cd care-connect
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add your Hugging Face API key:

```
HUGGINGFACE_API_KEY=hf_YOUR_HUGGINGFACE_API_KEY
```

Replace `hf_YOUR_HUGGINGFACE_API_KEY` with your actual Hugging Face API key.

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

