import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SelectParams } from '../select-params';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';

import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  ArticleStateType,
  defaultArticleState
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
  state: ArticleStateType;
  onStateChange: (state: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({ state, onStateChange, onReset }: ArticleParamsFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(state);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onStateChange(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onReset();
    setIsOpen(false);
  };

  const handleSelectChange = <K extends keyof ArticleStateType>(
    key: K,
    value: string | ArticleStateType[K]
  ) => {
    const optionsMap = {
      fontFamilyOption: fontFamilyOptions,
      fontSizeOption: fontSizeOptions,
      fontColor: fontColors,
      backgroundColor: backgroundColors,
      contentWidth: contentWidthArr
    };

    if (typeof value !== 'string') {
      setFormState(prev => ({ ...prev, [key]: value }));
      return;
    }

    const selectedOption = optionsMap[key].find(opt => opt.value === value);
    if (selectedOption) {
      setFormState(prev => ({ ...prev, [key]: selectedOption }));
    }
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h1>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>ШРИФТ</h2>
            <SelectParams
              options={fontFamilyOptions}
              value={formState.fontFamilyOption.value}
              onChange={(value) => handleSelectChange('fontFamilyOption', value)}
            />
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>РАЗМЕР ШРИФТА</h2>
            <div className={styles.sizeOptions}>
              {fontSizeOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.sizeOption} ${
                    formState.fontSizeOption.value === option.value 
                      ? styles.sizeOption_selected 
                      : ''
                  }`}
                  onClick={() => handleSelectChange('fontSizeOption', option)}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>ЦВЕТ ШРИФТА</h2>
            <SelectParams
              options={fontColors}
              value={formState.fontColor.value}
              onChange={(value) => handleSelectChange('fontColor', value)}
            />
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>ЦВЕТ ФОНА</h2>
            <SelectParams
              options={backgroundColors}
              value={formState.backgroundColor.value}
              onChange={(value) => handleSelectChange('backgroundColor', value)}
            />
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>ШИРИНА КОНТЕНТА</h2>
            <SelectParams
              options={contentWidthArr}
              value={formState.contentWidth.value}
              onChange={(value) => handleSelectChange('contentWidth', value)}
            />
          </div>
         
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};