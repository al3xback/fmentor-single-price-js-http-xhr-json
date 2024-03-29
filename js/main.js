import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/3beff86e41c20041c47d2c51e6aae27d/raw/f496aac06cd07887bd0fdf78a9a24afcc8b0ca90/single-price-data.json';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const sectionJoinCommunityTemplate = document.getElementById(
	'section-join-community-template'
);
const sectionMonthlySubscriptionTemplate = document.getElementById(
	'section-monthly-subsription-template'
);
const sectionWhyUsTemplate = document.getElementById('section-why-us-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const {
		joinCommunity: joinCommunityData,
		monthlySubscription: monthlySubscriptionData,
		whyUs: whyUsData,
	} = JSON.parse(data);
	const {
		title: joinCommunityTitle,
		subtitle: joinCommunitySubtitle,
		description: joinCommunityDescription,
	} = joinCommunityData;
	const {
		title: monthlySubscriptionTitle,
		price: monthlySubscriptionPrice,
		description: monthlySubscriptionDescription,
	} = monthlySubscriptionData;
	const { title: whyUsTitle, benefits: whyUsBenefits } = whyUsData;

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');
	const sectionGroupEl = cardTemplateNode.querySelector('.card__group');

	/* [section join community] */
	const sectionJoinCommunityTemplateNode = document.importNode(
		sectionJoinCommunityTemplate.content,
		true
	);
	const sectionJoinCommunityEl =
		sectionJoinCommunityTemplateNode.querySelector(
			'.card__block--join-community'
		);

	const sectionJoinCommunityTitleEl =
		sectionJoinCommunityEl.querySelector('.card__title');
	sectionJoinCommunityTitleEl.textContent = joinCommunityTitle;

	const sectionJoinCommunitySubtitleEl =
		sectionJoinCommunityEl.querySelector('.card__subtitle');
	sectionJoinCommunitySubtitleEl.textContent = joinCommunitySubtitle;

	const sectionJoinCommunityDescriptionEl =
		sectionJoinCommunityEl.querySelector('.card__desc');
	sectionJoinCommunityDescriptionEl.textContent = joinCommunityDescription;

	/* [section monthly subscription] */
	const sectionMonthlySubscriptionTemplateNode = document.importNode(
		sectionMonthlySubscriptionTemplate.content,
		true
	);
	const sectionMonthlySubscriptionEl =
		sectionMonthlySubscriptionTemplateNode.querySelector(
			'.card__block--monthly-subsription'
		);

	const sectionMonthlySubscriptionTitleEl =
		sectionMonthlySubscriptionEl.querySelector('.card__title');
	sectionMonthlySubscriptionTitleEl.textContent = monthlySubscriptionTitle;

	const sectionMonthlySubscriptionPriceEl =
		sectionMonthlySubscriptionEl.querySelector('.card__price');
	const sectionMonthlySubscriptionPriceAmountEl =
		sectionMonthlySubscriptionPriceEl.querySelector('.num');
	sectionMonthlySubscriptionPriceAmountEl.textContent =
		monthlySubscriptionPrice.substring(
			0,
			monthlySubscriptionPrice.indexOf(' ')
		);
	const sectionMonthlySubscriptionPriceLabelEl =
		sectionMonthlySubscriptionPriceEl.querySelector('.label');
	sectionMonthlySubscriptionPriceLabelEl.textContent =
		monthlySubscriptionPrice.substring(
			monthlySubscriptionPrice.indexOf(' ') + 1
		);

	const sectionMonthlySubscriptionDescriptionEl =
		sectionMonthlySubscriptionEl.querySelector('.card__desc');
	sectionMonthlySubscriptionDescriptionEl.textContent =
		monthlySubscriptionDescription;

	/* [section why us] */
	const sectionWhyUsTemplateNode = document.importNode(
		sectionWhyUsTemplate.content,
		true
	);
	const sectionWhyUsEl = sectionWhyUsTemplateNode.querySelector(
		'.card__block--why-us'
	);

	const sectionWhyUsTitleEl = sectionWhyUsEl.querySelector('.card__title');
	sectionWhyUsTitleEl.textContent = whyUsTitle;

	const sectionWhyUsListEl = sectionWhyUsEl.querySelector('.card__list');

	for (const benefit of whyUsBenefits) {
		const sectionWhyUsListItemEl = document.createElement('li');
		sectionWhyUsListItemEl.textContent = benefit;

		sectionWhyUsListEl.appendChild(sectionWhyUsListItemEl);
	}

	/* [init] */
	removeLoading();
	sectionGroupEl.appendChild(sectionMonthlySubscriptionTemplateNode);
	sectionGroupEl.appendChild(sectionWhyUsTemplateNode);
	cardEl.prepend(sectionJoinCommunityTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
