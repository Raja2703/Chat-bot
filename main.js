import openai from './config/openAi.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
	console.log(colors.bold.green('Welcome to nodeBot'));
	console.log(colors.bold.green('Start chatting with the bot'));

	while (true) {
		const userInput = readlineSync.question(colors.yellow('You: '));
		try {
			const response = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: userInput }],
				max_tokens: 50,
			});

			if (userInput.toLowerCase() === 'exit') {
				console.log(colors.green('Bot: '), response.choices[0].message.content);
				return;
			}

			console.log(colors.green('Bot: '), response.choices[0].message.content);
		} catch (err) {
			console.error(colors.red(err));
		}
	}
}

main();
