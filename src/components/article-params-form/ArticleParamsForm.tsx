import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [localState, setLocalState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOpen = () => {
		setIsOpen(!isOpen);
		setLocalState(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onApply(localState);
	};

	const handleReset = (): void => {
		setLocalState(defaultArticleState);
		onReset();
	};

	const updateLocalState = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setLocalState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h1 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h1>

					<Select
						options={fontFamilyOptions}
						selected={localState.fontFamilyOption}
						onChange={(option) => updateLocalState('fontFamilyOption', option)}
						title='Шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={(option) => updateLocalState('fontSizeOption', option)}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={localState.fontColor}
						onChange={(option) => updateLocalState('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={(option) => updateLocalState('backgroundColor', option)}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={(option) => updateLocalState('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
