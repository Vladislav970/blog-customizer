import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
	});

	const toggleMenu = () => setIsMenuOpen((previousState) => !previousState);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(initialState);
		onApply(initialState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.formContent}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<div className={styles.controls}>
							<Select
								title='Шрифт'
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={(fontFamilyOption) =>
									setFormState((previousState) => ({
										...previousState,
										fontFamilyOption,
									}))
								}
							/>
							<Separator />
							<RadioGroup
								title='Размер шрифта'
								name='radio'
								selected={formState.fontSizeOption}
								options={fontSizeOptions}
								onChange={(fontSizeOption) =>
									setFormState((previousState) => ({
										...previousState,
										fontSizeOption,
									}))
								}
							/>
							<Separator />
							<Select
								title='Цвет шрифта'
								selected={formState.fontColor}
								options={fontColors}
								onChange={(fontColor) =>
									setFormState((previousState) => ({
										...previousState,
										fontColor,
									}))
								}
							/>
							<Separator />
							<Select
								title='Цвет фона'
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={(backgroundColor) =>
									setFormState((previousState) => ({
										...previousState,
										backgroundColor,
									}))
								}
							/>
							<Separator />
							<Select
								title='Ширина контента'
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={(contentWidth) =>
									setFormState((previousState) => ({
										...previousState,
										contentWidth,
									}))
								}
							/>
						</div>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
