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
});

document.addEventListener('DOMContentLoaded', function() {
    // Select the 'File' menu item
    var fileMenuItem = document.querySelector('.word .menu-bar .file');

    // Select the context menu
    var contextMenu = document.querySelector('.context-menu-list.word-file-context-menu');

    // Show context menu on 'File' menu item click
    fileMenuItem.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling

        // Toggle display of context menu
        if (contextMenu.style.display === 'block') {
            contextMenu.style.display = 'none';
        } else {
            contextMenu.style.display = 'block';
        }
    });

    // Hide context menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!contextMenu.contains(e.target) && e.target !== fileMenuItem) {
            contextMenu.style.display = 'none';
        }
    });

    // Function to handle submenu visibility
    var submenuItems = contextMenu.querySelectorAll('.context-menu-submenu');
    submenuItems.forEach(function(submenuItem) {
        var submenuList = submenuItem.querySelector('.context-menu-list');
        submenuItem.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling

            // Toggle submenu display
            if (submenuList.style.display === 'block') {
                submenuList.style.display = 'none';
            } else {
                submenuList.style.display = 'block';
            }
        });
    });

    // Add functionality for menu item clicks (callback function)
    var menuItems = contextMenu.querySelectorAll('.context-menu-item:not(.context-menu-submenu)');
    menuItems.forEach(function(menuItem) {
        menuItem.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling

            // Perform action based on the menu item clicked
            var action = menuItem.getAttribute('data-action');
            switch (action) {
                case 'new':
                    console.log('New file action');
                    break;
                case 'open':
                    console.log('Open file action');
                    break;
                case 'close':
                    console.log('Close action');
                    break;
                case 'save':
                    console.log('Save action');
                    break;
                case 'print':
                    console.log('Print action');
                    break;
                case 'mail':
                    console.log('Mail action');
                    break;
                case 'exit':
                    console.log('Exit action');
                    break;
                default:
                    console.log('Unknown action');
            }

            // Hide the context menu after action is performed (optional)
            contextMenu.style.display = 'none';
        });
    });
});
