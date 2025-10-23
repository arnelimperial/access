export function showToast(message) {
  const toastElement = document.getElementById("liveToast");
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;

  const bsToast = new bootstrap.Toast(toastElement);
  bsToast.show();
}