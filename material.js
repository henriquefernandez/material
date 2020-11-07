/* material-dashboard */
if((window.innerWidth < 500) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  let el = document.getElementById("material-dashboard-control")
  if (el != null) { el.checked = false; }
}
