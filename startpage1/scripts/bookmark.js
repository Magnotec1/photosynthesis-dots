function newBookmark(url, name) {
  const ul = document.getElementsByClassName("items");
  ul[0].innerHTML += `<li><a href="${url}">${name}</a></li>`;
}