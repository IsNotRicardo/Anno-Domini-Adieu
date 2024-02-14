const text_content = document.body.textContent;
async function language_detection() {
    const result = await chrome.i18n.detectLanguage(text_content);
    const language_tag = result.languages[0].language;
    console.log(language_tag);
    return regex_data(language_tag);
}
language_detection().then(data => {
    const regex = data.regex;
    const suffix = data.suffix;
    const match_list = text_content.matchAll(regex);
    for (const match of match_list) {
        const [year, epoch] = match;
        let replacement;
        if (epoch === suffix) { // Change to suffix.includes(epoch)
            replacement = (10000 + parseInt(year)).toString();
        }
        else {
            replacement = (10001 - parseInt(year)).toString();
        }
        text_content.replace(regex, replacement);
    }
    document.body.textContent = text_content; // Broken code, needs node
});
function regex_data(language_tag) {
    switch (language_tag) {
        case 'en': {
            return {
                regex: /(\d+) ([A-Z]{2, 3})/g,
                suffix: 'AD' // Include BC/BCE
            };
        }
        // Add more languages here
        default: {
            console.warn("Undetected or unavailable language. Defaulting to English.");
            return {
                regex: /(\d+) ([A-Z]{2, 3})/g,
                suffix: 'AD'
            };
        }
    }
}
