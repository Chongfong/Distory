export const changeHTMLToPureText = (inputText) => {
  const text = inputText;
  const textLineBreak = text.replaceAll('\n', '<br />');
  return (textLineBreak.replaceAll(/<[^>]+>/g, ''));
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
  if ((new Date(nowMinusT).getDate() - 1) * 24 + new Date(nowMinusT).getHours() - 8 < 10) {
    if ((new Date(nowMinusT).getDate() - 1) * 24 + new Date(nowMinusT).getHours() - 8 < 1) {
      if ((new Date(nowMinusT).getDate() - 1) * 86400
      + (new Date(nowMinusT).getHours() - 8) * 60
      + new Date(nowMinusT).getMinutes() + 1 < 10) {
        formatted = `${(`${(new Date(nowMinusT).getDate() - 1) * 86400
          + (new Date(nowMinusT).getHours() - 8) * 60
          + new Date(nowMinusT).getMinutes() + 1}`).slice(-1)} mins ago`;
        return formatted;
      }
      formatted = `${(`${(new Date(nowMinusT).getDate() - 1) * 86400
        + (new Date(nowMinusT).getHours() - 8) * 60
        + new Date(nowMinusT).getMinutes() + 1}`).slice(-2)} mins ago`;
      return formatted;
    }formatted = `${(`${(new Date(nowMinusT).getDate() - 1) * 24
      + new Date(nowMinusT).getHours() - 8}`).slice(-1)} hrs ago`;
    return formatted;
  } formatted = `${(`${(new Date(nowMinusT).getDate() - 1) * 24
    + new Date(nowMinusT).getHours() - 8}`).slice(-2)} hrs ago`;
  return formatted;
};
