let player;

// Variable to store the name of the clicked button
let clickedButtonName = "";

// Select all elements with the class 'openPopup' and add event listeners to each
document.querySelectorAll(".openPopup").forEach(function (element) {
  element.addEventListener("click", function () {
    // Capture the button name from the data attribute
    clickedButtonName = element.getAttribute("data-button-name");

    // Set the hidden input field value
    document.getElementById("buttonName").value = clickedButtonName;

    // Display the popup form
    document.getElementById("popupForm").style.display = "flex";
  });
});

// Close button within the popup
document
  .querySelector(".popup-content .close-button")
  .addEventListener("click", function () {
    document.getElementById("popupForm").style.display = "none";
  });

// Close the popup when clicking outside the popup content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("popupForm")) {
    document.getElementById("popupForm").style.display = "none";
  }
});

// my code

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form");
//   const popupForm = document.getElementById("popupForm");
//   const popupVideo = document.querySelector(".popup-video");
//   const sharePopup = document.querySelector(".share-popup");
//   const videoElement = document.getElementById("myVideo");

//   if (!videoElement) {
//     console.error("Video element with ID 'myVideo' not found.");
//     return;
//   }

//   // Handle form submission
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(form);

//     fetch("smtp.php", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           // Close form popup and open video popup
//           popupForm.classList.add("hidden");
//           popupVideo.classList.remove("hidden");
//           // Mute the video to allow autoplay
//           videoElement.muted = true;
//           videoElement.play().catch((error) => {
//             console.error("Video playback failed:", error);
//           });
//         } else {
//           alert("There was an error. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });

//   // Listen for video end
//   videoElement.addEventListener("ended", function () {
//     // Close video popup and open share popup
//     // popupVideo.classList.add("hidden");
//     sharePopup.classList.remove("hidden");
//   });

//   // Generate social media share URLs
//   const shareLinks = document.querySelectorAll(".share-popup ul li a");
//   const currentUrl = encodeURIComponent(window.location.href);

//   const platforms = [
//     {
//       name: "Facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
//     },
//     {
//       name: "Twitter",
//       url: `https://twitter.com/intent/tweet?url=${currentUrl}`,
//     },
//     {
//       name: "LinkedIn",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
//     },
//     { name: "WhatsApp", url: `https://wa.me/?text=${currentUrl}` },
//     { name: "Email", url: `mailto:?subject=Check this out&body=${currentUrl}` },
//   ];

//   shareLinks.forEach((link, index) => {
//     if (platforms[index]) {
//       link.setAttribute("href", platforms[index].url);
//       link.setAttribute("target", "_blank"); // Opens the share link in a new tab
//       link.setAttribute("rel", "noopener noreferrer"); // Security best practice
//     }
//   });
// });

// Declare player variable in the global scope

// This function creates an <iframe> and YouTube player after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtubePlayer", {
    height: "390", // Adjust as needed
    width: "640", // Adjust as needed
    videoId: "90s_m3A0pDs", // Replace with your YouTube Video ID
    playerVars: {
      autoplay: 0, // Autoplay disabled initially
      controls: 1,
      mute: 1, // Start muted to allow autoplay if needed
    },
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const popupForm = document.getElementById("popupForm");
  const popupVideo = document.querySelector(".popup-video");
  const sharePopup = document.querySelector(".share-popup");

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("smtp.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "success") {
          popupForm.style.display = "none";
          // Close form popup and open video popup
          // popupForm.classList.add("hidden");
          popupVideo.classList.remove("hidden");

          // Play the YouTube video
          if (player && player.playVideo) {
            player.mute(); // Ensure the video is muted
            player.playVideo();
          } else {
            console.error("YouTube Player not initialized.");
          }
        } else {
          alert("There was an error. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  // Listen for video end
  // Note: For YouTube videos, use the IFrame API's state change events instead
});

// Handle YouTube player state changes
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    // Close video popup and open share popup
    const sharePopup = document.querySelector(".share-popup");
    if (sharePopup) {
      sharePopup.classList.remove("hidden");
    }
  }
}

// Generate social media share URLs after the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", function () {
//   const shareLinks = document.querySelectorAll(".share-popup ul li a");
//   const currentUrl = encodeURIComponent(window.location.href);

//   const platforms = [
//     {
//       name: "LinkedIn",
//       url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//         "https://youtu.be/90s_m3A0pDs"
//       )}`,
//     },
//     {
//       name: "Facebook",
//       url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//         "https://youtu.be/90s_m3A0pDs"
//       )}`,
//     },
//     {
//       name: "Instagram",
//       url: null, // Instagram does not support direct URL-based sharing
//       note: "Instagram does not support sharing via URL.",
//     },
//     {
//       name: "Twitter",
//       url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
//         "https://youtu.be/90s_m3A0pDs"
//       )}`,
//     },
//   ];

//   shareLinks.forEach((link, index) => {
//     if (platforms[index]) {
//       link.setAttribute("href", platforms[index].url);
//       link.setAttribute("target", "_blank"); // Opens the share link in a new tab
//       link.setAttribute("rel", "noopener noreferrer"); // Security best practice
//     }
//   });
// });
// 2nd

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form1");

//   // Handle form submission
//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(form);

//     fetch("smtp.php", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status == "success") {
//           // Close the popup form
//           document.getElementById("popupForm").style.display = "none";

//           // Open the PDF in the same tab
//           window.open("/original.pdf", "_blank");
//           // window.location.href = "/original.pdf";
//         } else {
//           alert("There was an error. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });
// });

// Function to detect if the user is on a mobile device
function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Function to update the URLs based on device type
function updateShareLinks() {
  // Get all the social media links
  const linkedinLink = document.querySelector(".linkedin-share");
  const facebookLink = document.querySelector(".facebook-share");
  const twitterLink = document.querySelector(".twitter-share");

  // URL for the content you want to share
  const shareUrl = "https://youtu.be/90s_m3A0pDs";

  if (isMobile()) {
    // For mobile devices, use deep links for apps
    linkedinLink.href = `linkedin://share?url=${shareUrl}`;
    facebookLink.href = `fb://page/yourpage?u=${shareUrl}`;
    twitterLink.href = `twitter://post?message=${shareUrl}`;
  } else {
    // For desktop, use the regular web-based sharing links
    linkedinLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    twitterLink.href = `https://twitter.com/intent/tweet?url=${shareUrl}`;
  }
}

// Run the updateShareLinks function when the page loads
window.onload = updateShareLinks;

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup-video");
  const share = document.querySelector(".share-popup");
  const closeBtn = document.querySelector(".close-popup");

  // Close the popup and reapply the 'hidden' class
  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    share.classList.add("hidden");
  });
});

// newslatter form

document.addEventListener("DOMContentLoaded", function () {
  // Select all forms with the shared class "form1"
  const forms = document.querySelectorAll(".newslatterform");

  // Attach submit event listener to each form
  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission

      try {
        const formData = new FormData(form); // Collect form data

        // Send data to the server
        const response = await fetch("newslatter.php", {
          method: "POST",
          body: formData,
        });

        // Parse JSON response
        const data = await response.json();

        if (data.status === "success") {
          document.getElementById("responseMessage").innerText =
            "Thanks for subscribing to Core42! Stay tuned for updates.";
        } else {
          document.getElementById("responseMessage").innerText =
            "There was an error. Please try again.";
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Submission error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    });
  });
});

//tahnkyou
