//show username
window.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (username) {
    document.getElementById('usernametext').innerText = username;
  } else {
    window.location.href = '/signin';
  }
});

//add cursor to input field
document.addEventListener('DOMContentLoaded', () => {
  const page = document.getElementById('page');
  const signin = document.getElementById('signin-username');
  const signup = document.getElementById('signup-username');

  if (page) {
    page.focus();
  } else if (signin) {
    signin.focus();
  } else if (signup) {
    signup.focus();
  }
});

//change the font
document.addEventListener('DOMContentLoaded', () => {
  const fontSelector = document.getElementById('fontSelector');
  const page = document.getElementById('page');

  // Fixed: Moved the event listener inside DOMContentLoaded and removed duplicate event listener
  if (fontSelector && page) {
    fontSelector.addEventListener('change', () => {
      const selectedFont = fontSelector.value;
      page.style.fontFamily = selectedFont;
    });
  }
});

//change font size
document.getElementById('fontSizeSelector').addEventListener('change', () => {
  const fontSize = parseInt(document.getElementById('fontSizeSelector').value);
  const lineHeight = fontSize + 8;

  const page = document.getElementById('page');
  if (page) {
    page.style.fontSize = fontSize + 'px';
    page.style.lineHeight = lineHeight + 'px';
    page.style.backgroundSize = `100% ${lineHeight}px`;
  }
});

//change the page color
document.getElementById('pageColorInput').addEventListener('input', () => {
  const page = document.getElementById('page');
  if (page) {
    page.style.backgroundColor = document.getElementById('pageColorInput').value;
  }
});

//set page color to default
document.getElementById('defaultPageColor').addEventListener('click', () => {
  const page = document.getElementById('page');
  const pageColorInput = document.getElementById('pageColorInput');
  if (page && pageColorInput) {
    page.style.backgroundColor = 'rgb(218, 239, 179)';
    pageColorInput.value = '#DAEFB3';
  }
});

//change font color
document.getElementById('fontColorInput').addEventListener('input', () => {
  const page = document.getElementById('page');
  if (page) {
    page.style.color = document.getElementById('fontColorInput').value;
  }
});

//set font color to default
document.getElementById('defaultFontColor').addEventListener('click', () => {
  const page = document.getElementById('page');
  const fontColorInput = document.getElementById('fontColorInput');
  if (page && fontColorInput) {
    page.style.color = 'rgb(0, 0, 0)';
    fontColorInput.value = '#000000';
  }
});

//change the background color of website 
document.getElementById('backgroundColorInput').addEventListener('input', () => {
  const container = document.getElementById('container');
  if (container) {
    container.style.backgroundColor = document.getElementById('backgroundColorInput').value;
  }
});

//set background color of website to default
document.getElementById('defaultBackgroundColor').addEventListener('click', () => {
  const container = document.getElementById('container');
  const backgroundColorInput = document.getElementById('backgroundColorInput');
  if (container && backgroundColorInput) {
    container.style.backgroundColor = 'rgb(227, 208, 216)';
    backgroundColorInput.value = '#E3D0D8';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Close button for messageBox
  const closeBox1 = document.getElementById('closeBox1');
  const messageBox = document.getElementById('messageBox');
  if (closeBox1 && messageBox) {
    closeBox1.addEventListener('click', () => {
      messageBox.style.display = 'none';
    });
  }

  // Close button for messageBoxSaveKey
  const closeBox2 = document.getElementById('closeBox2');
  const messageBoxSaveKey = document.getElementById('messageBoxSaveKey');
  if (closeBox2 && messageBoxSaveKey) {
    closeBox2.addEventListener('click', () => {
      messageBoxSaveKey.style.display = 'none';
    });
  }

  // Close button for messageBoxSave
  const closeBox3 = document.getElementById('closeBox3');
  const messageBoxSave = document.getElementById('messageBoxSave');
  if (closeBox3 && messageBoxSave) {
    closeBox3.addEventListener('click', () => {
      messageBoxSave.style.display = 'none';
    });
  }

  // Close button for messageBoxSave
  const closeBox4 = document.getElementById('closeBox4');
  const messageBoxShowkey = document.getElementById('messageBoxShowKey');
  if (closeBox4 && messageBoxShowkey) {
    closeBox4.addEventListener('click', () => {
      messageBoxShowkey.style.display = 'none';
    });
  }
});

document.getElementById('default').addEventListener('click', () => {
  document.getElementById('entryScroll').style.display = 'none'
  document.getElementById('savebtn').disabled = false
  document.getElementById('fontSelector').value = 'Source Code Pro'
  document.getElementById('fontSizeSelector').value = '24'
  document.getElementById('pageColorInput').value = '#daefb3'
  document.getElementById('fontColorInput').value = 'black'
  document.getElementById('backgroundColorInput').value = '#e3d0d8'
  document.getElementById('page').value = '#e3d0d8'
  document.getElementById('page').value = ''
  document.getElementById('page').style.fontFamily = `'Source Code Pro', monospace`
  document.getElementById('page').style.fontSize = '24px'
  document.getElementById('page').style.lineHeight = '32px'
  document.getElementById('page').style.backgroundSize = '100% 32px'
  document.getElementById('page').style.backgroundColor = '#daefb3'
  document.getElementById('page').style.color = 'black'
  document.getElementById('container').style.backgroundColor = '#e3d0d8'
})