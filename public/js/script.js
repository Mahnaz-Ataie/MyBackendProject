
// fade-in and fade out in confirmation
document.addEventListener('DOMContentLoaded', () => {
  // getting the special classes from index.ejs for using them,
  const delete_Btn = document.querySelectorAll('.deletButton');
  const modal = document.getElementById('confirm_Modal');
  const close_Btn = document.querySelector('.closeButton');
  const confirm_Btn = document.getElementById('confirmBtn');
  const cancel_Btn = document.getElementById('cancelBtn');
  let postId;

  close_Btn.onclick = function() {
    modal.style.display = 'none';
  }
delete_Btn.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      postId = this.form.action.split('/').pop();
      modal.style.display = 'block';
    });
  });

 cancel_Btn.onclick = function() {
    modal.style.display = 'none';
    showMessage('deleting was canceled.', 'error');
  }

  confirm_Btn.onclick = function() {
    modal.style.display = 'none';
    fetch(`/delete/${postId}`, { method: 'POST' })
      .then(response => {
        if (response.ok) {
          showMessage('deleting was successfuly', 'success',);
          setTimeout(() => window.location.href = '/',1000 );
        } else {
          showMessage('Failed to delete', 'error',);
        }
      });
  }


  

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
  function showMessage(message, type) {
    const message_Modal = document.createElement('div');
    message_Modal.classList.add('window', type);
    message_Modal.textContent = message;

    document.body.appendChild(message_Modal);

    // Fade in the modal
    setTimeout(() => {
      message_Modal.classList.add('fade_show');
    }, 100);

    // Fade out 
    setTimeout(() => {
      message_Modal.classList.remove('fade_show');
      
      setTimeout(() => {
        document.body.removeChild(message_Modal);
      }, 1000);
    }, 3000);
  }
});

// current year used in footer
var date = new Date().getFullYear()
document.getElementById("currentYear").innerHTML = date 