export const changeHTMLToPureText = (inputText) => {
  const text = inputText;
  return (text.replaceAll(/<[^>]+>/g, ''));
};

export const removeClickButtonsTag = (inputText) => {
  let text = inputText;
  text = text.replaceAll(/<clickbutton[^>]+>/g, '');
  text = text.replaceAll(/<\/clickbutton>/g, '');
  return (text);
};

export const transformTimeToDate = (seconds) => {
  const t = new Date(seconds);
  const formatted = `${t.getFullYear()}.
  ${(`0${t.getMonth() + 1}`).slice(-2)}.
  ${(`0${t.getDate()}`).slice(-2)}`;
  return formatted;
};
