export const createCompletion = async (messages) => {
    const ApiUrl = import.meta.env.VITE_CHATBOT_API_URL

    const body = {
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        temperature: 0.5,
        top_p: 0.7,
        max_tokens: 600,
        messages: [
            ...ChatbotSetup,
            ...messages
        ]
    };

    const response = await fetch(`${ApiUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    });

    const json = await response?.json();

    let text = formatChatbotResponse(json?.choices?.[0]?.message?.content);

    if (json?.choices?.[0]?.finish_reason === "length") {
        text = text + '...';
    }

    return text;
}


export const DefaultChatMessages = [
    {
        "content": import.meta.env.VITE_CHATBOT_FIRST_QUESTION,
        "role": 'user'
    },
    {
        "content": import.meta.env.VITE_CHATBOT_FIRST_ANSWER,
        "role": 'assistant'
    }
];

const ChatbotSetup = [
    {
        "role": "system",
        "content": import.meta.env.VITE_CHATBOT_INSTRUCTIONS
    }
]

// Format the response from the chatbot
function formatChatbotResponse(response) {
    // Split the response into paragraphs by two newlines
    let paragraphs = response.split('\n\n');

    // Process each paragraph
    paragraphs = paragraphs.map(paragraph => {
        // Check for list introductions and format accordingly
        const listIntroductions = ['Here are', 'The following', 'Includes:'];
        for (const intro of listIntroductions) {
            if (paragraph.startsWith(intro)) {
                // Extract the list part from the paragraph
                const listStartIndex = paragraph.indexOf(intro) + intro.length;
                let listEndIndex = paragraph.indexOf('.', listStartIndex);
                listEndIndex = listEndIndex !== -1 ? listEndIndex : paragraph.length;
                let listContent = paragraph.substring(listStartIndex, listEndIndex);

                // Split the list items and format them with dashes
                const listItems = listContent.split(',').map(item => `- ${item.trim()}`).join('\n');
                // Replace the list in the original paragraph with the formatted list
                paragraph = paragraph.substring(0, listStartIndex) + '\n' + listItems + paragraph.substring(listEndIndex);
            }
        }
        return paragraph;
    });

    // Join the paragraphs back together with double newlines
    return paragraphs.join('\n\n');
}