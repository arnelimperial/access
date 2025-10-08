import { fetchContactMessages, fetchBookingRequests } from './firebase.js';

function generateContactRows(data) {
  return Object.entries(data).map(([key, value]) => `
    <tr>
      <th scope="row">${key}</th>
      <td>${value.title || ''}</td>
      <td>${value.firstName || ''}</td>
      <td>${value.lastName || ''}</td>
      <td>${value.email || ''}</td>
      <td>${value.message || ''}</td>
      <td>${value.submittedAt || ''}</td>
    </tr>
  `).join('');
}

function generateBookingRows(data) {
  return Object.entries(data).map(([key, value]) => `
    <tr>
      <th scope="row">${key}</th>
      <td>${value.firstName || ''}</td>
      <td>${value.lastName || ''}</td>
      <td>${value.phone || ''}</td>
      <td>${value.email || ''}</td>
      <td>${value.checkin || ''}</td>
      <td>${value.checkout || ''}</td>
      <td>${value.adults || ''}</td>
      <td>${value.children || ''}</td>
      <td>${value.suite || ''}</td>
      <td>${value.board || ''}</td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const contactTableBody = document.querySelector('#contactMessagesBody');
  const bookingTableBody = document.querySelector('#bookingRequestsBody');

  fetchContactMessages()
    .then(data => {
      contactTableBody.innerHTML = data ? generateContactRows(data) :
        `<tr><td colspan="7" class="text-center">No Contact Messages found.</td></tr>`;
    })
    .catch(err => {
      contactTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error fetching data</td></tr>`;
      console.error(err);
    });

  fetchBookingRequests()
    .then(data => {
      bookingTableBody.innerHTML = data ? generateBookingRows(data) :
        `<tr><td colspan="11" class="text-center">No Booking Requests found.</td></tr>`;
    })
    .catch(err => {
      bookingTableBody.innerHTML = `<tr><td colspan="11" class="text-center text-danger">Error fetching data</td></tr>`;
      console.error(err);
    });
});
