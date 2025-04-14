document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const logoutButton = document.getElementById('logout-button');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }

    const postButton = document.getElementById('post-button');
    const postCaptionInput = document.getElementById('post-caption');
    const postImageInput = document.getElementById('post-image');
    const newsFeed = document.getElementById('news-feed');

    let posts = []; 

    function displayPosts() {
        newsFeed.innerHTML = '';
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <div class="post-header">
                    <span class="username">User</span>
                </div>
                <div class="post-content">
                    ${post.mediaUrl ? (post.mediaType === 'image' ? `<img src="${post.mediaUrl}" alt="Post Image">` : `<video src="${post.mediaUrl}" controls></video>`) : ''}
                    <p>${post.caption}</p>
                </div>
                <div class="post-actions">
                    <button class="like-button" data-post-index="${index}">❤️ <span class="like-count">${post.likes}</span></button>
                    <button class="comment-button" data-post-index="${index}">💬 <span class="comment-count">${post.comments.length}</span></button>
                </div>
                <div class="comments-section" id="comments-${index}">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <span class="comment-user">User:</span> ${comment}
                        </div>
                    `).join('')}
                </div>
                <div class="add-comment">
                    <input type="text" placeholder="Add a comment..." id="new-comment-${index}">
                    <button class="post-comment-button" data-post-index="${index}">Post</button>
                </div>
            `;
            newsFeed.prepend(postDiv); 
        });

        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', handleLike);
        });

        document.querySelectorAll('.post-comment-button').forEach(button => {
            button.addEventListener('click', handlePostComment);
        });
    }

    postButton.addEventListener('click', () => {
        const caption = postCaptionInput.value.trim();
        const imageFile = postImageInput.files[0];
        let mediaUrl = '';
        let mediaType = '';

        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                mediaUrl = reader.result;
                mediaType = imageFile.type.startsWith('image/') ? 'image' : 'video';
                const newPost = {
                    caption: caption,
                    mediaUrl: mediaUrl,
                    mediaType: mediaType,
                    likes: 0,
                    comments: []
                };
                posts.unshift(newPost); 
                displayPosts();
                postCaptionInput.value = '';
                postImageInput.value = '';
            };
            reader.readAsDataURL(imageFile);
        } else if (caption) {
            const newPost = {
                caption: caption,
                mediaUrl: null,
                mediaType: null,
                likes: 0,
                comments: []
            };
            posts.unshift(newPost);
            displayPosts();
            postCaptionInput.value = '';
        }
    });

    function handleLike(event) {
        const postIndex = parseInt(event.target.dataset.postIndex);
        if (posts[postIndex]) {
            posts[postIndex].likes++;
            displayPosts(); 
        }
    }

    function handlePostComment(event) {
        const postIndex = parseInt(event.target.dataset.postIndex);
        const commentInput = document.getElementById(`new-comment-${postIndex}`);
        const commentText = commentInput.value.trim();
        if (posts[postIndex] && commentText) {
            posts[postIndex].comments.push(commentText);
            commentInput.value = '';
            displayPosts(); 
        }
    }

    displayPosts();
});