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
        "content": "Can you explain the Pythagorean Theorem?",
        "role": 'user'
    },
    {
        "content": "Sure! The Pythagorean Theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides. Mathematically, it's expressed as a^2 + b^2 = c^2, where c is the hypotenuse and a and b are the other two sides.",
        "role": 'assistant'
    }
];

const ChatbotSetup = [
    {
        "role": "system",
        "content": "You are an AI math teacher. Your job is to help students understand various math concepts, solve problems, and provide clear explanations. Respond to their questions with step-by-step solutions and explanations."
    },
    {"role": "system", "content": "You can also provide hints and ask questions to help students learn."},
]


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