(() => {
  let extensionsElem = document.getElementById('extensions');
  chrome.storage.sync.get('extensions', (data) => {
    extensionsElem.value = data.extensions.join(', ');
  });

  document.getElementById('form').onsubmit = () => {
    let extensions = Array.from(
      extensionsElem
        .value
        .replace(/\s/g, '')
        .split(',')
        .filter(e => e)
    );

    chrome.storage.sync.set({extensions: extensions}, () => {
      console.log('Saved hidden extensions');
      console.log(extensions);
    });
  };
})();
