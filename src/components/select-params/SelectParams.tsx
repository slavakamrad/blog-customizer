import styles from './SelectParams.module.scss';

type OptionType = {
  title: string;
  value: string;
  className?: string;
  optionClassName?: string;
};

type SelectParamsProps = {
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const SelectParams = ({
  options,
  value,
  onChange,
  className = ''
}: SelectParamsProps) => {
  return (
    <div className={`${styles.selectWrapper} ${className}`}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className={`${styles.option} ${option.optionClassName ? styles[option.optionClassName] : ''}`}
            data-color={option.value}
          >
            {option.title}
          </option>
        ))}
      </select>
    
    </div>
  );
};