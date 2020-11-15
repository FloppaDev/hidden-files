
(() => {

  const files = document.querySelector('[aria-labelledby="files"]');
  if(!files) return;

  const extensions = ['lock'];
  let filtered = 0;
  const filterExt = (element, name) => {
    for(let extension of extensions) {
        if(name.endsWith(`.${extension}`)) element.remove();
        filtered++;
    }
  };

  let children = files.children;

  for(let i=1; i<children.length; i++) {
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

    const sleep = (ms) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    const loop = async () => {
      if(check()) return;
      await sleep(100);
      loop();
    };

    loop();
  };

  chrome.storage.sync.get('octotree', (data) => {
    if(data.octotree) processOctotree();
  });

})();
