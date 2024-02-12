const text_content = document.body.textContent

async function language_detection() {
    const result = await chrome.i18n.detectLanguage(text_content);
    const language_tag = result.languages[0].language;
    console.log(language_tag)
    return regex_data(language_tag)
}

language_detection().then(data => {
    const regex = data.regex
    const language = data.language
})

function regex_data(language_tag: string) {
    switch (language_tag) {
        case 'en': {
            return {
                regex: /(\d+)(?: (?:-|to) (\d+))? ([A-Z]{2})/,
                language: language_tag
            }
        }
        // Add more languages here
        default: {
            console.warn("Undetected or unavailable language. Defaulting to English.");
            return {
                regex: /(\d+)(?: (?:-|to) (\d+))? ([A-Z]{2})/,
                language: 'en'
            }
        }
    }
}
