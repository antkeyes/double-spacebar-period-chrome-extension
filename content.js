console.log('Double Spacebar Period extension content script loaded.');


document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && event.target.tagName.toLowerCase() === 'textarea') {
      let textarea = event.target;
      let value = textarea.value;
      let start = textarea.selectionStart;
  
      if (start >= 1 && value.charAt(start - 1) === ' ' && value.charAt(start - 2) !== '.') {
        event.preventDefault();
        textarea.value = value.substring(0, start - 1) + '. ' + value.substring(start);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }
    }
  });
  