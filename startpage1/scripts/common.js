function getStyleSheet(stsh_title) {
  for (const sheet of document.styleSheets) {
    if (sheet.title === stsh_title) {
      return sheet;
    }
  }
}
