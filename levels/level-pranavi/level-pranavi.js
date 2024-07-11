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
    // Helper function to create elements with attributes
    function createElementWithAttributes(tag, attributes) {
        var element = document.createElement(tag);
        for (var key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    }

    // Function to handle context menu callback
    function handleContextMenuCallback(key, options) {
        var parentId = options.$trigger.closest('[id]').getAttribute('id');
        switch (key) {
            case "new":
                //self.newWord(); // Implement your logic for new file
                console.log("New file clicked");
                break;
            case "open":
                //self.showOpen(parentId); // Implement your logic for opening file
                console.log("Open file clicked");
                break;
            case "close":
            case "exit":
                //$('#' + parentId + ' a.button-3d.close').trigger('click'); // Implement your logic for closing/exiting
                console.log("Close/Exit clicked");
                break;
            case "print":
                //self.printFile(parentId); // Implement your logic for printing
                console.log("Print clicked");
                break;
            case "save":
            case "saveAs":
                //self.showSave(parentId); // Implement your logic for saving
                console.log("Save/Save As clicked");
                break;
            case "mail":
                var saved = document.getElementById(parentId).getAttribute('saved');
                var fileid = document.getElementById(parentId).getAttribute('fileid');
                if (saved === "true" && fileid !== 'undefined') {
                    //self.newMail(fileid); // Implement your logic for mailing
                    console.log("Mail clicked with file ID:", fileid);
                } else {
                    //SystemUI.setDialogBox(parentId, 'Error', '1', 'Please save your file before you continue.');
                    console.log("Please save your file before you continue.");
                }
                break;
            default:
                console.log('Unrecognized option');
        }
    }

    // Initialize context menu
    var contextMenuOptions = {
        selector: '.word .menu-bar .file',
        trigger: 'left',
        position: function(opt, x, y) {
            var a = this.offset();
            opt.$menu.style.top = (a.top + 10) + 'px';
            opt.$menu.style.left = (a.left - 10) + 'px';
        },
        className: 'word-file-context-menu',
        callback: handleContextMenuCallback,
        items: {
            new: {
                name: "New",
                accesskey: "O",
                icon: function(opt, $itemElement) {
                    var iconLink = createElementWithAttributes('a', {
                        class: 'b-new',
                        'aria-hidden': 'true'
                    });
                    var text = document.createElement('p');
                    text.innerHTML = '<span class="context-menu-accesskey">N</span>ew';
                    $itemElement.appendChild(iconLink);
                    $itemElement.appendChild(text);
                    return 'context-menu-icon-updated';
                }
            },
            open: {
                name: "Open",
                accesskey: "O",
                icon: function(opt, $itemElement) {
                    var iconLink = createElementWithAttributes('a', {
                        class: 'b-open',
                        'aria-hidden': 'true'
                    });
                    var text = document.createElement('p');
                    text.innerHTML = '<span class="context-menu-accesskey">O</span>pen';
                    $itemElement.appendChild(iconLink);
                    $itemElement.appendChild(text);
                    return 'context-menu-icon-updated';
                }
            },
            close: {
                name: "Close",
                accesskey: "C"
            },
            "sep1": "---------",
            save: {
                name: "Save",
                accesskey: "S",
                icon: function(opt, $itemElement) {
                    var iconLink = createElementWithAttributes('a', {
                        class: 'b-save',
                        'aria-hidden': 'true'
                    });
                    var text = document.createElement('p');
                    text.innerHTML = '<span class="context-menu-accesskey">S</span>ave';
                    $itemElement.appendChild(iconLink);
                    $itemElement.appendChild(text);
                    return 'context-menu-icon-updated';
                }
            },
            saveAs: {
                name: "Save As",
                accesskey: "A"
            },
            saveAsHtml: {
                name: "Save As HTML",
                accesskey: "H",
                disabled: true
            },
            version: {
                name: "Versions",
                accesskey: "V",
                disabled: true
            },
            "sep2": "---------",
            pageSet: {
                name: "Page Setup",
                accesskey: "U",
                disabled: true
            },
            printPreview: {
                name: "Print Preview",
                accesskey: "V",
                icon: function(opt, $itemElement) {
                    var iconLink = createElementWithAttributes('a', {
                        class: 'b-preview',
                        'aria-hidden': 'true'
                    });
                    var text = document.createElement('p');
                    text.innerHTML = 'Print Pre<span class="context-menu-accesskey">v</span>iew';
                    $itemElement.appendChild(iconLink);
                    $itemElement.appendChild(text);
                    return 'context-menu-icon-updated';
                },
                disabled: true
            },
            print: {
                name: "Print",
                accesskey: "P",
                icon: function(opt, $itemElement) {
                    var iconLink = createElementWithAttributes('a', {
                        class: 'b-print',
                        'aria-hidden': 'true'
                    });
                    var text = document.createElement('p');
                    text.innerHTML = '<span class="context-menu-accesskey">P</span>rint';
                    $itemElement.appendChild(iconLink);
                    $itemElement.appendChild(text);
                    return 'context-menu-icon-updated';
                }
            },
            "sep3": "---------",
            sendTo: {
                name: "Send To",
                accesskey: "T",
                items: {
                    mail: {
                        name: "Mail Recipient",
                        accesskey: "M",
                        icon: function(opt, $itemElement) {
                            var iconLink = createElementWithAttributes('a', {
                                class: 'b-mail',
                                'aria-hidden': 'true'
                            });
                            var text = document.createElement('p');
                            text.innerHTML = '<span class="context-menu-accesskey">M</span>ail Recipient...';
                            $itemElement.appendChild(iconLink);
                            $itemElement.appendChild(text);
                            return 'context-menu-icon-updated';
                        }
                    }
                }
            },
            properties: {
                name: "Properties",
                accesskey: "R",
                disabled: true
            },
            "sep4": "---------",
            exit: {
                name: "Exit",
                accesskey: "E"
            }
        }
    };

    // Create the context menu
    $.contextMenu(contextMenuOptions);
});
