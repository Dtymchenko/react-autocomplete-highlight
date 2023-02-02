import styles from './Input.module.scss'

const Input = ({ onChangeInput, inputValue}) => {
  return (
    <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={onChangeInput}
        placeholder="enter search"
        />
  )
}

export default Input