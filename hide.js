
(() => {

  const files = document.querySelector('[aria-labelledby="files"]');
  if(!files) return;

  const extensions = ['lock'];
  const filterExt = (element, name) => {
    for(let extension of extensions)
      if(name.endsWith(`.${extension}`)) element.remove();
  };

  let children = files.children;

  for(let i=1; i<children.length; i++) {
    let name = children[i].querySelector('[title]').innerText;
    filterExt(children[i], name);
  }

  const octoTree = document.querySelector('.octotree-view-body');
  if(!octoTree) return;

  children = octoTree.querySelectorAll('[title]');

  for(let i=1; i<children.length; i++) {
    let name = children[i].getAttribute('title');
    filterExt(children[i], name);
  }

})();
