module.exports = (temp, word) => {
  let output = temp.replace(/{%WORD%}/g, word.german);
  output = output.replace(/{%NUMBER%}/g, word.number);
  output = output.replace(/{%PARTOFSPEACH%}/g, word.speach);
  output = output.replace(/{%TRANSLATION%}/g, word.english);
  output = output.replace(/{%EXAMPLE%}/g, word.example);
  output = output.replace(/{%ID%}/g, word.id);
  return output;
};
