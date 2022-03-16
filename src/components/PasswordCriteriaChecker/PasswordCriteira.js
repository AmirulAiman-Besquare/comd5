const passwordCriteria = ({
  capsLetterFlag,
  numberFlag,
  pwdLengthFlag,
  specialCharFlag,
}) => {
  return (
    <div className="message">
      <ul>
        <p className={capsLetterFlag}>Must contain 1 Capital Letter</p>
        <p className={numberFlag}>Must contain number</p>
        <p className={pwdLengthFlag}>Must be 8 Chars long</p>
        <p className={specialCharFlag}> Must contain special character</p>
      </ul>
    </div>
  );
};

export default passwordCriteria;
