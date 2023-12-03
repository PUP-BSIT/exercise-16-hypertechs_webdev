// Common function to render comments
function renderComment(name, commentText, timestamp) {
  let commentList = document.getElementById("comment_list");
  let newComment = document.createElement("div");
  newComment.classList.add("comment-container");

  let userIcon = document.createElement("img");
  userIcon.src = "images/user_icon.jpg";
  userIcon.alt = "User Icon";
  userIcon.className = "user-icon";

  let commentContent = document.createElement("div");
  commentContent.classList.add("comment-content");

  let nameElement = document.createElement("strong");
  nameElement.textContent = name;

  // Add date and time
  let dateTimeElement = document.createElement("span");
  dateTimeElement.className = "comment-timestamp";
  dateTimeElement.setAttribute("data-timestamp", timestamp.toISOString());
  dateTimeElement.textContent = timestamp.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  let commentElement = document.createElement("p");
  commentElement.textContent = commentText;

  commentContent.appendChild(nameElement);
  commentContent.appendChild(dateTimeElement);
  commentContent.appendChild(commentElement);

  newComment.appendChild(userIcon);
  newComment.appendChild(commentContent);

  commentList.prepend(newComment);
}

// Function to add a new comment
function addComment() {
  let name = document.getElementById("name").value;
  let commentText = document.getElementById("comment").value;

  if (!name.trim() || !commentText.trim()) {
    alert("Please fill out both fields.");
    return;
  }

  let timestamp = new Date();
  renderComment(name, commentText, timestamp);

  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
}

// Function to sort comments
function sortComments(order) {
  let commentList = document.getElementById("comment_list");
  let comments = Array.from(commentList.children);

  comments.sort((a, b) => {
    let timestampA = new Date(
      a.querySelector(".comment-timestamp").getAttribute("data-timestamp")
    );
    let timestampB = new Date(
      b.querySelector(".comment-timestamp").getAttribute("data-timestamp")
    );

    if (order === "asc") {
      return timestampA - timestampB;
    } else {
      return timestampB - timestampA;
    }
  });

  commentList.innerHTML = "";
  comments.forEach((comment) => commentList.appendChild(comment));
}

// Render the static comments by teammates
renderComment(
  "Mary Joy Danay",
  "Amazing! Your webpage is superb and dynamic.",
  new Date("2023-11-04T12:25:00Z")
);
renderComment(
  "Angel Rose Casabuena",
  "Wishing all the best!",
  new Date("2023-11-04T12:38:00Z")
);
renderComment(
  "Judy Ann Dupo",
  "Your goals, as shared here, are commendable!",
  new Date("2023-11-04T13:25:00Z")
);
renderComment(
  "Calib Serrano",
  "I also like to learn a music instrument like guitar.",
  new Date("2023-11-04T15:41:00Z")
);

// Hide sort icon when options are selected
document
  .getElementById("sort_dropdown")
  .addEventListener("change", function () {
    let selectedOption = this.value;

    if (selectedOption === "asc" || selectedOption === "desc") {
      this.classList.add("hide-icon");
    } else {
      this.classList.remove("hide-icon");
    }
  });
