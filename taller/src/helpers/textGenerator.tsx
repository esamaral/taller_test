interface GenerateRandomTextParams {
    numParagraphs: number;
    numSentencesPerParagraph: number;
}

export function generateRandomText(
    numParagraphs: GenerateRandomTextParams['numParagraphs'],
    numSentencesPerParagraph: GenerateRandomTextParams['numSentencesPerParagraph']
): string {
    const words: string[] = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
    const paragraphs: string[] = [];
    for (let p = 0; p < numParagraphs; p++) {
        const sentences: string[] = [];
        for (let i = 0; i < numSentencesPerParagraph; i++) {
            const numWords: number = Math.floor(Math.random() * 10) + 5;
            const sentenceWords: string[] = [];
            for (let j = 0; j < numWords; j++) {
                const randomIndex: number = Math.floor(Math.random() * words.length);
                sentenceWords.push(words[randomIndex]);
            }
            const sentence: string = sentenceWords.join(' ') + '.';
            sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
        }
        paragraphs.push(sentences.join(' '));
    }
    return paragraphs.join('\n\n');
}