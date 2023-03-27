console.log('Double Spacebar Period extension content script loaded.');

function handleKeydown(event) {
  if (event.code === 'Space' && event.target.getAttribute('contenteditable') === 'true') {
    console.log('Inside handleKeydown function');

    let editableDiv = event.target;
    let selection = window.getSelection();
    let anchorNode = selection.anchorNode;
    let start = selection.anchorOffset;

    console.log('Start:', start);
    console.log('Anchor node text content:', anchorNode.textContent);

    if (start >= 2 && anchorNode.textContent.charAt(start - 1) === ' ' && anchorNode.textContent.charAt(start - 2) !== '.') {
      event.preventDefault();
      document.execCommand('insertText', false, '. ');
    }
  }
}

function addEventListenerToIframe() {
  let iframe = document.querySelector('iframe.docs-texteventtarget-iframe');
  if (iframe) {
    console.log('Adding event listener to iframe');
    iframe.contentWindow.document.addEventListener('keydown', handleKeydown);
  } else {
    console.log('Iframe not found. Retrying in 1 second.');
    setTimeout(addEventListenerToIframe, 1000);
  }
}

// Use a MutationObserver to detect when the iframe is added to the DOM
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IFRAME' && node.classList.contains('docs-texteventtarget-iframe')) {
          addEventListenerToIframe();
        }
      });
    }
  });
});

observer.observe(document, { childList: true, subtree: true });
