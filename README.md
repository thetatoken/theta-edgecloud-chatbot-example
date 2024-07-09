# Theta Chatbot Example

This project provides a working Chatbot example using [Theta Edge Cloud](https://www.thetaedgecloud.com). It is implemented using React and Vite.


## Getting Started

1. Configure your chatbot by editing the varibles in the file `.local.env`. See [Prerequisites](https://github.com/thetatoken/theta-chatbot-example/blob/main/README.md#prerequisites) if you don't have an API URL.
```bash
VITE_CHATBOT_API_URL : the inference endpoint you generated when you deployed a Llama-3 model on Theta Edge Cloud.
VITE_CHATBOT_INSTRUCTIONS : describes your chatbot intended functionality
VITE_CHATBOT_FIRST_QUESTION : the first question to display to your users
VITE_CHATBOT_FIRST_ANSWER : the first answer to display to your users
```

2. Run the following commands to install the project dependencies and start it locally:
   ```bash
   npm install
   npm run dev
   ```


## Preview

![screenshot](https://github.com/thetatoken/chatbot-example/assets/601861/aa9371ae-2e7b-4a83-8b48-c08050e6a5d5)


## Prerequisites

To run this project, you'll need an API URL, here is how to get it :

1. Navigate to [Hugging Face Tokens](https://huggingface.co/settings/tokens) and generate a new API key. Save this key securely as you will need it to create a Llama-3 model.

2. Visit the [Meta-Llama-3-8B-Instruct license page](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) on Hugging Face and agree to the terms of use.

3. Deploy the Llama-3 model on Theta Edge Cloud by going to the [Model Explorer](https://www.thetaedgecloud.com/dashboard/ai/prj_dcksdnn5ctpe4ejikp7d1wevn6bh/model-explorer). Use the API key obtained in Step 1 during the deployment process.
