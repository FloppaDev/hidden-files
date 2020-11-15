
(() => {

  const files = document.querySelector('[aria-labelledby="files"]');
  if(!files) return;

  chrome.storage.sync.get('extensions', (data) => {
    const extensions = data.extensions;

    let filtered = 0;
    const filterExt = (element, name) => {
      for(let extension of extensions) {
          if(name.endsWith(extension)) element.remove();
          filtered++;
      }
    };

    let children = Array.from(files.children);
    let len = children.length;

    for(let i=1; i<len; i++) {
      let name = children[i].querySelector('[title]').innerText;
      filterExt(children[i], name);
    }

    let goal = filtered;
    filtered = 0;

    const processOctotree = () => {
      const check = () => {
        const octotree = document.querySelector('.octotree-view-body');
        if(!octotree) return;
        children = octotree.querySelectorAll('[title]');
        if(!children) return;

        for(let i=1; i<children.length; i++) {
          let name = children[i].getAttribute('title');
          filterExt(children[i], name);
        }

        return filtered == goal;
      };

      const loop = async () => {
        if(check()) return;
        await new Promise(resolve => setTimeout(resolve, 100));
        loop();
      };

      loop();
    };

    chrome.storage.sync.get('octotree', (data) => {
      if(data.octotree) processOctotree();
    });
  });

})();
