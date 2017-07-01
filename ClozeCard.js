exports.ClozeCard = function(text, cloze) {
  this.full = text; // Contains only the full text
  this.cloze = cloze; // Contains only the cloze-deleted portion of the text
  blank = "";
  for (var i = 0; i < cloze.length; i++) {
    blank += "_ " + "";
  };
  this.partial = text.replace(cloze, " " + blank);
}


