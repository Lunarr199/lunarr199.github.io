const emojiMap = {
    ':heart:': '❤️',
};

const emojiImageMap = {
    ':peek:': 'peek.webp',
    ':sad:': 'sad.webp',
    ':vnflag:': 'vn-flag.png',
    ':catsmile:' : 'catsmile.webp',
    ':coffee:': 'coffee.webp',
    ':js:': 'js.webp',
    ':python:': 'python.webp',
    ':luau:': 'luau.webp',
};

function replaceEmojis(text) {
    return text.replace(/:\w+:/g, match => {
        if (emojiMap[match]) {
            return emojiMap[match];
        } else if (emojiImageMap[match]) {
            return `<img src="images/emojis/${emojiImageMap[match]}" alt="${match}" class="emoji">`;
        } else {
            return match; 
        }
    });
}

function updateTextWithEmojis() {
    document.querySelectorAll('.emoji-text').forEach(element => {
        element.innerHTML = replaceEmojis(element.innerHTML);
    });
}

window.addEventListener('load', () => {
    updateTextWithEmojis();
});