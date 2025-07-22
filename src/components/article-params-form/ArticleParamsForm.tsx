import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [localState, setLocalState] =
		useState<ArticleStateType>(defaultArticleState);

	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onChange: setIsMenuOpen,
	});

	const handleOpen = () => {
		setIsMenuOpen(!isMenuOpen);
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
			<ArrowButton isOpen={isMenuOpen} onClick={handleOpen} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} size={31}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

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
