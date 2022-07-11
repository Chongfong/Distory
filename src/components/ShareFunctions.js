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

export const transformTimeToHDS = (seconds) => {
  const t = new Date(seconds);
  const formatted = `${(`0${t.getHours() + 1}`).slice(-2)}:
  ${(`0${t.getMinutes() + 1}`).slice(-2)}:
  ${(`0${t.getSeconds() + 1}`).slice(-2)}`;
  return formatted;
};

export const timeAgo = (seconds) => {
  const dateNow = Date.now();
  const nowMinusT = dateNow - seconds;
  let formatted;
  if (new Date(nowMinusT).getHours() + 1 < 10) {
    if (new Date(nowMinusT).getHours() + 1 < 1) {
      if (new Date(nowMinusT).getMinutes() + 1 < 10) {
        formatted = `${(`0${new Date(nowMinusT).getMinutes() + 1}`).slice(-1)} mins ago`;
      } else {
        formatted = `${(`${new Date(nowMinusT).getMinutes() + 1}`).slice(-2)} mins ago`;
      }
    } else {
      formatted = `${(`${new Date(nowMinusT).getHours() + 1}`).slice(-1)} hrs ago`;
    }
  } else {
    formatted = `${(`${new Date(nowMinusT).getMinutes() + 1}`).slice(-2)} hrs ago`;
  }

  return formatted;
};
