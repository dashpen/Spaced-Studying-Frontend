fetch("/navbar.html", { method: "GET"})
  .then(response => response.text())
  .then((html) => {
    document.getElementById("navbar").innerHTML = html;
  })
  .catch((error) => {
    console.error("There was an error with getting navbar", error);
  });