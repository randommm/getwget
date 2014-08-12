/*
 * This file is part of GetWGet,
 * Copyright (C) 2014 Marco Inacio
 *
 * Licensed under Apache License Version 2.0
 * http://www.apache.org/licenses/
 */

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('enabled', function(status) {
    if (status.enabled)
      chrome.storage.sync.set({'enabled': 0}, function() {
        document.body.innerHTML = "Copy wget command to clipboard <strong>disabled</strong>";
        chrome.browserAction.setIcon({path: "icond.png"});
      });
    else
      chrome.storage.sync.set({'enabled': 1}, function() {
        document.body.innerHTML = "Copy wget command to clipboard <strong>enabled</strong>";
        chrome.browserAction.setIcon({path: "icon.png"});
      });
  });
});
