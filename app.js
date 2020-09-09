console.log('')
console.log('-------------------------------')
console.log('  Sweet Bot запущен.')
console.log('  Разработчик: Сахар Марк')
console.log('-------------------------------')
console.log('')

// ВСЕ НАСТРОЙКИ В ФАЙЛЕ settings.json!

const { VK } = require('vk-io');
const { Keyboard } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
const { PORT, TOKEN, CONFIRMATION } = require('./config');

const express = require('express');
//let giving = false;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`SweetBot listening on port ${PORT}!`));

app.get('/', function (req, res) {
	res.send('Hello World!');
	//let users = require('./users.json');
	let config = require('./settings.json');
});

const utils = {
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
};

const rotateText = {
	q: 'q',
	Q: 'q',
	w: 'ʍ',
	W: 'ʍ',
	e: 'ǝ',
	E: 'ǝ',
	r: 'ɹ',
	R: 'ɹ',
	t: 'ʇ',
	T: 'ʇ',
	y: 'ʎ',
	Y: 'ʎ',
	u: 'u',
	U: 'u',
	i: 'ᴉ',
	I: 'ᴉ',
	o: 'o',
	O: 'o',
	p: 'p',
	P: 'p',
	a: 'ɐ',
	A: 'ɐ',
	s: 's',
	S: 's',
	d: 'd',
	D: 'd',
	f: 'ɟ',
	F: 'ɟ',
	g: 'ƃ',
	G: 'ƃ',
	h: 'ɥ',
	H: 'ɥ',
	j: 'ɾ',
	J: 'ɾ',
	k: 'ʞ',
	K: 'ʞ',
	l: 'l',
	L: 'l',
	z: 'z',
	Z: 'z',
	x: 'x',
	X: 'x',
	c: 'ɔ',
	C: 'ɔ',
	v: 'ʌ',
	V: 'ʌ',
	b: 'b',
	B: 'b',
	n: 'n',
	N: 'n',
	m: 'ɯ',
	M: 'ɯ',

	й: 'ņ',
	Й: 'ņ',
	ц: 'ǹ',
	Ц: 'ǹ',
	у: 'ʎ',
	У: 'ʎ',
	к: 'ʞ',
	К: 'ʞ',
	е: 'ǝ',
	Е: 'ǝ',
	н: 'н',
	Н: 'н',
	г: 'ɹ',
	Г: 'ɹ',
	ш: 'm',
	Ш: 'm',
	щ: 'm',
	Щ: 'm',
	з: 'ε',
	З: 'ε',
	х: 'х',
	Х: 'х',
	ъ: 'q',
	Ъ: 'q',
	ф: 'ф',
	Ф: 'ф',
	ы: 'ıq',
	Ы: 'ıq',
	в: 'ʚ',
	В: 'ʚ',
	а: 'ɐ',
	А: 'ɐ',
	п: 'u',
	П: 'u',
	р: 'd',
	Р: 'd',
	о: 'о',
	О: 'о',
	л: 'v',
	Л: 'v',
	д: 'ɓ',
	Д: 'ɓ',
	ж: 'ж',
	Ж: 'ж',
	э: 'є',
	Э: 'є',
	я: 'ʁ',
	Я: 'ʁ',
	ч: 'һ',
	Ч: 'һ',
	с: 'ɔ',
	С: 'ɔ',
	м: 'w',
	М: 'w',
	и: 'и',
	И: 'и',
	т: 'ɯ',
	Т: 'ɯ',
	ь: 'q',
	Ь: 'q',
	б: 'ƍ',
	Б: 'ƍ',
	ю: 'oı',
	Ю: 'oı',
	1: '1',
	2: '2',
	3: '3',
	4: '4',
	5: '5',
	6: '6',
	7: '7',
	8: '8',
	9: '9',
	0: '0'
};

let smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`, `😢`, `😩`, `😐`, `😕`, `😕`, `😤`, `😤`, `🤕`, `😪`, `😾`, `💀`, `💩`]);
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`, `😄`, `😁`, `😊`, `😉`, `😜`, `😋`, `😎`, `🤤`, `👻`, `🙈`, `🙉`, `🙀`, `😺`]);

//let users = require('./users.json');
let config = require('./settings.json');
let buttons = [];

vk.setOptions({ token: config.grouptoken, pollingGroupId: config.groupid });
const { updates, snippets } = vk;

updates.startPolling();

updates.on('message', async (message) => {
	if (Number(message.senderId) <= 0) return;
	//if (!users.find(x => x.id === message.senderId)) {
	const [user_info] = await vk.api.users.get({ user_id: message.senderId });
	const date = new Date();

	//push({

	//id: message.senderId,
	//	uid: users.length, 				// id игрока
	/*
	balance: 50000,					// Баланс
	
	bank: 0, 						// Банк
	hero_hp: 100,					// Здоровье Героя
	hero_zashita: 25,				// Защита Героя
	hero_ataka: 25,					// Атака Героя
	hero_kr_udar: 25,				// Критический урон Героя
	card: 0,						// Количество карт Героя
	rubins: 0,						// Количество рубинов
	btc: 0, 						// Биткоины
	farm_btc: 0,					// Количество биткоинов на ферме
	farms: 0,						// Количество ферм
	energy: 10,						// Энергия для шахты
	opit: 0,						// Опыт на шахте
	meteorit: 0,						// Метеорит
	biz: 0,							// Количество денег на бизнесе
	zhelezo: 0,						// Количество железа
	zoloto: 0,						// Количество золота
	almaz: 0,						// Количество алмазов
	bizlvl: 0,						// Уровень бизнеса
	hero_id: false,					// Id героя
	hero_name: `Герой не выбран`, 	// Имя героя
	part: false,					// Партнёрка
	kanal: false,					// Канал
	nuk_kanal: false,				// Название канала
	info_locked: false, 			// Информация о канале
	sub: 0,							// Количество подписчиков
	like: 0,						// Количество лайков
	dislike: 0,						// Количество дизлайков
	videos: 0,						// Количество видео
	camera: false,					// Наличие камеры
	microfon: false,				// Наличие микрофона
	heteri: 0,						// Количество хейтеров
	comment: 0,						// Количество комментариев
	tematika: false,				// Название тематики канала
	but: `Нет`,						// Наличие кнопки SweetTube
	sm: 0,							// Количество просмотров
	rec: true,						// Разрешие/Запрет на съёмку видео
	foolder: 0,						// Количество использованных команд
	rating: 0,						// Количество рейтинга
	regDate: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`, // Дата регистрации
	mention: true,					// Гиперссылка
	ban: false,						// Наличие бана	
	timers: {
		hasWorked: false,			// Работа
		bonus: false,				// Бонус
		poxod: false,				// Питомец поход
		poxod2: false,				// Поход
		hack: false					// Взломать
	},
	tag: user_info.first_name,
	work: 0,						// Id работы
	business: 0,					// Id бизнеса
	notifications: true,			// Наличие уведомлений
	exp: 1,							// Уровень игрока
	referal: null,					// Реферальная ссылка		
	promo: false,					// Промо
	transport: {
		car: 0,						// Id машины
		moto: 0,					// Id мотоцикла
		yacht: 0,					// Id яхты
		airplane: 0,				// Id самолёта
		helicopter: 0				// Id вертолёта
	},
	realty: {
		home: 0,					// Id дома
		apartment: 0,				// Id квартиры
		garage: 0,					// Id гаража
		interierhome: 0,				// Количество интерьера для дома
		interierapartment: 0			// Количество интерьера для квартиры
	},
	misc: {
		phone: 0,					// Id телефона
		shmot: 0,					// Id одежды
		farm: 0,					// Id фермы
		pet: 0,						// Id питомца
		dino: 0,					// Id динозавра
		lvl: 1,						// Уровень динозавра 
		pristavk: 0,				// Id пристави
		guns: 0,						// Id оружия
		valer: false					// Наличие вольера
	},
	settings: {
		adm: 0,						// Админка
		trade: true					// Бан/Разбан передачи денег
	},
	pet: {
		lvl: 0						// Уровень питомца
	},
	creatures: {
		unicorn: 0,
		unicorn_health: 5,
		unicorn_ataka: 3,
		unicorn_shit: 2,
		kinkong: 0,
		kinkong_health: 20,
		kinkong_ataka: 14,
		kinkong_shit: 5,
		megalodon: 0,
		megalodon_health: 55,
		megalodon_ataka: 36,
		megalodon_shit: 18,
		goblin: 0,
		goblin_health: 9,
		goblin_ataka: 4,
		goblin_shit: 11,
		medusha: 0,
		medusha_health: 18,
		medusha_ataka: 15,
		medusha_shit: 0,
		golem: 0,
		golem_health: 17,
		golem_ataka: 0,
		golem_shit: 83,
		godzila: 0,
		godzila_health: 48,
		godzila_ataka: 29,
		godzila_shit: 15,
		himera: 0,
		himera_health: 15,
		himera_ataka: 45,
		himera_shit: 14,
		delfin: 0,
		delfin_health: 48,
		delfin_ataka: 5,
		delfin_shit: 25,
		ktylhy: 0,
		ktylhy_health: 95,
		ktylhy_ataka: 95,
		ktylhy_shit: 2,
		orel: 0,
		orel_health: 40,
		orel_ataka: 88,
		orel_shit: 5,
		minotavr: 0,
		minotavr_health: 76,
		minotavr_ataka: 115,
		minotavr_shit: 35,
		grifon: 0,
		grifon_health: 20,
		grifon_ataka: 11,
		grifon_shit: 29,
		turtle: 0,
		turtle_health: 20,
		turtle_ataka: 2,
		turtle_shit: 100,
		salamandra: 0,
		salamandra_health: 5,
		salamandra_ataka: 70,
		salamandra_shit: 15,
		akromanryl: 0,
		akromanryl_health: 105,
		akromanryl_ataka: 105,
		akromanryl_shit: 56,
		ghost: 0,
		ghost_health: 0,
		ghost_ataka: 20,
		ghost_shit: 5,
		kraken: 0,
		kraken_health: 150,
		kraken_ataka: 150,
		kraken_shit: 1,
		issush: 0,
		issush_health: 30,
		issush_ataka: 60,
		issush_shit: 35,
		gigant: 0,
		gigant_health: 120,
		gigant_ataka: 5,
		gigant_shit: 5
		*/
	//}
	//});

	/*
	console.log(` +1 игрок [Игроков: ${users.length}]`);
	console.log(``);
	saveUsers();
	*/

	//}

	//message.user = users.find(x => x.id === message.senderId);


	const bot = (text, params) => {
		//return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}


	//if(message.user.ban) return bot(`Ваш аккаунт заблокирован ⛔`);

	const command = commands.find(x => x[0].test(message.text));

	if (!command) {
		message.send(`Такой команды не существует. 
		Отправь «Команды» чтобы узнать мои команды ❓`);
		//if (message.isChat) return;
	}

	//message.args = message.text.match(command[0]);
	//await command[1](message, bot);

	//saveUsers();
	console.log(` Введена команда: ${message.text}.`)
	console.log(``)
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(.*)?(?:помощь|привет|команды|📚 Команды|меню|help|commands|начать|start|Команды)$/i, message => {
	message.send(`мои команды:

📺 Гиф [фраза]
↪ Переверни [фраза]
🔮 Шар [фраза]
📊 Инфа [фраза]
💘 Совместимость [имя]
⏳ Когда [фраза]
⚖ Выбери [фраза] или [фраза2]
🎵 Музыка
🗣 Скажи м [фраза]
🗣 Скажи ж [фраза]
`,

		{
			keyboard: JSON.stringify
				({
					"one_time": false,
					"buttons":
						[
							[ //ПЕРВЫЙ РЯД
								{
									"action": {
										"type": "text",
										"payload": "{\"button\": \"1\"}",
										"label": "📚 Команды"
									},
									"color": "primary"
								},

								{
									"action": {
										"type": "text",
										"payload": "{}",
										"label": "🎵 Музыка"
									},
									"color": "primary"
								}
							]
						]
				})
		}


	);
});

cmd.hear(/^(?:гиф)\s(.*)$/i, async (message, bot) => {
	vk.api.call('docs.search', { q: message.args[1] + '.gif', count: 10 })
		.then(response => {
			let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
			let item = utils.pick(response.items);
			if (items == false) {
				return bot(`Ничего не смог найти по вашему запросу ${smileerror}`)
			}
			message.send({ attachment: items })
		})
});

cmd.hear(/^(?:гиф)$/i, message => {
	message.send(`Введите фразу для поиска гифки ${smileerror}:
	📺 Гиф [фраза]
	${smilesuccess} Например: "Гиф мемы"`)
});

cmd.hear(/^(?:переверни)\s([^]+)$/i, message => {
	let text = ``;
	message.args[1].split('').map(x => {
		if (rotateText[x]) {
			text += rotateText[x];
		}
	});
	message.send(`держи: "${text.split('').reverse().join('')}" ${smilesuccess}`)
});

cmd.hear(/^(?:Переверни)$/i, message => {
	message.send(`Вы не ввели фразу , которую надо перевернуть ${smileerror}:
	📺 Переверни [фраза]
	${smilesuccess} Например: "Переверни слово"`)
});

cmd.hear(/^(?:шар)\s([^]+)$/i, message => {
	const phrase = utils.pick(['перспективы не очень хорошие 🤔', 'сейчас нельзя предсказать 🤔', 'пока не ясно 🤔', 'знаки говорят - "Да" 🤔', 'знаки говорят - "Нет" 🤔', 'можешь быть уверен в этом 🤔', 'мой ответ - "нет" 🤔', 'мой ответ - "да" 🤔', 'бесспорно 🤔', 'мне кажется - "Да" 🤔', 'мне кажется - "Нет" 🤔']);
	message.send(phrase);
});

cmd.hear(/^(?:Шар)$/i, async (message, bot) => {
	return bot(`Введите фразу для выявления вероятности ${smileerror}:
	📺 Шар [фраза]
	${smilesuccess} Например: "Шар мне повезёт?"`)
});

cmd.hear(/^(?:совместимость)\s?([^]+)?/i, message => {
	let user = message.user;
	if (!message.args[1]) return message.send(`Подсказка: введи "Совместимость [Имя парня/девушки]"`);
	message.send(`Ваша совместимость в любви с ${message.args[1]} -- ${utils.random(0, 100)}% 🙀\n😍Ваша совместимость в браке с ${message.args[1]} -- ${utils.random(0, 100)}% 💑`);
	return message.sendSticker(utils.pick([9019, 14889]));
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['шанс этого', 'мне кажется около']);
	const percent = utils.random(100);
	return bot(`${phrase} ${percent}% 🙈`)
});

cmd.hear(/^(?:инфа|шанс|вероятность)$/i, async (message, bot) => {
	return bot(`Введите фразу для выявления процента ${smileerror}:
	📺 Инфа [фраза]
	${smilesuccess} Например: "Инфа мне повезёт?"`)
});

cmd.hear(/^(?:скажи)\s([м|ж])\s(.*)$/i, async (message) => {
	let https = require('https');
	if (!message.args[1] && !message.args[2]) return message.send('Пример использования: Скажи м привет (м - мужской голос, ж - женский голос)');
	if (message.text.length > 500) return message.send('Макс. - 500 символов');
	https.get("https://tts.voicetech.yandex.net/generate?text=" + encodeURIComponent(message.args[2]) + `&format=mp3&lang=ru-RU&speaker=${message.args[1] == "м" ? "ermil" : utils.pick(["alyss", "jane"])}&speed=1&key=3b141899-4097-45c6-a00b-d449812e1ffa&emotion=mixed`, (stream) => {
		stream.name = 'audio_message.ogg';
		return message.sendAudioMessage(stream);
	});
});

cmd.hear(/^(?:когда)\s([^]+)$/i, async (message, bot) => {
	let user = message.user;
	let rez = utils.random([true]);
	if (rez == false) {
	} else {
		let count = utils.pick(['Лет', 'Дней', 'Часов', 'Минут', 'Мили-секунд', 'Недель', 'Месяцев']);
		return bot(`Я думаю что это произойдет через ${utils.random(1, 210)} ${count}`);
	}
});

cmd.hear(/^(?:Когда)$/i, async (message, bot) => {
	return bot(`Введите то , что вы хотите предугадать ${smileerror}:
	📺 Когда [фраза]
	${smilesuccess} Например: "Когда лето"`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];
	const phrase = utils.pick([`конечно ${utils.random(1, 2)} вариант ${smilesuccess}`, `мне кажется, что ${utils.random(1, 2)} вариант лучше ${smilesuccess}`]);
	return bot(`${phrase}`);
});

cmd.hear(/^(?:Выбери)$/i, async (message, bot) => {
	return bot(`Введите то , из чего нужно выбрать ${smileerror}:
	📺 Выбери [фраза] или [фраза2]
	${smilesuccess} Например: "1 или 2"`)
});

cmd.hear(/^(?:рандом музыка|музыка|🎵 Музыка)$/i, async (message) => {
	message.send(`Держи годный трек ${smilesuccess}`, {
		attachment: utils.pick([
			"audio214005613_456239619", //Trampoline
			"audio214005613_456239612", //Всё как у людей
			"audio214005613_456239599", //Untouchable
			"audio214005613_456239567", //Mambo Italiano
			"audio214005613_456239557", //Два типа людей
			"audio214005613_456239550", //Бонни и Клайд
			"audio214005613_456239543", //Lalala
			"audio214005613_456239538", //Грустный Денс
			"audio214005613_456239221", //Малиновый закат
			"audio214005613_456239414", //Малый повзрослел
			"audio214005613_456239585", //Танцуй до утра
			"audio214005613_456239368", //No place
			"audio214005613_456239473", //Dancin
			"audio214005613_456239316", //Machine
			"audio214005613_456239319", //Friends
			"audio214005613_456239310"  //Panda E
		])
	});
	return message.sendSticker(13918);
});
