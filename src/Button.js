import PropTypes from 'prop-types'
import styles from './Button.module.css' //css코드 import

function Button({text}){
    return <button className={styles.btn}>{text}</button>
}

Button.propTypes={
    text:PropTypes.string.isRequired,
}

export default Button //App.js에서 Button을 가져올 수 있게 한다