# Theta Chatbot Example

This project provides a working Chatbot example using [Theta Edge Cloud](https://www.thetaedgecloud.com). It is implemented using React and Vite.

## Prerequisites

1. Navigate to [Hugging Face Tokens](https://huggingface.co/settings/tokens) and generate a new API key. Save this key securely as you will need it to create a Llama-3 model.

2. Visit the [Meta-Llama-3-8B-Instruct license page](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) on Hugging Face and agree to the terms of use.

3. Deploy the Llama-3 model on Theta Edge Cloud by going to the [Model Explorer](https://www.thetaedgecloud.com/dashboard/ai/prj_dcksdnn5ctpe4ejikp7d1wevn6bh/model-explorer). Use the API key obtained in Step 1 during the deployment process.

## Getting Started

1. In `.local.env` file, replace `MY_API_URL` with the Inference endpoint URL you received after deploying the llama3 model on Theta Edge Cloud.

2. Replace other variable from the same file according to your chatbot's intended functionality. This step tailors the chatbot's initial setup and default messages to fit your specific use case.

3. Finally, run the following commands to install the project dependencies and start it locally:
   ```bash
   npm install
   npm run dev
   ```
   
![screenshot](https://github.com/thetatoken/chatbot-example/assets/601861/aa9371ae-2e7b-4a83-8b48-c08050e6a5d5)
