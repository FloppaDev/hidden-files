
(() => {

  const hide = async () => {

    chrome.storage.sync.get('extensions', (data) => {
      const extensions = data.extensions;

      const filterExt = (element, name) => {
        for(let extension of extensions)
        if(name.endsWith(extension)) element.remove();
      };

      const files = document.querySelector('[aria-labelledby="files"]');
      if(files) {
        let children = Array.from(files.children);
        let len = children.length;

        for(let i=1; i<len; i++) {
          let name = children[i].querySelector('[title]').innerText;
          filterExt(children[i], name);
        }
      }

      chrome.storage.sync.get('octotree', (data) => {
        if(!data.octotree) return;

        const octotree = document.querySelector('.octotree-view-body');
        if(!octotree) return;
        children = Array.from(octotree.querySelectorAll('[title]'));
        len = children.length;
        if(len == 0) return;

        for(let i=1; i<len; i++) {
          let name = children[i].getAttribute('title');
          filterExt(children[i], name);
        }
      });
    });
  };

  const loop = async () => {
    hide();
    await new Promise(resolve => setTimeout(resolve, 1000));
    loop();
  };

  loop();

})();
