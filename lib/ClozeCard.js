
function ClozeCard(text, clozeDeletion) {

  if (!(this instanceof ClozeCard)) {
    return new ClozeCard(text, clozeDeletion);
  }

  var clozePostions = clozeDelete(text, clozeDeletion);

  this.partial = getPartial(text, clozePostions);

  this.cloze = text.slice(clozePostions[0], clozePostions[1]);

  function getPartial(text, clozePostions) {

    var start = text.slice(0, clozePostions[0]);
    var end = text.slice(clozePostions[1], text.length);

    return start + "..." + end;
  }

  function clozeDelete(text, clozeDeletion) {
    var start = text.indexOf(clozeDeletion);

    if (start !== -1) {
      return [start, start + clozeDeletion.length];
    }
    throw new Error("Cloze deletion not found in input text.");
  }
}

ClozeCard.prototype.displayCard = function displayCard() {
  return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
};

module.exports = ClozeCard;
