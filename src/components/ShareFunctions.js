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
