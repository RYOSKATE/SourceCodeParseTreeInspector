'use strict';

/*
  var treeDataJs = {
      name    : "TreeData.js",
      author  : "Raphael Amorim",
      email   : "rapha850@gmail.com",
      github  : "https://github.com/raphamorim/treeStructure"
  };
*/

/* Receive data and create tree */
exports.getTree = function (data, select) {
    var treeCode = "<ul>" + buildTree(data, Object.keys(data)[0]) + "</ul>";

    var container = document.getElementById(select);
    if (container != null) {
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
    }

    var main = document.querySelector('#' + select);

    var treecanvas = document.createElement('div');
    treecanvas.className = 'tree';

    treecanvas.innerHTML = treeCode;

    main.appendChild(treecanvas);
}

/* Recursive function to build tree structure :) */
function buildTree(list, key) {
    let treeString = "<li><a href='#'>" + list[key].value + "</a>";
    let sons = [];

    for (const id in list) {
        if (list[id].parent == key)
            sons.push(id);
    }

    if (0 < sons.length) {
        treeString += "<ul>";
        for (const son of sons) {
            treeString += buildTree(list, son);
        }

        treeString += "</ul>";
    }

    return treeString;
}
