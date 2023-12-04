let nameField = document.getElementById("name");
let commentField = document.getElementById("comment");
let commentBtn = document.getElementById("comment_button");
let comSection = document.getElementById("id_comment");
let sortOrder = 'desc'; 
let commentQueue = [];

function enableCommentButton() {
    if (nameField.value.length && commentField.value.length) {
        commentBtn.disabled = false;
    } else {
        commentBtn.disabled = true;
    }
}

function addComment() {
    let commentDate = new Date();
    let comments = {
        comment_name: nameField.value,
        text_comment: commentField.value,
        timestamp: commentDate.getTime()
    };

    commentQueue.push(comments);

    sortComments(); 
    renderComments(); 

    nameField.value = "";
    commentField.value = "";
    commentBtn.disabled = true;
}

function renderComments() {
    comSection.innerHTML = "";
    commentQueue.forEach(comment => {
        comSection.innerHTML += `
            <p><strong>${comment.comment_name}: </strong>
                ${comment.text_comment} 
                <em>${new Date(comment.timestamp).toLocaleString()}</em>
            </p>`;
    });
}

function sortComments() {
    sortOrder = document.getElementById("sortOrder").value;
    commentQueue.sort((a, b) => 
        (sortOrder === 'desc') ? 
            (b.timestamp - a.timestamp) : (a.timestamp - b.timestamp));
    renderComments(); // function call for renderComments
}

commentBtn.addEventListener("click", addComment);