document.addEventListener("DOMContentLoaded", function () {
  const mcForm = document.querySelector("#popupForm form");

  if (mcForm) {
    mcForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission
      const thankYouPageURL = "https://yourwebsite.com/thank-you-page"; // Replace with your actual thank-you page URL
      window.location.href = thankYouPageURL; // Redirect to thank-you page in the same tab
    });
  }
});




document.addEventListener("DOMContentLoaded", function () {
    const mcForm = document.querySelector("#popupForm form");
  
    if (mcForm) {
      mcForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        const thankYouPageURL = "original.pdf"; // Replace with your actual thank-you page URL
        window.open(thankYouPageURL, "_blank"); // Open the thank-you page in a new tab
        mcForm.submit(); // Proceed with the form submission
      });
    }
  });


