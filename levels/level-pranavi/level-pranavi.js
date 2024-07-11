document.addEventListener('DOMContentLoaded', function() {
    // Helper function to toggle visibility
    function toggleDisplay(element) {
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    // Function to attach event listeners for color pickers
    function attachColorPickerEvents(className, command) {
        var elements = document.querySelectorAll(className);
        elements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                e.stopPropagation();
                var colorPicker = element.querySelector('.color-picker');
                toggleDisplay(colorPicker);
            });
        });

        document.addEventListener('click', function(e) {
            elements.forEach(function(element) {
                var colorPicker = element.querySelector('.color-picker');
                if (!element.contains(e.target)) {
                    colorPicker.style.display = 'none';
                }
            });
        });

        var colorPickers = document.querySelectorAll(className + ' .color-picker a');
        colorPickers.forEach(function(colorPicker) {
            colorPicker.addEventListener('click', function() {
                var color = window.getComputedStyle(this).backgroundColor;
                document.execCommand(command, false, color);
                var parentColorPicker = this.closest('.color-picker');
                parentColorPicker.style.display = 'none';
            });
        });
    }

    // Attach events for .b-fontcolor and .b-hilite
    attachColorPickerEvents('.b-fontcolor', 'foreColor');
    attachColorPickerEvents('.b-hilite', 'hiliteColor');

     // Attach event for .file-option to display context-menu-list
     var fileOption = document.querySelector('.file-option');
     var fileContextMenu = document.querySelector('.context-menu-list.word-file-context-menu');
     fileOption.addEventListener('click', function(e) {
         e.stopPropagation();
         toggleDisplay(fileContextMenu);
     });
 
     // Attach event for "Send to" to display mail recipients
     var sendToOption = document.querySelector('.context-menu-item.context-menu-submenu');
     var mailRecipientSubMenu = sendToOption.querySelector('.context-menu-list');
     sendToOption.addEventListener('click', function(e) {
         e.stopPropagation();
         toggleDisplay(mailRecipientSubMenu);
     });
 
     // Hide context menus when clicking outside
     document.addEventListener('click', function(e) {
         if (!fileOption.contains(e.target)) {
             fileContextMenu.style.display = 'none';
         }
         if (!sendToOption.contains(e.target)) {
             mailRecipientSubMenu.style.display = 'none';
         }
     });
 });




