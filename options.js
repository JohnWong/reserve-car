// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  // The control manipulability.
  options.frequency.disabled 
    = options.txtname.disabled
    = options.txtpwd.disabled
	= options.isSound.disabled
	= options.date.disabled
	= options.time.disabled
	= isDeactivated;
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in minutes.
  options.txtname.value = localStorage.txtname;
  options.txtpwd.value = localStorage.txtpwd;
  options.isSound.checked = JSON.parse(localStorage.isSound);
  options.date.value = localStorage.date;
  options.time.value = localStorage.time;
  
  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
  
  options.txtname.onchange = function() {
    localStorage.txtname = options.txtname.value;
  };
  
  options.txtpwd.onchange = function() {
    localStorage.txtpwd = options.txtpwd.value;
  };
  
  options.isSound.onchange = function() {
    localStorage.isSound = options.isSound.checked;
  };
  
  options.date.onchange = function() {
    localStorage.date = options.date.value;
  };
  
  options.time.onchange = function() {
    localStorage.time = options.time.value;
  };
});
