/*
 * This file is part of GetWGet,
 * Copyright (C) 2014 Marco Inacio
 *
 * Licensed under Apache License Version 2.0
 * http://www.apache.org/licenses/
 */

function copyToClip (text) {
  var tempObject = document.createElement('textarea');
  tempObject.textContent = text;
  document.body.appendChild(tempObject);
  tempObject.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
  document.body.removeChild(tempObject);
}

chrome.downloads.onCreated.addListener(function(downloadItem) {
  chrome.storage.sync.get('enabled', function(status) {
    if (status.enabled) {
      var command = "wget";

      var cookies = "";
      chrome.cookies.getAll({url: downloadItem.url}, function callback(cookiess) {
        for (var i=0; i<cookiess.length; i++) {
          cookies += cookiess[i].name+"="+cookiess[i].value;
          if (i<cookiess.length-1)
            cookies += "; ";
        }

        if (!!cookies)
          command += " --header='Cookie: "
                  + cookies.replace("'", "'\\''") + "'";

        if (!!downloadItem.referrer)
          command += " --header='Referer: "
                  + downloadItem.referrer.replace("'", "'\\''") + "'";

        command += " '" + downloadItem.url.replace("'", "'\\''") + "'";
        copyToClip(command);
      });
    }
  });
});

function updateButton() {

  chrome.storage.sync.get('enabled', function(status) {
    if (status.enabled)
      chrome.browserAction.setIcon({path: "icon.png"});
    else
      chrome.browserAction.setIcon({path: "icond.png"});
  });

}

chrome.runtime.onStartup.addListener(updateButton);

chrome.runtime.onInstalled.addListener(updateButton)
